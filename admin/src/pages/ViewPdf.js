import React, { useEffect,useState } from "react";


export default function ViewPdf({base64pdf}) {
  const [pdfBase64, setPdfBase64] = useState("");

  useEffect(() => {
    if (base64pdf) {
      setPdfBase64(base64pdf); 
    }
  }, [base64pdf]);

  if (!pdfBase64) {
    return <div>Loading...</div>;
  }

  return (
    <iframe
    src={`data:application/pdf;base64,${pdfBase64}`}
    width="100%"
    height="800px"
    title="PDF Preview"
  />
  );
}

