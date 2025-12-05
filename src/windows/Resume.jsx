import { useState } from 'react';
import WindowWrapper from '#hoc/WindowWrapper';
import { WindowControls } from '#components';
import { Download } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const Resume = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume</h2>
        <a
          href="/files/resume.pdf"
          download
          className="href"
          title="Download Resume"
        >
          <Download className="icon" />
        </a>
      </div>
      <div className="resume-viewer overflow-auto flex flex-col">
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500 px-3 py-1 border-t">
          <button
            type="button"
            onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
            disabled={pageNumber <= 1}
            className="px-2 py-1 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Previous
          </button>
          <p>
            Page {pageNumber} of {numPages || 0}
          </p>
          <button
            type="button"
            onClick={() =>
              setPageNumber((prev) =>
                numPages ? Math.min(numPages, prev + 1) : prev
              )
            }
            disabled={!numPages || pageNumber >= numPages}
            className="px-2 py-1 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Next
          </button>
        </div>
        <Document
          file="/files/resume.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => {
            console.error('Error loading PDF:', error);
          }}
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, 'resume');
export default ResumeWindow;
