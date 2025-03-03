import React, { useRef } from "react";
import SignaturePad from "react-signature-canvas";

export default function Signature({ onSaveSignature, tenantSignatureFieldPosition }) {
  const sigPadRef = useRef(null);

  const handleSave = () => {
    if (sigPadRef.current) {
      const signatureData = sigPadRef.current.toDataURL();
      onSaveSignature(signatureData);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        left: tenantSignatureFieldPosition.left,
        top: tenantSignatureFieldPosition.top,
        width: tenantSignatureFieldPosition.width,
        height: tenantSignatureFieldPosition.height,
        border: "1px solid black",
      }}
    >
      <SignaturePad ref={sigPadRef} canvasProps={{ width: tenantSignatureFieldPosition.width, height: tenantSignatureFieldPosition.height }} />
      <button onClick={handleSave} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Save Signature
      </button>
    </div>
  );
}
