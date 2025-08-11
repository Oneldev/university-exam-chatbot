
import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { ProcessedFile, FileCategory } from '../types';
import { readFileAsBase64, readFileAsText, extractTextFromPdf, extractTextFromDocx } from '../services/fileHelper';
import { SUPPORTED_FILE_TYPES, ALL_SUPPORTED_MIME_TYPES } from '../constants';

interface FileUploadAreaProps {
  onFileSelected: (file: ProcessedFile | null) => void;
  children: React.ReactNode; // To allow custom trigger elements
}

const FileUploadArea = forwardRef<HTMLInputElement, FileUploadAreaProps>(({ onFileSelected, children }, ref) => {
  const internalInputRef = useRef<HTMLInputElement>(null);
  
  useImperativeHandle(ref, () => internalInputRef.current as HTMLInputElement);

  const getFileCategory = (mimeType: string): FileCategory => {
    if (SUPPORTED_FILE_TYPES.IMAGE.includes(mimeType)) return FileCategory.IMAGE;
    if (SUPPORTED_FILE_TYPES.TEXT.includes(mimeType)) return FileCategory.TEXT;
    if (SUPPORTED_FILE_TYPES.DOCUMENT.includes(mimeType)) return FileCategory.DOCUMENT;
    return FileCategory.UNKNOWN;
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      onFileSelected(null);
      return;
    }

    const fileCategory = getFileCategory(file.type);

    if (fileCategory === FileCategory.UNKNOWN) {
      alert(`Unsupported file type: ${file.type}. Please upload images (JPG, PNG, GIF, WebP), documents (PDF, DOCX), or plain text files (TXT).`);
      onFileSelected(null);
      if (internalInputRef.current) internalInputRef.current.value = ""; 
      return;
    }
    
    let content: string = '';
    let previewUrl: string | undefined = undefined;

    try {
      if (fileCategory === FileCategory.IMAGE) {
        content = await readFileAsBase64(file);
        previewUrl = content; 
      } else if (fileCategory === FileCategory.TEXT) {
        content = await readFileAsText(file);
      } else if (fileCategory === FileCategory.DOCUMENT) {
        if (file.type === 'application/pdf') {
          content = await extractTextFromPdf(file);
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          content = await extractTextFromDocx(file);
        } else {
          // Fallback for other document types not specifically handled for text extraction
          console.warn(`Client-side text extraction not configured for document type: ${file.type}. Sending filename as context placeholder.`);
          content = `File uploaded: ${file.name}. (Content not extracted client-side for this specific type)`;
        }
      }

      onFileSelected({
        name: file.name,
        type: fileCategory,
        mimeType: file.type,
        size: file.size,
        content: content, // This will now contain extracted text for PDF/DOCX
        fileObject: file,
        previewUrl: previewUrl
      });

    } catch (error) {
      console.error("Error processing file:", error);
      const errorMessage = error instanceof Error ? error.message : "Could not process the selected file.";
      alert(`Error processing file ${file.name}: ${errorMessage}`);
      onFileSelected(null);
      if (internalInputRef.current) internalInputRef.current.value = ""; 
    }
  };

  const triggerFileInput = () => {
    internalInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={internalInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={ALL_SUPPORTED_MIME_TYPES}
      />
      <div onClick={triggerFileInput} className="cursor-pointer">
        {children}
      </div>
    </>
  );
});

FileUploadArea.displayName = 'FileUploadArea';
export default FileUploadArea;
