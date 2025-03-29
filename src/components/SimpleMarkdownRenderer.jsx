import React from 'react';

// A simple component to render basic markdown formatting
const SimpleMarkdownRenderer = ({ text }) => {
  if (!text) return null;
  
  // Process markdown elements
  let processedText = text;
  
  // Handle bold text: **text** or __text__
  processedText = processedText.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>');
  
  // Handle italic text: *text* or _text_
  processedText = processedText.replace(/(\*|_)(.*?)\1/g, '<em>$2</em>');
  
  // Handle links: [text](url)
  processedText = processedText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">$1</a>');
  
  // Split by line breaks
  const paragraphs = processedText.split(/\n\n+/);
  
  return (
    <>
      {paragraphs.map((paragraph, index) => {
        // Skip empty paragraphs
        if (!paragraph.trim()) return null;
        
        // Process line breaks within paragraphs
        const lines = paragraph.split(/\n/).map((line, i) => (
          <React.Fragment key={i}>
            {i > 0 && <br />}
            <span dangerouslySetInnerHTML={{ __html: line }} />
          </React.Fragment>
        ));
        
        return <p key={index} className="mb-2 last:mb-0">{lines}</p>;
      })}
    </>
  );
};

export default SimpleMarkdownRenderer;