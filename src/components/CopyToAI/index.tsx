import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface CopyToAIProps {
  className?: string;
}

export default function CopyToAI({ className }: CopyToAIProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<string | false>(false);

  const generatePrompt = (provider: 'claude' | 'chatgpt') => {
    const pageTitle = document.title || 'Uniswap Documentation';
    
    // Use production URL in production, otherwise use current URL
    const currentUrl = window.location.href;
    const isLocalhost = currentUrl.includes('localhost') || currentUrl.includes('127.0.0.1');
    const pageUrl = isLocalhost ? currentUrl : currentUrl.replace(window.location.origin, 'https://docs.uniswap.org');
    
    // Both Claude and ChatGPT now use full content for immediate feedback
    const contentElement = document.querySelector('article[data-page-type="docs"]') || 
                          document.querySelector('.markdown') || 
                          document.querySelector('main');
    
    const pageContent = contentElement?.textContent?.trim() || 'Content not available';
    
    return `Here is documentation from Uniswap:

**Title:** ${pageTitle}
**Source:** ${pageUrl}

**Content:**
${pageContent}

Please read this documentation so I can ask questions about it.`;
  };

  const copyToClipboard = async (provider: 'claude' | 'chatgpt') => {
    try {
      const prompt = generatePrompt(provider);
      
      if (provider === 'chatgpt') {
        // ChatGPT supports pre-filling via URL parameters (2024 feature)
        const encodedPrompt = encodeURIComponent(prompt);
        const url = `https://chatgpt.com/?model=gpt-4&q=${encodedPrompt}`;
        window.open(url, '_blank');
        setCopied('ChatGPT will load with your content!');
        
        setTimeout(() => {
          setCopied(false);
          setIsOpen(false);
        }, 2000);
      } else {
        // Claude: Try URL parameters first, fallback to clipboard if too long
        const encodedPrompt = encodeURIComponent(prompt);
        const claudeUrl = `https://claude.ai/new?q=${encodedPrompt}`;
        
        // Check if URL is too long (typical browser limit ~2000 chars)
        if (claudeUrl.length > 2000) {
          // Fallback: copy to clipboard and open Claude
          await navigator.clipboard.writeText(prompt);
          window.open('https://claude.ai/new', '_blank');
          setCopied('✓ Content copied to clipboard!\nPaste into Claude with Ctrl+V (⌘+V)');
          
          setTimeout(() => {
            setCopied(false);
            setIsOpen(false);
          }, 3000);
        } else {
          // URL is short enough, use direct URL approach
          window.open(claudeUrl, '_blank');
          setCopied('✓ Opening Claude with content!');
          
          setTimeout(() => {
            setCopied(false);
            setIsOpen(false);
          }, 2000);
        }
      }
    } catch (err) {
      console.error('Failed to process request: ', err);
      // Fallback: just copy to clipboard
      try {
        const prompt = generatePrompt('claude'); // Default to Claude approach for fallback
        await navigator.clipboard.writeText(prompt);
        setCopied('Copied to clipboard!');
        setTimeout(() => {
          setCopied(false);
          setIsOpen(false);
        }, 2000);
      } catch (clipboardErr) {
        console.error('Clipboard fallback failed: ', clipboardErr);
      }
    }
  };

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(`.${styles.container}`)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className={clsx(styles.container, className)}>
      <button
        className={clsx(styles.trigger, { [styles.active]: isOpen })}
        onClick={handleDropdownToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className={styles.icon}>🤖</span>
        <span className={styles.text}>Open in AI</span>
        <svg 
          className={clsx(styles.chevron, { [styles.chevronOpen]: isOpen })} 
          width="12" 
          height="12" 
          viewBox="0 0 12 12"
        >
          <path 
            d="M2 4l4 4 4-4" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            fill="none" 
          />
        </svg>
      </button>
      
      {isOpen && (
        <div className={styles.dropdown}>
          <button
            className={clsx(styles.option, styles.claude)}
            onClick={() => copyToClipboard('claude')}
          >
            <span className={styles.optionIcon}>🔶</span>
            <span>Claude</span>
          </button>
          <button
            className={clsx(styles.option, styles.chatgpt)}
            onClick={() => copyToClipboard('chatgpt')}
          >
            <span className={styles.optionIcon}>💬</span>
            <span>ChatGPT</span>
          </button>
        </div>
      )}
      
      {copied && (
        <div className={styles.toast}>
          {copied}
        </div>
      )}
    </div>
  );
}