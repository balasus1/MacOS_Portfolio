import { useState } from 'react';
import WindowWrapper from '#hoc/WindowWrapper';
import { WindowControls } from '#components';
import { Download, AlertCircle } from 'lucide-react';
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
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error('Error loading PDF:', error);
    setError('Failed to load resume. Please try again later.');
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
        {error ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-gray-500 p-6">
            <AlertCircle className="w-12 h-12 mb-2 text-red-500" />
            <p className="text-sm font-medium">{error}</p>
            <button
              type="button"
              onClick={() => {
                setError(null);
                setPageNumber(1);
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <Document
            file="/files/resume.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        )}
      </div>
    </>
  );
};

const ResumeWindow = WindowWrapper(Resume, 'resume');
export default ResumeWindow;
