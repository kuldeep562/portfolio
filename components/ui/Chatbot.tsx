'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, X, Bot } from 'lucide-react'

// Use the same curated records as the portfolio.
import { projects } from '../../lib/projects'
import { experience, education } from '../../lib/experience'

function generateReply(userMsg: string): string {
  const msg = userMsg.toLowerCase()
  if (/project|built|yolo|edge|healthcare|medical/.test(msg)) {
    return projects.filter(project => project.featured).map(project => `• ${project.name} (${project.status}): ${project.summary}`).join('\n')
  }
  if (/experience|work|company|job/.test(msg)) {
    return experience.map(entry => `${entry.role} at ${entry.organization} (${entry.period}). ${entry.summary}`).join('\n')
  }
  if (/education|degree|university|study/.test(msg)) {
    return education.map(entry => `• ${entry.name}, ${entry.institution} (${entry.period})`).join('\n')
  }
  if (/skill|tech|stack/.test(msg)) {
    return 'Kuldeep works across healthcare AI, computer vision, speech systems, LLM applications, full-stack engineering and laboratory integration.'
  }
  if (/email|mail|contact/.test(msg)) return 'Contact Kuldeep at solanki.kuldeep@icloud.com.'
  return 'Ask about Kuldeep’s projects, skills, experience, education or contact details.'
}

interface Message {
  id: number
  role: 'user' | 'bot'
  text: string
}

const SUGGESTIONS = [
  'What projects has he built?',
  'What are his key skills?',
  'How to contact him?',
  'Tell me about healthcare projects',
]

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'bot',
      text: `Hey! I'm Kuldeep's assistant. Ask me anything about his skills, projects, experience, or how to reach him.`,
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const idRef = useRef(1)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { id: idRef.current++, role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      const reply = generateReply(text)
      const botMsg: Message = { id: idRef.current++, role: 'bot', text: reply }
      setMessages((prev) => [...prev, botMsg])
    }, 800 + Math.random() * 600)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  if (!open) {
    return (
      <button
        className="chatbot-fab"
        onClick={() => setOpen(true)}
        aria-label="Open AI chatbot"
        title="Chat with Kuldeep's AI assistant"
      >
        <Bot size={22} color="#030303" />
      </button>
    )
  }

  return (
    <div className="chatbot-panel">
      {/* Header */}
      <div className="chatbot-header">
        <div className="chatbot-header-left">
          <div className="chatbot-avatar">KS</div>
          <div className="chatbot-header-info">
            <div className="chatbot-header-name">Kuldeep&apos;s Assistant</div>
            <div className="chatbot-header-status">
              <div className="chatbot-status-dot" />
              Online — Ask about Kuldeep
            </div>
          </div>
        </div>
        <button
          className="chatbot-close-btn"
          onClick={() => setOpen(false)}
          aria-label="Close chatbot"
        >
          <X size={14} />
        </button>
      </div>

      {/* Messages */}
      <div className="chatbot-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chatbot-msg chatbot-msg-${msg.role}`}
          >
            <div className={`chatbot-msg-avatar chatbot-msg-avatar-${msg.role}`}>
              {msg.role === 'bot' ? 'KS' : 'U'}
            </div>
            <div className="chatbot-msg-bubble">
              {msg.text.split('\n').map((line, i) => (
                <div
                  key={i}
                  style={line.startsWith('•') || line.startsWith('·') ? { paddingLeft: '8px' } : {}}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        ))}

        {typing && (
          <div className="chatbot-msg chatbot-msg-bot">
            <div className="chatbot-msg-avatar chatbot-msg-avatar-bot">KS</div>
            <div className="chatbot-typing">
              <div className="chatbot-typing-dot" />
              <div className="chatbot-typing-dot" />
              <div className="chatbot-typing-dot" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick suggestions */}
      {messages.length <= 2 && (
        <div className="chatbot-suggestions">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              className="chatbot-suggestion-btn"
              onClick={() => sendMessage(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="chatbot-input-area">
        <textarea
          ref={inputRef}
          className="chatbot-input"
          placeholder="Ask about Kuldeep..."
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Chat message input"
        />
        <button
          className="chatbot-send-btn"
          onClick={() => sendMessage(input)}
          disabled={!input.trim()}
          aria-label="Send message"
        >
          <Send size={15} color="#030303" />
        </button>
      </div>
    </div>
  )
}
