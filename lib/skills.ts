export interface SkillCategory {
  id: string
  name: string
  color: string
  icon: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    name: 'Languages & Frameworks',
    color: 'cyan',
    icon: 'code',
    skills: ['Python', 'SQL', 'C++', 'JavaScript', 'TypeScript', 'TensorFlow', 'PyTorch', 'FastAPI', 'LangChain'],
  },
  {
    id: 'ml-ai',
    name: 'ML / AI',
    color: 'purple',
    icon: 'brain',
    skills: [
      'YOLO',
      'MMDetection',
      'LLM Fine-tuning',
      'PEFT/LoRA',
      'ONNX Runtime',
      'Hugging Face',
      'Scikit-learn',
      'OpenCV',
      'Computer Vision',
      'NLP',
      'Speech AI',
      'Edge ML',
    ],
  },
  {
    id: 'models',
    name: 'Models & Platforms',
    color: 'green',
    icon: 'cpu',
    skills: [
      'LLaMA 3',
      'Mistral',
      'XLM-R',
      'Faster-Whisper',
      'CLIP',
      'SAM',
      'mT5',
      'Bloom',
      'Phi',
      'CodeLLaMA',
      'MarianMT',
    ],
  },
  {
    id: 'deployment',
    name: 'Deployment & Tools',
    color: 'amber',
    icon: 'server',
    skills: [
      'Ollama',
      'Hugging Face',
      'Docker',
      'Raspberry Pi',
      'ONNX',
      'Git',
      'Gradio',
      'FastAPI',
      'PostgreSQL',
      'SQLite',
      'WebSocket',
    ],
  },
]
