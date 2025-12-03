"use client"
import { useEffect } from 'react';
import { Download, ArrowLeft, ExternalLink, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ResumePage() {
  useEffect(() => {
    // Try to open PDF directly
    const checkPDF = async () => {
      try {
        const response = await fetch('/muhammadali_resume.pdf', { method: 'HEAD' });
        console.log('PDF exists:', response.ok);
      } catch (error) {
        console.error('PDF check failed:', error);
      }
    };
    checkPDF();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <Link 
            href="/"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Portfolio</span>
          </Link>
          
          <div className="flex gap-3">
            <a
              href="/muhammadali_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <ExternalLink size={18} />
              Open in New Tab
            </a>
            <a
              href="/muhammadali_resume.pdf"
              download="Muhammad_Ali_Resume.pdf"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Download size={18} />
              Download
            </a>
          </div>
        </div>

        {/* PDF Viewer - Try multiple methods */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Method 1: Embed with object tag */}
          <embed
            src="/muhammadali_resume.pdf#toolbar=1&navpanes=1&scrollbar=1"
            type="application/pdf"
            className="w-full h-[calc(100vh-200px)] min-h-[800px]"
          />
          
          {/* Fallback message */}
          <div className="p-8 text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Resume Preview
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              If the PDF doesn't display above, use one of the buttons to view it.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/muhammadali_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <ExternalLink size={18} />
                Open PDF
              </a>
              <a
                href="/muhammadali_resume.pdf"
                download="Muhammad_Ali_Resume.pdf"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Download size={18} />
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
