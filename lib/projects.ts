export type ProjectStatus = 'Completed' | 'Ongoing' | 'In progress / paused' | 'Design phase' | 'Validation needed'
export type ProjectCategory = 'Healthcare AI' | 'Computer Vision' | 'Speech AI' | 'LLM & GenAI' | 'Systems Integration' | 'Automation' | 'Full-Stack Engineering'

export interface PortfolioProject {
  slug: string
  name: string
  category: ProjectCategory
  status: ProjectStatus
  period: string
  summary: string
  contribution: string
  technologies: string[]
  evidence: string
  featured?: boolean
  details?: string[]
}

// Curated from WorkBook.xlsx. Status and scope preserve the workbook's own caveats;
// project claims below are summaries, not independent verification of deployment.
export const projects: PortfolioProject[] = [
  {
    slug: 'swasth-saarthi', name: 'Swasth-Saarthi', category: 'Healthcare AI', status: 'Ongoing', period: 'July — Present', featured: true,
    summary: 'A multilingual clinical pre-consultation assistant developed across successive Django and FastAPI versions.',
    contribution: 'Workbook describes backend-owned conversation state, deterministic clinical risk rules, structured LLM outputs with field confidence, server-side clinical memory, audit logging, and provider integrations. The final implementation is described as docvisit and is currently in use; earlier versions are retained as project history.',
    technologies: ['Django', 'FastAPI', 'Python', 'PostgreSQL', 'Redis', 'Sarvam STT/TTS', 'LLM providers'],
    evidence: 'WorkBook.xlsx — Projects rows 33, 46–48; Swasth-Saarthi sheet.'
  },
  {
    slug: 'consultai', name: 'ConsultAI', category: 'Healthcare AI', status: 'Ongoing', period: 'May — Present', featured: true,
    summary: 'Clinical decision-support workflow that structures consultation notes and routes suggestions through safety and review steps.',
    contribution: 'Workbook describes a modular Django service, extraction pipeline, terminology enrichment, safety modules, speech-provider integration, per-token streaming, audit trail and pharmacist review workflow. A separate Patient Summary sibling is explicitly excluded from ConsultAI documentation.',
    technologies: ['Django', 'DRF', 'Channels', 'Celery', 'Redis', 'PostgreSQL', 'WebSockets'],
    evidence: 'WorkBook.xlsx — Projects rows 28, 38; ConsultAI sheet. Status: Ongoing.'
  },
  {
    slug: 'voxmesh', name: 'Voxmesh', category: 'Speech AI', status: 'Ongoing', period: 'July — Present', featured: true,
    summary: 'A speech backend bringing multiple transcription providers behind a shared REST and WebSocket interface.',
    contribution: 'Workbook describes provider adapters, language-aware routing, studio and admin interfaces, SDK/CLI work, cost tracking, metrics, rate limits and WebSocket backpressure. iOS is identified as a scaffold, not a completed application.',
    technologies: ['FastAPI', 'Python', 'WebSockets', 'Faster-Whisper', 'IndicConformer', 'Prometheus'],
    evidence: 'WorkBook.xlsx — Projects row 34; Categories sheet. Status: Ongoing.'
  },
  {
    slug: 'meddetect-jetson', name: 'Medicine Detection on Jetson', category: 'Computer Vision', status: 'Completed', period: 'September — April', featured: true,
    summary: 'Real-time medicine detection and counting with a TensorRT inference path for Jetson hardware.',
    contribution: 'Workbook describes camera-to-inference processing, ONNX/TensorRT engine preparation, post-processing, FastAPI entry point, packaging and unit tests. A separate paused Raspberry Pi integration is not represented as completed deployment.',
    technologies: ['Python', 'TensorRT', 'CUDA', 'OpenCV', 'ONNX', 'FastAPI', 'Jetson'],
    evidence: 'WorkBook.xlsx — Projects rows 27, 39–40, 60; Detection sheet.'
  },
  {
    slug: 'lis-integration', name: 'LIS UI & Analyzer Integration', category: 'Systems Integration', status: 'Completed', period: 'September', featured: true,
    summary: 'Laboratory information system work spanning desktop UI and analyzer communication/integration.',
    contribution: 'Workbook records LIS UI enhancement, analyzer configuration, TCP/serial/file communication, HL7/ASTM handling, and 46+ analyzers integrated across the wider LIS production system. Specific ownership and analyzer-by-analyzer evidence should be confirmed before publishing detail.',
    technologies: ['Python', 'PyQt6', 'ASTM', 'HL7', 'TCP/Serial', 'File I/O'],
    evidence: 'WorkBook.xlsx — Overview; Skills & Tools; LIS sheet. Status confirmed completed by project owner.'
  },
  {
    slug: 'nlp-to-sql', name: 'NLP to SQL', category: 'LLM & GenAI', status: 'Completed', period: 'May — June',
    summary: 'A full-stack prototype that converts natural-language questions into database queries and executes them.',
    contribution: 'Workbook describes a FastAPI and Gradio application with schema-aware generation and SQL validation. The workbook calls it an end-to-end system; this site does not claim independent production deployment.',
    technologies: ['FastAPI', 'Gradio', 'Ollama', 'LLaMA 3', 'MySQL', 'SQLParse'],
    evidence: 'WorkBook.xlsx — Projects row 17.'
  },
  {
    slug: 'edge-optimization', name: 'Edge AI Optimization', category: 'Computer Vision', status: 'Ongoing', period: 'October — Present',
    summary: 'Optimization and benchmarking work for vision inference across Jetson and Raspberry Pi targets.',
    contribution: 'Workbook records PyTorch-to-TensorRT work, FP16 optimization and FPS benchmarking. The portfolio avoids treating the reported device performance as a universal or independently verified benchmark.',
    technologies: ['TensorRT', 'ONNX', 'PyTorch', 'CUDA', 'Jetson'],
    evidence: 'WorkBook.xlsx — Projects row 31; Detection sheet.'
  },
  {
    slug: 'yellow-green', name: 'Yellow/Green Deployment Dashboard', category: 'Automation', status: 'Validation needed', period: 'June — August',
    summary: 'An internal deployment dashboard intended to automate tagging, release creation and pipeline monitoring.',
    contribution: 'Workbook describes a Node/Express and React tool with GitLab API integration, WebSocket updates and PostgreSQL persistence. It is explicitly marked backend ready / needs validation and not tested in production.',
    technologies: ['Node.js', 'Express', 'React', 'PostgreSQL', 'GitLab API', 'WebSockets'],
    evidence: 'WorkBook.xlsx — Projects row 36. Validation required.'
  },
  {
    slug: 'impact-analysis', name: 'Engineering Digital Twin — Design Specification', category: 'Automation', status: 'Design phase', period: 'August',
    summary: 'A documented platform architecture proposal for evidence-grounded software engineering intelligence.',
    contribution: 'Workbook records authorship of a multi-volume design specification and architecture diagrams. It explicitly states there is no implementation code; this is presented as design/documentation, not a built platform.',
    technologies: ['Python', 'Go', 'TypeScript', 'Neo4j', 'Qdrant', 'PostgreSQL'],
    evidence: 'WorkBook.xlsx — Projects row 35. Design phase only.'
  },
  {
    slug: 'camunda-blueprint', name: 'Camunda 8 HIMS Blueprint', category: 'Systems Integration', status: 'Design phase', period: 'June',
    summary: 'A healthcare workflow-orchestration implementation blueprint with process and architecture documentation.',
    contribution: 'Workbook records BPMN workflow and phased architecture planning; it is explicitly a design specification, not an implemented system. Business ROI estimates in the workbook are not presented as achieved outcomes.',
    technologies: ['Camunda 8', 'BPMN', 'DMN', 'FHIR', 'HL7'],
    evidence: 'WorkBook.xlsx — Projects row 44. Design phase only.'
  },
]

export const featuredProjects = projects.filter(project => project.featured)
export const allProjects = projects
