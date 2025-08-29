import React, { useState } from 'react'
import { useLocation } from '@docusaurus/router'

interface CopyToAIProps {
  className?: string
}

const CopyToAI: React.FC<CopyToAIProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const location = useLocation()

  const getCurrentPageContent = (): string => {
    // Get the main content area
    const contentElement = document.querySelector('.markdown') || document.querySelector('main')
    if (!contentElement) return 'Content not available'

    // Extract text content and clean it up
    const textContent = contentElement.textContent || ''
    const cleanedContent = textContent
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, '\n')
      .trim()

    const pageUrl = `https://docs.uniswap.org${location.pathname}`
    const pageTitle = document.title || 'Uniswap Documentation'

    return `# ${pageTitle}

Source: ${pageUrl}

${cleanedContent}`
  }

  const handleCopyToClipboard = async () => {
    try {
      const content = getCurrentPageContent()
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const handleChatGPT = () => {
    const content = getCurrentPageContent()
    const encodedContent = encodeURIComponent(content)
    const prompt = encodeURIComponent('Please help me understand this Uniswap documentation and answer any questions I have about it.')
    
    // ChatGPT URL with content
    const chatGPTUrl = `https://chatgpt.com/?q=${prompt}%0A%0A${encodedContent}`
    window.open(chatGPTUrl, '_blank')
    setIsOpen(false)
  }

  const handleClaude = async () => {
    try {
      const content = getCurrentPageContent()
      await navigator.clipboard.writeText(content)
      
      // Open Claude and show user instructions
      window.open('https://claude.ai/chat', '_blank')
      alert('Content copied to clipboard! Paste it into Claude to get help with this documentation.')
      setIsOpen(false)
    } catch (err) {
      console.error('Failed to copy for Claude:', err)
      // Fallback: just open Claude
      window.open('https://claude.ai/chat', '_blank')
      setIsOpen(false)
    }
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
        aria-label="Copy to AI assistant"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Ask AI
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 right-0 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50">
          <div className="py-1">
            <button
              onClick={handleChatGPT}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.078 6.078 0 0 0 6.283 2.9 5.952 5.952 0 0 0 3.224.009 6.065 6.065 0 0 0 9.274-2.168 5.963 5.963 0 0 0 4.006-2.904 6.078 6.078 0 0 0-.75-7.094Zm-9.022 12.281a5.963 5.963 0 0 1-2.573-.057 5.006 5.006 0 0 1-1.813.613 5.986 5.986 0 0 1-4.823-1.272 4.987 4.987 0 0 1-.425-4.1 4.983 4.983 0 0 1-1.135-1.813 5.963 5.963 0 0 1 .632-4.823 4.983 4.983 0 0 1 3.336-.812 4.987 4.987 0 0 1 1.813-1.126 5.963 5.963 0 0 1 4.823.632 4.983 4.983 0 0 1 1.812 1.126 4.987 4.987 0 0 1 1.135 1.813 5.963 5.963 0 0 1-.632 4.823 4.983 4.983 0 0 1-3.336.812 4.987 4.987 0 0 1-1.813 1.126Z"/>
              </svg>
              Ask ChatGPT
            </button>
            <button
              onClick={handleClaude}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0zm9-7.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15z"/>
              </svg>
              Ask Claude
            </button>
            <div className="border-t border-gray-200 dark:border-gray-600 my-1"></div>
            <button
              onClick={handleCopyToClipboard}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {copied ? 'Copied!' : 'Copy content'}
            </button>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default CopyToAI