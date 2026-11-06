export interface SkillCategory {
  name: string
  description: string
  skills: string[]
  projects: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'AI / ML Engineering',
    description: 'Model development, evaluation and inference integration for applied machine learning workflows.',
    skills: ['PyTorch', 'Transformers', 'MMDetection', 'YOLO', 'ONNX', 'TensorRT'],
    projects: ['Medicine Detection on Jetson', 'ConsultAI', 'Edge AI Optimization'],
  },
  {
    name: 'Clinical & Healthcare Systems',
    description: 'Structured clinical workflows, terminology, safety checks and data exchange.',
    skills: ['ICD-10', 'SNOMED CT', 'FHIR', 'HL7', 'ASTM', 'Clinical workflow design'],
    projects: ['ConsultAI', 'Swasth-Saarthi', 'LIS UI & Analyzer Integration'],
  },
  {
    name: 'Speech AI',
    description: 'Provider integration, transcription routing and streaming interfaces.',
    skills: ['Whisper', 'Faster-Whisper', 'IndicConformer', 'WebSockets', 'FastAPI'],
    projects: ['Voxmesh', 'ConsultAI', 'Swasth-Saarthi'],
  },
  {
    name: 'Backend & Full-Stack',
    description: 'Application APIs, persistence, user interfaces and service integration.',
    skills: ['Python', 'Django', 'FastAPI', 'DRF', 'PostgreSQL', 'Redis', 'React'],
    projects: ['ConsultAI', 'Voxmesh', 'NLP to SQL', 'Yellow/Green Dashboard'],
  },
  {
    name: 'Inference & Edge Systems',
    description: 'Model export, device-specific optimization and performance investigation.',
    skills: ['ONNX', 'TensorRT', 'CUDA', 'Jetson', 'Raspberry Pi', 'C++'],
    projects: ['Medicine Detection on Jetson', 'Edge AI Optimization'],
  },
  {
    name: 'Automation & Integration',
    description: 'Workflow automation, analyzer communication and system operations.',
    skills: ['ASTM', 'HL7', 'TCP/Serial', 'Docker', 'N8N', 'GitLab API'],
    projects: ['LIS UI & Analyzer Integration', 'ETL Automation', 'Yellow/Green Dashboard'],
  },
  {
    name: 'MLOps — Currently Learning',
    description: 'Developing knowledge of machine learning operations, deployment workflows, model versioning and monitoring.',
    skills: ['MLflow (learning)', 'Docker (learning)', 'CI/CD (learning)'],
    projects: [],
  },
]
