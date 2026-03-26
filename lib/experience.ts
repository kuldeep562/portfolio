export interface Experience {
  id: string
  title: string
  company: string
  location?: string
  date: string
  current?: boolean
  type: 'work' | 'education'
  points: string[]
}

export const experiences: Experience[] = [
  {
    id: 'associate-ai-ml',
    title: 'Associate AI/ML Engineer',
    company: 'Artem HealthTech Pvt. Ltd.',
    location: 'Ahmedabad, India',
    date: 'Aug 2025 – Present',
    current: true,
    type: 'work',
    points: [
      'Contributing to development and deployment of <strong>GenAI pipelines</strong> for healthcare applications.',
      'Optimizing LLMs and speech models for production use in clinical and real-time environments.',
      'Developing and fine-tuning <strong>object detection models</strong> for medical imaging tasks using YOLO and MMDetection.',
      'Building lab report integration systems with <strong>OCR and NLP pipelines</strong>, enabling automated extraction of structured data.',
    ],
  },
  {
    id: 'ai-ml-intern',
    title: 'AI/ML Intern',
    company: 'Artem HealthTech Pvt. Ltd.',
    location: 'Ahmedabad, India',
    date: 'Feb 2025 – Jul 2025',
    type: 'work',
    points: [
      'Completed <strong>22 end-to-end projects</strong> in NLP, Computer Vision, Speech, and Edge ML.',
      'Built production-ready NLP modules (translation, NLP-to-SQL, entity extraction) achieving <strong>>95% accuracy</strong> on EMR datasets.',
      'Designed and fine-tuned lightweight detection models on <strong>30K+ samples</strong>, reaching <strong>>93% precision</strong>.',
      'Researched and optimized mini-LLMs (1-bit quantization, ONNX export) deployed on Raspberry Pi with <strong>30% faster inference</strong>.',
    ],
  },
  {
    id: 'msc',
    title: 'M.Sc. Artificial Intelligence & Machine Learning',
    company: 'Gujarat University',
    location: 'Gujarat, India',
    date: '2023 – 2025',
    type: 'education',
    points: [
      'Graduate degree specializing in AI/ML theory, deep learning architectures, and applied machine learning.',
      'Focused research on <strong>multilingual NLP systems</strong> and <strong>edge deployment of vision models</strong>.',
    ],
  },
  {
    id: 'bsc',
    title: 'B.Sc. in Zoology',
    company: 'Gujarat University',
    location: 'Gujarat, India',
    date: '2021 – 2022',
    type: 'education',
    points: [
      'Built foundational understanding of biological systems, data analysis, and scientific methodology.',
      'Developed analytical thinking that later proved critical in approaching medical AI with domain expertise.',
    ],
  },
  {
    id: 'diploma',
    title: 'Diploma in Animal Husbandry',
    company: 'Kamdhenu University',
    location: 'Gujarat, India',
    date: '2017 – 2020',
    type: 'education',
    points: [
      'Practical training in animal health, clinical documentation, and medical data handling.',
    ],
  },
]

export const certifications = [
  { name: 'Data Analysis with Python', issuer: 'IBM – Coursera' },
  { name: 'Transformers for NLP', issuer: 'Hugging Face (self-paced)' },
]

export const experienceStory =
  'Started in <strong>animal biology</strong>.<br/><br/>Now building <strong>AI that ships in production</strong>.<br/><br/>The non-linear path gave me something most CS grads don\'t have — domain depth in medical AI systems. Biology taught me to think rigorously about living systems; AI lets me build with them. I think in terms of end-to-end pipelines, not just models.'
