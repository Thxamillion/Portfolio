// Set the worker source for PDF.js
let pdfjsLib: any = null;

if (typeof window !== 'undefined') {
  // Only import PDF.js on the client side
  import('pdfjs-dist').then((lib) => {
    pdfjsLib = lib;
    lib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
  });
}

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Ensure we're on the client side
    if (typeof window === 'undefined') {
      throw new Error('PDF parsing only available on client side');
    }
    
    // Dynamically import PDF.js if not already loaded
    if (!pdfjsLib) {
      pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
    }
    
    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    let fullText = '';
    
    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Combine all text items from the page
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      fullText += pageText + '\n';
    }
    
    return fullText.trim();
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Failed to extract text from PDF. Please try a different file or convert to text format.');
  }
}