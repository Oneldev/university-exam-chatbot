
// Add type declarations for global libraries
declare global {
  interface Window {
    pdfjsLib: any;
    mammoth: any;
  }
}

export const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};

// For PDF (using pdf.js)
export const extractTextFromPdf = async (file: File): Promise<string> => {
  if (!window.pdfjsLib) {
    throw new Error('pdf.js library not found. Make sure it is loaded.');
  }
  // Configure the worker source for pdf.js
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let textContent = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const text = await page.getTextContent();
    // Ensure 'item.str' is correctly accessed; structure might vary slightly based on pdf.js versions.
    // Common structure is item.str.
    textContent += text.items.map((item: any) => item.str).join(' ') + '\n';
  }
  return textContent.trim();
};

// For DOCX (using mammoth.js)
export const extractTextFromDocx = async (file: File): Promise<string> => {
  if (!window.mammoth) {
    throw new Error('mammoth.js library not found. Make sure it is loaded.');
  }
  const arrayBuffer = await file.arrayBuffer();
  const result = await window.mammoth.extractRawText({ arrayBuffer: arrayBuffer });
  return result.value.trim(); // The result object has a 'value' property containing the text
};
