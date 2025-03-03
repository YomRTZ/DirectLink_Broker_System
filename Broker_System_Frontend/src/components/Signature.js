import React, { useRef, useEffect, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function Signature({ onSaveSignature, signatureFieldPosition }) {
  const signatureCanvasRef = useRef(null);

  const handleClear = () => {
    signatureCanvasRef.current.clear();
  };

  const handleGenerate = () => {
    const signatureData = signatureCanvasRef.current.toDataURL();
    onSaveSignature(signatureData); 
    console.log("Signature generated:", signatureData);
  };

  useEffect(() => {
    if (signatureFieldPosition) {
      signatureCanvasRef.current.clear();
    }
  }, [signatureFieldPosition]);

  return (
    <div
      style={{
        position: "absolute",
        left: `${signatureFieldPosition.left}px`,
        top: `${signatureFieldPosition.top}px`,
        width: `${signatureFieldPosition.width}px`,
        height: `${signatureFieldPosition.height}px`,
      }}
    >
      <SignatureCanvas
        ref={signatureCanvasRef}
        canvasProps={{
          width: signatureFieldPosition.width,
          height: signatureFieldPosition.height,
          className: "sigCanvas border-2 border-black",
        }}
      />
      <button onClick={handleClear} className=" mt-20 mr-10 bg-gray-300 px-4 py-2 rounded">
        Clear
      </button>
      <button
        onClick={handleGenerate}
        className="mt-20 bg-blue-500 ml-5 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}
