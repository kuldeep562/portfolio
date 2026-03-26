'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, X, Bot } from 'lucide-react'

// Profile data — only answers about Kuldeep
const PROFILE = {
  name: 'Kuldeep Solanki',
  role: 'AI/ML Engineer',
  email: 'solanki.kuldeep@icloud.com',
  phone: '+91 78787 90833',
  location: 'Gujarat, India',
  company: 'Artem HealthTech Pvt. Ltd.',
  companyRole: 'Associate AI/ML Engineer',
  duration: 'Aug 2025 – Present',
  skills: [
    'Python', 'PyTorch', 'TensorFlow', 'FastAPI', 'LangChain', 'Hugging Face',
    'YOLO', 'MMDetection', 'OpenCV', 'ONNX', 'Docker', 'Raspberry Pi',
    'LLaMA', 'Mistral', 'Whisper', 'SQL', 'C++',
  ],
  projects: [
    { name: 'Dashboard Framework', status: 'deployed', desc: 'Self-adaptive analytics dashboard — reads any DB schema, generates its own SQL.' },
    { name: 'Medicine Detection', status: 'deployed', desc: 'Custom YOLOv7 model for real-time capsule and tablet detection.' },
    { name: 'Clinical AI Assistant', status: 'deployed', desc: 'AI that extracts 16 structured medical fields from unstructured doctor notes.' },
    { name: 'NLP to SQL', status: 'deployed', desc: 'Natural language to SQL queries using LLaMA 3 + schema matching.' },
    { name: 'AIInterior Platform', status: 'deployed', desc: 'AI-powered interior design — room photo to photorealistic render in 45 seconds.' },
    { name: 'Smart Face Attendance System', status: 'experimental', desc: 'Deep learning face recognition for automated student attendance.' },
  ],
  education: 'M.Sc. AI & ML at Gujarat University (2023–2025)',
  experience: '14+ months in AI/ML with 22+ end-to-end projects',
  achievements: '93% precision in production · 30K+ records processed · Edge ML on Raspberry Pi',
}

function generateReply(userMsg: string): string {
  const msg = userMsg.toLowerCase()

  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
    return `Hey there! I'm Kuldeep's AI assistant. Ask me anything about Kuldeep's skills, projects, experience, or how to get in touch. What would you like to know?`
  }

  if (msg.includes('name')) {
    return `Kuldeep's full name is ${PROFILE.name}. He's an AI/ML Engineer currently working at ${PROFILE.company} as ${PROFILE.companyRole} (${PROFILE.duration}).`
  }

  if (msg.includes('email') || msg.includes('mail') || msg.includes('contact')) {
    return `You can reach Kuldeep at:\n• Primary: ${PROFILE.email}\n• Alt: kuldeepsolanki039@gmail.com\n• Phone: ${PROFILE.phone}`
  }

  if (msg.includes('skill') || msg.includes('tech') || msg.includes('stack') || msg.includes('know')) {
    return `Key skills:\n${PROFILE.skills.slice(0, 8).join(' · ')}\n\nCore areas: Computer Vision (YOLO, MMDetection), NLP (LLM fine-tuning, LangChain), Speech AI (Whisper), Edge ML (ONNX, Raspberry Pi), and LLM deployment.`
  }

  if (msg.includes('project') || msg.includes('work') || msg.includes('built')) {
    const deployed = PROFILE.projects.filter(p => p.status === 'deployed')
    return `Kuldeep has built 11+ projects. Top deployed ones:\n${deployed.map(p => `• ${p.name}: ${p.desc}`).join('\n')}`
  }

  if (msg.includes('yolo') || msg.includes('edge') || msg.includes('raspberry') || msg.includes('onnx')) {
    return `Yes! The YOLO Edge Deployment Pipeline is Kuldeep's most impressive work — he trained YOLO on 30K+ medical imaging samples, achieved 93% precision, then converted it to ONNX/C++ and deployed it on a Raspberry Pi with 30% faster inference. That's production edge ML.`
  }

  if (msg.includes('healthcare') || msg.includes('medical') || msg.includes('health')) {
    return `Kuldeep specializes in medical AI. He's built: chest X-ray detection with MMDetection, lab report OCR automation, healthcare NLP pipelines, and multilingual medical translation systems — all deployed at ${PROFILE.company}.`
  }

  if (msg.includes('experience') || /\b(work|company|job)\b/.test(msg)) {
    return `Currently: ${PROFILE.companyRole} at ${PROFILE.company} (${PROFILE.duration})\n\nPreviously: AI/ML Intern at the same company (Feb–Jul 2025) where he completed 22+ end-to-end AI projects.`
  }

  if (msg.includes('education') || msg.includes('degree') || msg.includes('university') || msg.includes('study')) {
    return `${PROFILE.education}\n\nB.Sc. in Zoology from Gujarat University (2021–2022)\n\nDiploma in Animal Husbandry from Kamdhenu University (2017–2020)\n\nThe non-linear path (biology → AI/ML) gives him unique domain depth in medical AI.`
  }

  if (msg.includes('llm') || msg.includes('gpt') || msg.includes('langchain') || msg.includes('mistral') || msg.includes('llama')) {
    return `Kuldeep has extensive LLM experience:\n• Fine-tuning and prompt engineering (LLaMA 3, Mistral)\n• RAG pipelines with LangChain + FastAPI\n• NLP-to-SQL translation with schema awareness\n• Mini-LLM optimization (1-bit quantization, ONNX export)\n• Healthcare-specific applications`
  }

  if (msg.includes('certification') || msg.includes('certificate')) {
    return `Certifications:\n• Data Analysis with Python — IBM (Coursera)\n• Transformers for NLP — Hugging Face (self-paced)`
  }

  if (msg.includes('available') || msg.includes('hire') || /\b(role|positions?)\b/.test(msg)) {
    return `Yes! Kuldeep is open to:\n• Full-time roles in AI systems\n• ML infrastructure positions\n• Edge ML deployment roles\n• Freelance collaborations\n\nContact: ${PROFILE.email}`
  }

  if (msg.includes('github') || msg.includes('linkedin') || msg.includes('portfolio')) {
    return `Find Kuldeep online:\n• GitHub: github.com/kuldeep562\n• LinkedIn: linkedin.com/in/kuldeep-solanki-298614276\n• Portfolio: You're looking at it!`
  }

  if (msg.includes('about') || msg.includes('who') || msg.includes('summary')) {
    return `${PROFILE.name} is an AI/ML Engineer with a unique background — started in animal biology (Zoology), now building production AI that runs in hospitals.\n\n${PROFILE.achievements}\n\n${PROFILE.experience}`
  }

  return `I can answer questions about Kuldeep's skills, projects (YOLO, NLP-to-SQL, OCR, STT, etc.), work experience, education, certifications, or how to contact him. What specific aspect would you like to know about?`
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
  'Tell me about YOLO pipeline',
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
