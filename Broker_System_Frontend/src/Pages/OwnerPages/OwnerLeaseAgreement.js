import React, { useState, useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import Signature from "./Signature";
import { PDFDocument } from "pdf-lib";
import { useNavigate,useLocation } from "react-router-dom";
import { getLease, updateLease } from "../../services/LeaseAgreement";
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
export default function OwnerLeaseAgreement() {

    const [pdfDocument, setPdfDocument] = useState(null);
    const [responsePdfDoc, setResponsePdfDoc]=useState(' ');
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [tenantSignatureFieldPosition, setTenantSignatureFieldPosition] = useState(null);
    const [signature, setSignature] = useState(null);
    const [signaturePage, setSignaturePage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const pdfContainerRef = useRef(null);
    const canvasRef = useRef(null);
    const { _id } = location.state || {};
    useEffect(() => {
      const loadPdf = async () => {
        try {
          const response = await getLease(_id);
          console.log("response", response);
      
          // If the document is a base64 string
          const pdfBase64 = response?.leaseAgreementDocument;
          const pdfBytes = new Uint8Array(atob(pdfBase64).split("").map(char => char.charCodeAt(0)));
          setResponsePdfDoc(pdfBytes);
          // Load the PDF using pdfjsLib
          const existingPdfBytes = pdfBytes?.buffer;  // Convert the typed array to ArrayBuffer
          const pdfDoc = await pdfjsLib?.getDocument(existingPdfBytes)?.promise;
          setPdfDocument(pdfDoc);
          setNumPages(pdfDoc.numPages);
          
          // Render the first page
          renderPage(1);
        } catch (error) {
          console.error("Error loading PDF:", error);
        }
      };
      
      loadPdf();
    }, []);
    

    // Handle form submission and save the PDF
    const handleFormSubmit = async () => {
      try {
        console.log("Starting form submission...");

        // Fetch the existing PDF from the backend
        const existingPdfBytes = responsePdfDoc; 
        console.log("Existing PDF bytes:", existingPdfBytes);
    
        // Load the existing PDF into PDF-lib
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        console.log("PDF loaded into PDF-lib");
    
        const form = pdfDoc.getForm();
        console.log("Form extracted from PDF");
    
        // Only add Tenant's Signature (don't fill in form fields)
        if (signature && tenantSignatureFieldPosition) {
          console.log("Adding tenant's signature...");
          const tenantSignatureImageBytes = await fetch(signature).then((res) => res.arrayBuffer());
          const tenantSignatureImage = await pdfDoc.embedPng(tenantSignatureImageBytes);
          const { left, top, width, height } = tenantSignatureFieldPosition;
    
          // Adjust scaling and position for Tenant's signature
          const signatureDims = tenantSignatureImage.scale(1);
          const adjustedTop = top - signatureDims.height - 95;
    
          // Adjust the position of the tenant's signature on the page (modify these values)
          const adjustedLeft = left - 150;
          const adjustedWidth = signatureDims.width;
          const adjustedHeight = signatureDims.height;
    
          const page = pdfDoc.getPages()[signaturePage - 1];
          page.drawImage(tenantSignatureImage, {
            x: adjustedLeft,
            y: adjustedTop,
            width: adjustedWidth,
            height: adjustedHeight,
          });
          console.log("Tenant's signature added");
        }
    
        // Save the modified PDF
        const pdfBytes = await pdfDoc.save();
        console.log("PDF saved");
    
        const base64String = btoa(String.fromCharCode(...new Uint8Array(pdfBytes)));
        console.log("Base64 string created");
    
        // Uncomment the following to save to the backend
        const leaseAgreementDocument = base64String;
        const leaseAgreementData = { leaseAgreementDocument };
        console.log("Lease agreement data:", leaseAgreementData);
    
        await updateLease(_id, leaseAgreementData);
        console.log("Lease updated");
    
        // Redirect to view the generated PDF
        navigate(`/view-pdf?pdf=${encodeURIComponent(base64String)}`);
        console.log("Navigation to view PDF");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };
    // Render page and form fields
    const renderPage = async (pageNumber) => {
      if (!pdfDocument) return;
  
      const page = await pdfDocument?.getPage(pageNumber);
      const viewport = page?.getViewport({ scale: 1.5 });
      const canvas = canvasRef?.current;
      const context = canvas?.getContext("2d");
      canvas.height = viewport?.height;
      canvas.width = viewport?.width;
      await page.render({ canvasContext: context, viewport }).promise;
  
      clearFormFields();
      renderFormFields(page, viewport, pageNumber);
    };
  
    // Clear previous form fields
    const clearFormFields = () => {
      const container = pdfContainerRef?.current;
      const formElements = container?.querySelectorAll("input");
      formElements.forEach((el) => el.remove());
    };
  
    // Render form fields (only tenant signature in this case)
    const renderFormFields = async (page, viewport, pageNumber) => {
      const fields = await page?.getAnnotations();
      const container = pdfContainerRef?.current;
  
      fields.forEach((field) => {
        if (field?.subtype === "Widget" && field?.fieldName && field?.fieldType === "Tx") {
          const rect = pdfjsLib?.Util?.normalizeRect(field?.rect);
          const [x1, y1, x2, y2] = rect;
          const width = (x2 - x1) * viewport?.scale;
          const height = (y2 - y1) * viewport?.scale;
          const left = x1 * viewport?.scale;
          const top = viewport?.height - y2 * viewport?.scale;
  
          // Only detect the TenantSignature field
          if (field?.fieldName === "TenantSignature") {
            setTenantSignatureFieldPosition({left, top, width, height });
            setSignaturePage(pageNumber);
          }
        }
      });
    };
  
    // Handle page navigation
    const handlePageChange = (newPage) => {
      if (newPage < 1 || newPage > numPages) return;
      setCurrentPage(newPage);
      renderPage(newPage);
    };
  
    // Save signature
    const handleSignatureSave = (signatureData) => {
      setSignature(signatureData);
      console.log("Signature Saved:", signatureData);
    };
  
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
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
  
        {/* PDF Canvas */}
        <div ref={pdfContainerRef} id="pdf-container" className="relative border border-gray-300">
          <canvas ref={canvasRef} className="block mx-auto"></canvas>
  
          {/* Render Tenant Signature */}
          {tenantSignatureFieldPosition && signaturePage === currentPage && (
            <Signature
              onSaveSignature={handleSignatureSave}
              tenantSignatureFieldPosition={tenantSignatureFieldPosition} 
            />
          )}
        </div>
        {signature && (
        <div>
          <img
            src={signature}
            alt="Signature"
            style={{ width: "200px", height: "100px" }}
          />
        </div>
      )}
        {/* Submit form button */}
        <button onClick={handleFormSubmit} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
          Submit Form
        </button>
      </div>
    );
}

