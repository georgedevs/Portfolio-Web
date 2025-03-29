import React, { useState, useEffect } from 'react';
import FloatingChatButton from './FloatingChatButton';
import OpenAIChatInterface from './OpenAIChatInterface';

const AIChatIntegration = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Check local storage for previous interactions
  useEffect(() => {
    const interacted = localStorage.getItem('chat-interacted');
    if (interacted) {
      setHasInteracted(true);
    }
  }, []);

  const openChat = () => {
    setIsChatOpen(true);
    
    // Record that the user has interacted with the chat
    if (!hasInteracted) {
      localStorage.setItem('chat-interacted', 'true');
      setHasInteracted(true);
    }
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      <FloatingChatButton openChat={openChat} hasInteracted={hasInteracted} />
      <OpenAIChatInterface isOpen={isChatOpen} closeChat={closeChat} />
    </>
  );
};

export default AIChatIntegration;