export const NAV_ITEMS = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'featured', label: 'Projects', href: '#featured' },
  { id: 'systems', label: 'Systems', href: '#systems' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export const SYSTEM_LAYERS = [
  {
    id: 'data',
    name: 'Data Layer',
    desc: 'Ingestion, cleaning, and preprocessing of medical records and imaging data',
    tools: ['DICOM', 'OpenCV', 'Pandas'],
    icon: 'database',
  },
  {
    id: 'model',
    name: 'Model Layer',
    desc: 'Training, fine-tuning, and optimization of ML models for clinical tasks',
    tools: ['PyTorch', 'YOLO', 'MMDetection', 'HuggingFace'],
    icon: 'brain',
  },
  {
    id: 'deploy',
    name: 'Deploy Layer',
    desc: 'ONNX export, quantization, and C++ runtime for edge inference',
    tools: ['ONNX', 'C++', 'Raspberry Pi', 'ONNX Runtime'],
    icon: 'server',
  },
  {
    id: 'api',
    name: 'API Layer',
    desc: 'FastAPI microservices, WebSocket streaming, and Gradio interfaces',
    tools: ['FastAPI', 'WebSocket', 'Gradio', 'LangChain'],
    icon: 'zap',
  },
]

export const ANIMATION_TIMINGS = {
  loader: {
    monogramDelay: 100,
    lineDelay: 500,
    typeDelay: 900,
    statusDelay: 1500,
    exitDelay: 1900,
    totalDuration: 2200,
  },
  hero: {
    stagger: 80,
    duration: 400,
  },
  counter: {
    duration: 2000,
  },
}
