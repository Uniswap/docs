import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface CopyToAIProps {
  className?: string;
}

export default function CopyToAI({ className }: CopyToAIProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const generatePrompt = () => {
    // Get the current page URL and convert to production URL if on localhost
    const currentUrl = window.location.href;
    const isLocalhost = currentUrl.includes('localhost') || currentUrl.includes('127.0.0.1') || currentUrl.includes('159.65.47.228');
    const pageUrl = isLocalhost 
      ? currentUrl.replace(window.location.origin, 'https://docs.uniswap.org')
      : currentUrl;
    
    // Simple prompt like Privy's approach
    return `Read from ${pageUrl} so I can ask questions about it.`;
  };

  const openInAI = (provider: 'claude' | 'chatgpt') => {
    const prompt = generatePrompt();
    const encodedPrompt = encodeURIComponent(prompt);
    
    if (provider === 'claude') {
      // Use Claude's URL parameter approach like Privy
      const claudeUrl = `https://claude.ai/new?q=${encodedPrompt}`;
      window.open(claudeUrl, '_blank');
    } else {
      // For ChatGPT, we'll use a similar approach
      const chatgptUrl = `https://chatgpt.com/?q=${encodedPrompt}`;
      window.open(chatgptUrl, '_blank');
    }
    
    setIsOpen(false);
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
            onClick={() => openInAI('claude')}
          >
            <span className={styles.optionIcon}>🔶</span>
            <span>Claude</span>
          </button>
          <button
            className={clsx(styles.option, styles.chatgpt)}
            onClick={() => openInAI('chatgpt')}
          >
            <span className={styles.optionIcon}>💬</span>
            <span>ChatGPT</span>
          </button>
        </div>
      )}
    </div>
  );
}