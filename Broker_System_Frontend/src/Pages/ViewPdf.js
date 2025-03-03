import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ViewPdf() {
  const location = useLocation();
  const [pdfBase64, setPdfBase64] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const base64String = queryParams.get("pdf");

    if (base64String) {
      setPdfBase64(base64String);
    }
  }, [location]);

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

