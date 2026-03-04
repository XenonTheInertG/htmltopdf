import React, { useState } from "react";
import html2pdf from "html2pdf.js";

function App() {
  const [files, setFiles] = useState([]);

  const handleFiles = (e) => {
    setFiles([...e.target.files]);
  };

  const convertAll = async () => {
    for (let file of files) {
      const text = await file.text();

      const element = document.createElement("div");
      element.innerHTML = text;

      await html2pdf()
        .from(element)
        .set({
          margin: 10,
          filename: file.name.replace(".html", ".pdf"),
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .save();
    }
  };

  return (
    <div className="container">
      <h1>HTML to PDF Converter</h1>

      <input
        type="file"
        accept=".html"
        multiple
        onChange={handleFiles}
      />

      <button onClick={convertAll} disabled={!files.length}>
        Convert All
      </button>

      <ul>
        {files.map((file, index) => (
          <li key={index}>📄 {file.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
