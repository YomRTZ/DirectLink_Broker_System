import React, { useState, useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { useLocation } from "react-router-dom";
import Signature from "../components/Signature";
import { PDFDocument } from "pdf-lib";
import { useNavigate } from "react-router-dom";
import { addLease } from "../services/LeaseAgreement";
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
export default function DisplayPdf() {
  const [pdfDocument, setPdfDocument] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({});
  const [signature, setSignature] = useState(null);
  const [signatureFieldPosition, setSignatureFieldPosition] = useState(null);
  const [signaturePage, setSignaturePage] = useState(null);
  const navigate = useNavigate();
  const pdfContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const pdfUrl = "/forms/newForm.pdf";
  const location = useLocation();
  const {currentUserData,ownerUserData, propertyData } = location.state || {};
  const getInitialFormData = (ownerUserData, currentUserData, propertyData) => {
    return {
      // owner
      OwnerFirstName: ownerUserData.firstName,
      OwnerMiddleName: ownerUserData.middleName,
      OwnerLastName: ownerUserData.lastName,
      OwnerRegion: ownerUserData.addressId.region,
      OwnerCity: ownerUserData.addressId.city,
      OwnerSubCity: ownerUserData.addressId.subcity,
      OwnerDistrict: ownerUserData.addressId.district,
      OwnerStreetName: ownerUserData.addressId.streetName,
      // tenant
      TenantFirstName:currentUserData.firstName,
      TenantMiddleName: currentUserData.middleName,
      TenantLastName: currentUserData.lastName,
      TenantRegion:currentUserData.addressId.region,
      TenantCity:currentUserData.addressId.city,
      TenantSubCity: currentUserData.addressId.subcity,
      TenantDistrict: currentUserData.addressId.district,
      TenantStreetName: currentUserData.addressId.streetName,
      // property
      PropertyCity: propertyData.addressId.city || "",
      PropertyRegion: propertyData.addressId.region || "",
      PropertySubCity: propertyData.addressId.subcity || "",
      PropertyDistrict: propertyData.addressId.district,
      PropertyStreetName: propertyData.addressId.streetName,
      PropertyNumberRoom: propertyData.numberOfRooms,
      RentalStatus: propertyData.categoryId.residentialTypeUnit,
      RentalPrice: propertyData.rentalPrice,
      // Additional fields
      // AgreementDurationDate: '',
      // numberOfPayMonth: '',
      // lastPayDate: '',
      // OwnerSignacture: '',
      // TenantSignacture: '',
      // date: '',
    };
  };
  useEffect(() => {
    const loadPdf = async () => {
      if (!formData.OwnerFirstName && ownerUserData && currentUserData && propertyData) {
        const initialFormData = getInitialFormData(ownerUserData, currentUserData, propertyData);
        setFormData(initialFormData);
      }
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdfDoc = await loadingTask.promise;
      setPdfDocument(pdfDoc);
      setNumPages(pdfDoc.numPages);
      renderPage(1);
    };
    loadPdf();
  }, [formData.OwnerFirstName, ownerUserData, currentUserData, propertyData]);
  const handleFormSubmit = async () => {
    // Step 1: Load the existing PDF
    const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
    // Step 2: Create a new PDF document
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    // Step 3: Get the form
    const form = pdfDoc.getForm();
    // Step 4: Fill in the form fields with the form data
    Object.keys(formData).forEach((fieldName) => {
      const field = form.getTextField(fieldName);
      // Get the value from formData, default to empty string
      const value = formData[fieldName] || ""; 
      // Ensure the value is always a string
      field.setText(String(value)); 
    });
    // Step 5: Add the signature to the signature field
    if (signature && signatureFieldPosition) {
      const ownerSignatureImageBytes = await fetch(signature).then((res) => res.arrayBuffer());
      const ownerSignatureImage = await pdfDoc.embedPng(ownerSignatureImageBytes);
      const { left, top, width, height } = signatureFieldPosition;
      const signatureDims = ownerSignatureImage.scale(0.5);
      const adjustedTop = top - signatureDims.height-100; 
      const adjustedLeft = left - 100;  
      const adjustedWidth = signatureDims.width; 
      const adjustedHeight = signatureDims.height;  
      const page = pdfDoc.getPages()[signaturePage - 1];
      page.drawImage(ownerSignatureImage, {
        x: adjustedLeft,
        y: adjustedTop,
        width: adjustedWidth,
        height: adjustedHeight,
      });
    }
// Step 7: Save the modified PDF
    const pdfBytes = await pdfDoc.save();
// Convert the binary PDF data to base64
    const base64String = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)));  
    const leaseAgreementDocument = base64String;
      const tenantId=currentUserData._id;
      const propertyId=propertyData._id;
      const ownerId=ownerUserData._id;
    const leaseAgreementData = { leaseAgreementDocument,tenantId,ownerId,propertyId };
 console.log("leaseagreementData",leaseAgreementData);
    const saveToDatabase = await addLease(leaseAgreementData);  
  
    try {
      // Redirect and pass the base64 string as a query parameter
      navigate(`/view-pdf?pdf=${encodeURIComponent(base64String)}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  
    alert("Form Data Collected: " + JSON.stringify(formData, null, 2));
  };
  const renderPage = async (pageNumber) => {
    if (!pdfDocument) return;
    const page = await pdfDocument.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext: context, viewport }).promise;
    clearFormFields();
    renderFormFields(page, viewport, pageNumber);
  };

  // Clear any previous form fields
  const clearFormFields = () => {
    const container = pdfContainerRef.current;
    const formElements = container.querySelectorAll("input");
    formElements.forEach((el) => el.remove());
  };
  // Render form fields (text fields, signature fields)
  const renderFormFields = async (page, viewport, pageNumber) => {
    const fields = await page.getAnnotations();
    const container = pdfContainerRef.current;
    const pageFields = [];

    fields.forEach((field) => {
      if (field.subtype === "Widget" && field.fieldName && field.fieldType === "Tx") {
        const rect = pdfjsLib.Util.normalizeRect(field.rect);
        const [x1, y1, x2, y2] = rect;
        const width = (x2 - x1) * viewport.scale;
        const height = (y2 - y1) * viewport.scale;
        const left = x1 * viewport.scale;
        const top = viewport.height - y2 * viewport.scale;

        if (field.fieldName === "OwnerSignacture") {
          setSignatureFieldPosition({ left, top, width, height });
          setSignaturePage(pageNumber);
        } else {
          const inputElement = document.createElement("input");
          inputElement.type = "text";
          inputElement.value = formData[field.fieldName] || field.fieldValue || "";
          inputElement.readOnly = true;
          inputElement.id = field.fieldName;
          inputElement.name = field.fieldName;
          inputElement.className = "absolute bg-transparent border border-gray-300 rounded focus:outline-none";
          inputElement.style.left = `${left}px`;
          inputElement.style.top = `${top}px`;
          inputElement.style.width = `${width}px`;
          inputElement.style.height = `${height}px`;

          pageFields.push(inputElement);
          container.appendChild(inputElement);
        }
      }
    });
  };

  // Handle page navigation (Next and Previous)
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > numPages) return;
    setCurrentPage(newPage);
    renderPage(newPage);
  };

  // Handle signature saving (passing signature data to parent component)
  const handleSignatureSave = (signatureData) => {
    setFormData((prev) => ({
      ...prev,
      OwnerSignacture: signatureData, 
    }));
    console.log("Signature Saved:", signatureData);
    setSignature(signatureData);
    // Now overlay the signature image inside the input field
    const inputField = document.getElementById('OwnerSignacture'); 
    if (inputField) {
      // Create an image element
      const signatureImage = new Image();
      signatureImage.src = signatureData; // Set the signature data URL
      signatureImage.style.position = 'absolute';
      // Position the image at the same place as the input field
      signatureImage.style.left = `${inputField.offsetLeft}px`;  
      signatureImage.style.top = `${inputField.offsetTop}px`;
      // Make the image the same size as the input field
      signatureImage.style.width = `${inputField.offsetWidth}px`; 
      signatureImage.style.height = `${inputField.offsetHeight}px`;
  
      // Append the image over the input field
      inputField.parentElement.appendChild(signatureImage);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Prev
          </button>
          <span className="text-lg">
            Page {currentPage} of {numPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= numPages}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>

      <div
        ref={pdfContainerRef}
        id="pdf-container"
        className="relative border border-gray-300"
      >
        <canvas ref={canvasRef} className="block mx-auto"></canvas>

        {signatureFieldPosition && signaturePage === currentPage && (
          <Signature
            onSaveSignature={handleSignatureSave}
            signatureFieldPosition={signatureFieldPosition}
          />
        )}
      </div>
      <button
        onClick={handleFormSubmit}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Submit Form
      </button>
    </div>
  );
}
