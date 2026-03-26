export type ProjectStatus = 'deployed' | 'experimental' | 'research' | 'ongoing'

export interface ProjectStage {
  id: string
  label: string
  detail?: string
  latency?: string
  tech?: string
}

export interface ProjectMetric {
  label: string
  value: string
  barPercent: number
}

export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  stack: string[]
  stages: ProjectStage[]
  metrics: ProjectMetric[]
  status: ProjectStatus
  featured?: boolean
  challenge?: string
  solution?: string
  impact?: string
  href?: string
  github?: string
  explore?: string
}

// ─── FEATURED PROJECTS (Top 5 by priority) ─────────────────────────────────────
// Order: dashboard-framework > Medicine-detection > stt2 > NLP to SQL > AI-Interior

export const featuredProjects: Project[] = [
  {
    id: 'dashboard-framework',
    name: 'Dashboard Framework',
    tagline: 'Self-adaptive AI analytics dashboard — reads any DB schema, generates its own SQL',
    description:
      'Production-grade dashboard framework that autonomously connects to MySQL/PostgreSQL/SQLite, extracts schema via AI, generates optimized SQL, adapts its own frontend, and monitors schema changes in real time via SSE.',
    stack: ['Python', 'FastAPI', 'Vanilla JS SPA', 'Chart.js', 'WebSocket', 'JWT', 'Docker', 'Redis', 'Nginx'],
    stages: [
      { id: 'schema', label: 'Schema Extract', detail: 'Reads DB structure', tech: 'SQLAlchemy' },
      { id: 'ai', label: 'AI Query Gen', detail: 'LLM generates SQL', tech: 'Groq/Ollama' },
      { id: 'adapt', label: 'Auto-Adapt', detail: 'Patches frontend', tech: 'Dynamic JS' },
      { id: 'watch', label: 'Live Watch', detail: 'SSE real-time push', tech: 'Flask-SSE' },
      { id: 'deploy', label: 'Docker Deploy', detail: 'One-command stack', tech: 'Docker Compose' },
    ],
    metrics: [
      { label: 'Uptime', value: '99.8%', barPercent: 99 },
      { label: 'DB Types', value: '3', barPercent: 80 },
      { label: 'Latency', value: '<100ms', barPercent: 92 },
    ],
    status: 'deployed',
    featured: true,
    github: 'https://github.com/kuldeep562/dashboard-framework',
    explore:
      'MedWatch is a self-adaptive dashboard framework that reads any database schema and automatically generates its own SQL queries and frontend — no manual configuration needed. It supports MySQL, PostgreSQL, and SQLite simultaneously, ships as a single Docker Compose stack, and pushes live schema-change updates to all connected clients via Server-Sent Events.',
    challenge: 'Every healthcare institution has a different database schema. Building a dashboard that works for all of them without custom code.',
    solution: 'Schema extractor + LLM-powered query builder + dynamic frontend patcher — all triggered automatically at startup or on schema change.',
    impact: 'A BMC Mumbai deployment handles 2.5 lakh+ patient records with zero manual SQL writing.',
  },
  {
    id: 'medicine-detection',
    name: 'Medicine Detection',
    tagline: 'Real-time capsule & tablet detection via custom-trained YOLOv7 + ONNX',
    description:
      'Custom-trained YOLOv7 model that detects capsules, tablets, and pills from images with real-time FPS display. Supports both PyTorch and ONNX Runtime backends, with an interactive Gradio UI for image upload and webcam input.',
    stack: ['Python', 'YOLOv7', 'ONNX Runtime', 'OpenCV', 'PyTorch', 'Gradio'],
    stages: [
      { id: 'data', label: 'Data', detail: 'Labelled pill images', tech: 'Custom dataset' },
      { id: 'train', label: 'Train', detail: 'YOLOv7 fine-tuning', tech: 'PyTorch' },
      { id: 'export', label: 'Export', detail: 'ONNX conversion', tech: 'ONNX Runtime' },
      { id: 'infer-pytorch', label: 'PyTorch Infer', detail: 'Native inference', tech: 'PyTorch' },
      { id: 'infer-onnx', label: 'ONNX Infer', detail: 'Optimized inference', tech: 'ONNX Runtime' },
    ],
    metrics: [
      { label: 'Detection', value: 'Capsule/Tablet', barPercent: 90 },
      { label: 'Backends', value: '2', barPercent: 70 },
      { label: 'FPS', value: 'Real-time', barPercent: 88 },
    ],
    status: 'deployed',
    featured: true,
    github: 'https://github.com/kuldeep562/Medicine-detection',
    explore:
      'A custom-trained YOLOv7 model detects capsules, tablets, and pills from images with real-time performance. Ships with two inference backends — native PyTorch and optimized ONNX Runtime — plus an interactive Gradio web UI that supports both image uploads and live webcam input for instant detection.',
    challenge: 'Detecting small, similarly-shaped pharmaceutical objects in varied lighting and orientations.',
    solution: 'Custom YOLOv7 training with data augmentation, followed by ONNX export for sub-30ms inference.',
    impact: 'Enables automated pharmaceutical inspection and patient medication verification pipelines.',
  },
  {
    id: 'stt2',
    name: 'Clinical AI Assistant',
    tagline: 'AI-powered clinical documentation: 16 medical fields from unstructured doctor notes',
    description:
      'Production-ready FastAPI system that accepts unstructured doctor consultation notes and returns 16 structured clinical fields using a local LLM (Ollama or OpenAI-compatible API). Includes ICD-10 autocomplete with 90K entries, SNOMED-CT FHIR lookup, real-time benchmark scoring, and browser-based voice input via Whisper.',
    stack: ['Python', 'FastAPI', 'WebSocket', 'Ollama', 'Whisper', 'ICD-10 XML', 'SNOMED-CT FHIR', 'Vue.js'],
    stages: [
      { id: 'input', label: 'Voice/Text', detail: 'Microphone or typed', tech: 'Whisper + browser' },
      { id: 'extract', label: 'AI Extract', detail: '16 clinical fields', tech: 'Ollama (gemma3:4b)' },
      { id: 'icd', label: 'ICD-10 Match', detail: '90K disease entries', tech: 'In-memory XML' },
      { id: 'snomed', label: 'SNOMED-CT', detail: 'FHIR concept lookup', tech: 'External FHIR server' },
      { id: 'benchmark', label: 'Benchmark', detail: 'Quality scoring 0-100', tech: 'JSONL logging' },
    ],
    metrics: [
      { label: 'Fields', value: '16', barPercent: 95 },
      { label: 'ICD Codes', value: '90K', barPercent: 90 },
      { label: 'LLM', value: 'Local Ollama', barPercent: 85 },
    ],
    status: 'deployed',
    featured: true,
    github: 'https://github.com/kuldeep562/stt2',
    explore:
      'A full-stack clinical documentation system that converts unstructured doctor consultation notes into 16 structured medical fields using a local LLM. Features include ICD-10 autocomplete with 90,000 disease entries, automatic SNOMED-CT concept enrichment, real-time WebSocket streaming, benchmark quality scoring (0–100), and browser-based voice input powered by Whisper. Designed for embedding into any healthcare application via REST API.',
    challenge: 'Converting highly variable, free-form doctor notes into consistent, structured medical records.',
    solution: 'LLM prompt engineering with field separation, post-processing pipeline, and ICD/SNOMED enrichment layer.',
    impact: 'Reduces clinical documentation time by 70%, integrable into any EMR via REST or WebSocket API.',
  },
  {
    id: 'nlp-sql',
    name: 'NLP to SQL Generator',
    tagline: 'Natural language to precise SQL queries using LLaMA 3 + schema matching',
    description:
      'Full-stack application that converts natural language database queries into optimized SQL using LLaMA 3. Features spaCy + fuzzywuzzy schema matching, live SQL execution, and result explanation — with a FastAPI backend and Gradio frontend.',
    stack: ['Python', 'LLaMA 3', 'FastAPI', 'LangChain', 'spaCy', 'fuzzywuzzy', 'MySQL', 'Gradio'],
    stages: [
      { id: 'input', label: 'NLP Input', detail: 'Natural language query', tech: 'User text' },
      { id: 'schema', label: 'Schema Match', detail: 'Fuzzy DB schema match', tech: 'spaCy + fuzzywuzzy' },
      { id: 'llm', label: 'LLM Gen', detail: 'SQL generation', tech: 'LLaMA 3' },
      { id: 'execute', label: 'Execute', detail: 'Live SQL run', tech: 'MySQL' },
      { id: 'explain', label: 'Explain', detail: 'Result explanation', tech: 'LLM response' },
    ],
    metrics: [
      { label: 'Accuracy', value: '>95%', barPercent: 95 },
      { label: 'Latency', value: '<1s', barPercent: 85 },
      { label: 'Schemas', value: 'Multi', barPercent: 70 },
    ],
    status: 'deployed',
    featured: true,
    github: 'https://github.com/kuldeep562/NLP_to_SQL',
    explore:
      'An end-to-end NLP-to-SQL system that lets non-technical users query databases in plain English. It uses spaCy for semantic schema matching and fuzzywuzzy for fuzzy column/table name alignment, then generates SQL via LLaMA 3 with validation layers. Results are executed live and explained back in natural language.',
    challenge: 'Generating syntactically correct SQL from ambiguous natural language across diverse database schemas.',
    solution: 'Schema-grounded prompt engineering with fuzzy matching and multi-layer SQL validation before execution.',
    impact: 'Enables healthcare staff to query patient databases without writing a single line of SQL.',
  },
  {
    id: 'aiinterior',
    name: 'AIInterior Platform',
    tagline: 'AI-powered interior design — room photo to photorealistic render in 45 seconds',
    description:
      'Production-grade, cloud-native SaaS platform that transforms any room photo into a professional interior design using SDXL Turbo + ControlNet for layout-preserving generation. Features 12 curated design styles, AI furniture recommendations, real-time WebSocket progress, multi-room project grouping, JWT auth with refresh token rotation, and deployable on AWS, Azure, or GCP.',
    stack: ['Python', 'Next.js 14', 'FastAPI', 'Stable Diffusion XL', 'ControlNet', 'CLIP', 'SAM', 'Redis', 'PostgreSQL', 'Docker', 'Terraform'],
    stages: [
      { id: 'upload', label: 'Upload', detail: 'Room photo intake', tech: 'Next.js API' },
      { id: 'segment', label: 'Segment', detail: 'Room boundary detection', tech: 'SAM (Meta)' },
      { id: 'classify', label: 'Classify', detail: 'Style analysis', tech: 'CLIP' },
      { id: 'generate', label: 'Generate', detail: 'AI render', tech: 'SDXL Turbo + ControlNet' },
      { id: 'recommend', label: 'Furniture', detail: 'AI product matching', tech: 'Embedding search' },
    ],
    metrics: [
      { label: 'Styles', value: '12', barPercent: 80 },
      { label: 'Render Time', value: '~45s', barPercent: 88 },
      { label: 'Output', value: 'Up to 4K', barPercent: 95 },
    ],
    status: 'deployed',
    featured: true,
    github: 'https://github.com/kuldeep562/aiinterior',
    explore:
      'A full-stack AI interior design SaaS platform built with Next.js 14, FastAPI, and a GPU AI worker. Upload any room photo, pick from 12 design styles (Minimalist, Scandinavian, Industrial, Japanese, etc.), and receive a photorealistic AI-generated interior design in ~45 seconds. Uses SDXL Turbo + ControlNet to preserve room layout, SAM for room segmentation, and CLIP for style classification. Includes AI furniture recommendations with prices and purchase links.',
    challenge: 'Generating photorealistic interior designs that preserve original room layout and furniture placement.',
    solution: 'ControlNet for layout-preserving generation + SAM segmentation + CLIP style classification pipeline.',
    impact: 'Democratizes professional interior design — any user can generate studio-quality renders from a phone photo.',
  },
]

// ─── ALL SYSTEMS (remaining 5 + additional repos) ────────────────────────────

export const allProjects: Project[] = [
  {
    id: 'face-attendance',
    name: 'Smart Face Attendance System',
    tagline: 'Deep learning face recognition — automated student attendance from live video',
    description:
      'Face-recognition-based student attendance system using two deep learning approaches: a custom CNN trained from scratch and a DenseNet121 transfer learning model with OpenCV face detection. Processes live video streams and logs attendance to CSV.',
    stack: ['Python', 'OpenCV', 'TensorFlow', 'Keras', 'DenseNet121', 'CNN', 'NumPy', 'Pandas'],
    stages: [
      { id: 'capture', label: 'Capture', detail: 'Video frame extraction', tech: 'OpenCV' },
      { id: 'detect', label: 'Detect', detail: 'Haar cascade detection', tech: 'OpenCV' },
      { id: 'preprocess', label: 'Preprocess', detail: 'Face cropping + normalization', tech: 'OpenCV' },
      { id: 'train', label: 'Train', detail: 'CNN / DenseNet121', tech: 'TensorFlow + Keras' },
      { id: 'recognize', label: 'Recognize', detail: 'Cosine similarity match', tech: 'Embedding' },
    ],
    metrics: [
      { label: 'Accuracy', value: '96%', barPercent: 96 },
      { label: 'Faces DB', value: '500+', barPercent: 80 },
      { label: 'Approach', value: '2', barPercent: 60 },
    ],
    status: 'experimental',
    github: 'https://github.com/kuldeep562/Student_Attendance_System',
    explore:
      'A dual-approach face recognition attendance system — one branch uses a custom CNN trained from scratch, the other uses DenseNet121 transfer learning for higher accuracy on larger datasets. Detects faces from video frames using OpenCV, preprocesses them, trains the model, then recognizes students in real-time and logs attendance to CSV.',
    challenge: 'Building an accurate face recognition system for a diverse student dataset with varying lighting and angles.',
    solution: 'Dual approach — lightweight custom CNN for quick prototyping and DenseNet121 transfer learning for production-grade accuracy.',
    impact: 'Eliminates manual attendance taking; processes 500+ students per class session automatically.',
  },
  {
    id: 'speech-emotion',
    name: 'Speech Emotion Recognition',
    tagline: 'LSTM-based audio emotion classifier — 5 emotional states from voice',
    description:
      'Audio-based emotion recognition system using MFCC feature extraction via librosa and an LSTM deep learning model trained with Keras. Classifies voice recordings into 5 emotional states (happy, sad, angry, neutral, etc.) using RAVDESS and TESS datasets.',
    stack: ['Python', 'Librosa', 'PyTorch', 'Keras', 'LSTM', 'MFCC', 'torchaudio', 'NumPy'],
    stages: [
      { id: 'audio', label: 'Audio Input', detail: 'WAV/MP3 ingestion', tech: 'librosa' },
      { id: 'mfcc', label: 'MFCC', detail: 'Mel-spectrogram features', tech: 'librosa' },
      { id: 'train', label: 'Train LSTM', detail: '5-class emotion classifier', tech: 'Keras' },
      { id: 'evaluate', label: 'Evaluate', detail: 'Accuracy per emotion class', tech: 'Test set' },
      { id: 'visualize', label: 'Visualize', detail: 'Spectrograms + training plots', tech: 'matplotlib' },
    ],
    metrics: [
      { label: 'Accuracy', value: '85%', barPercent: 85 },
      { label: 'Emotion Classes', value: '5', barPercent: 70 },
      { label: 'Datasets', value: 'RAVDESS+TESS', barPercent: 75 },
    ],
    status: 'experimental',
    github: 'https://github.com/kuldeep562/Speech_Emotion_Recognition',
    explore:
      'An LSTM-based speech emotion recognition system that extracts MFCC features from audio using librosa and classifies emotional states from voice recordings. Trained on RAVDESS and TESS emotional speech datasets, achieving 85% accuracy across 5 emotion classes. Includes spectrogram visualizations and training curve plots.',
    challenge: 'Recognizing emotional states from audio with high accuracy across diverse speakers and recording conditions.',
    solution: 'MFCC feature extraction with LSTM sequence modeling for temporal patterns in speech.',
    impact: 'Enables call center analytics, virtual assistant emotion awareness, and mental health monitoring applications.',
  },
  {
    id: 'sentiment-analysis',
    name: 'Sentiment Analysis of Product Reviews',
    tagline: 'VADER-powered NLP classification — positive, neutral, negative from review text',
    description:
      'NLTK VADER sentiment analysis pipeline that classifies product reviews into positive, neutral, or negative categories. Visualizes sentiment distribution with Seaborn and produces compound scores alongside per-class breakdowns.',
    stack: ['Python', 'NLTK', 'VADER', 'Pandas', 'Seaborn', 'Matplotlib', 'NumPy'],
    stages: [
      { id: 'load', label: 'Load Data', detail: 'CSV review ingestion', tech: 'Pandas' },
      { id: 'preprocess', label: 'Preprocess', detail: 'Text cleaning + tokenization', tech: 'NLTK' },
      { id: 'analyze', label: 'Analyze', detail: 'VADER scoring', tech: 'NLTK VADER' },
      { id: 'classify', label: 'Classify', detail: 'pos/neu/neg labelling', tech: 'VADER compound' },
      { id: 'visualize', label: 'Visualize', detail: 'Seaborn charts', tech: 'Seaborn' },
    ],
    metrics: [
      { label: 'Sentiment Classes', value: '3', barPercent: 60 },
      { label: 'Score Type', value: 'Compound', barPercent: 70 },
      { label: 'Visualization', value: 'Seaborn', barPercent: 80 },
    ],
    status: 'deployed',
    github: 'https://github.com/kuldeep562/Sentiment_Analysis_of_Product_Review',
    explore:
      'A sentiment analysis pipeline using NLTK\'s VADER (Valence Aware Dictionary and sEntiment Reasoner) to classify product reviews as positive, neutral, or negative. Produces compound sentiment scores (range: -1 to +1), per-aspect breakdowns (pos/neu/neg), and Seaborn visualizations showing sentiment distribution across the review corpus.',
    challenge: 'Accurately detecting sentiment in informal, emoji-heavy product review text at scale.',
    solution: 'VADER\'s lexicon-based approach tuned for social media language, emoji, and informal writing.',
    impact: 'Provides instant aggregate sentiment intelligence for product teams and customer experience teams.',
  },
  {
    id: 'face-recognition-suite',
    name: 'Face Recognition Suite',
    tagline: 'Modular toolkit — OpenVINO face detection + TensorFlow embeddings + feature analysis',
    description:
      'A modular face recognition toolkit providing real-time face detection via OpenVINO and OpenCV, face embedding generation with customizable TensorFlow layers, facial feature utility scripts, and matching algorithms. Designed for integration into larger biometric systems.',
    stack: ['Python', 'OpenVINO', 'OpenCV', 'TensorFlow', 'NumPy', 'dlib'],
    stages: [
      { id: 'detect', label: 'Detect', detail: 'Real-time face detection', tech: 'OpenVINO + OpenCV' },
      { id: 'embed', label: 'Embed', detail: 'Face embedding vectors', tech: 'TensorFlow custom layers' },
      { id: 'match', label: 'Match', detail: 'Similarity scoring', tech: 'Cosine + regex features' },
      { id: 'analyze', label: 'Analyze', detail: 'Facial feature extraction', tech: 'dlib + custom utils' },
      { id: 'video', label: 'Video Pipe', detail: 'Streaming pipeline', tech: 'OpenCV VideoCapture' },
    ],
    metrics: [
      { label: 'Detection', value: 'Real-time', barPercent: 90 },
      { label: 'Backends', value: '3', barPercent: 70 },
      { label: 'Modular', value: 'Yes', barPercent: 95 },
    ],
    status: 'deployed',
    github: 'https://github.com/kuldeep562/Face_Recognition_Suite',
    explore:
      'A production-ready, modular face recognition toolkit with three core capabilities: real-time face detection using Intel OpenVINO and OpenCV, face embedding generation with customizable TensorFlow layers, and facial feature analysis utilities including regex-based feature matching and string similarity. Supports video stream processing and is designed as a drop-in module for larger biometric systems.',
    challenge: 'Building a reusable, modular face recognition pipeline that works across different hardware (CPU/GPU) and integrates into existing systems.',
    solution: 'OpenVINO for hardware-optimized inference + TensorFlow for customizable embedding layers + clean module separation.',
    impact: 'Provides a plug-and-play face recognition module for access control, attendance, and identity verification systems.',
  },
  {
    id: 'other-projects',
    name: 'Other Projects',
    tagline: 'ML fundamentals, NLP, CV, deep learning, and Python practice across 15+ repos',
    description:
      'A collection of hands-on repositories spanning machine learning fundamentals (regression, SVM, KNN, K-Means), NLP tasks (tokenization, NER, translation, chatbot), computer vision (thresholding, edge detection, contours), deep learning (MNIST, CIFAR-10, PCA, bias-variance), linear algebra foundations, and Python practice — all through Jupyter notebooks and clean Python scripts.',
    stack: ['Python', 'TensorFlow', 'Keras', 'PyTorch', 'scikit-learn', 'NLTK', 'spaCy', 'OpenCV', 'NumPy', 'Pandas', 'Jupyter'],
    stages: [
      { id: 'ml', label: 'ML Tasks', detail: '20+ ML algorithms', tech: 'scikit-learn + Keras' },
      { id: 'nlp', label: 'NLP Tasks', detail: 'Tokenization to translation', tech: 'NLTK + spaCy' },
      { id: 'cv', label: 'CV Tasks', detail: 'Image processing basics', tech: 'OpenCV + NumPy' },
      { id: 'dl', label: 'Deep Learning', detail: 'NN from scratch + pretrained', tech: 'PyTorch + TensorFlow' },
      { id: 'math', label: 'Math Found.', detail: 'Linear algebra + statistics', tech: 'NumPy + SciPy' },
    ],
    metrics: [
      { label: 'Repos', value: '15+', barPercent: 75 },
      { label: 'Topics', value: '5', barPercent: 83 },
      { label: 'Frameworks', value: '6+', barPercent: 85 },
    ],
    status: 'experimental',
    github: 'https://github.com/kuldeep562?tab=repositories',
    explore:
      '15+ hands-on repositories covering the breadth of AI/ML fundamentals: machine learning algorithms (regression, SVM, KNN, K-Means, decision trees, ensemble methods), NLP core tasks (tokenization, POS tagging, NER, sentiment analysis, machine translation, text generation, rule-based chatbot), computer vision basics (thresholding, edge detection, contour analysis, morphological operations, histogram processing), deep learning from scratch (MNIST, CIFAR-10, PCA, bias-variance decomposition, backpropagation), and mathematical foundations (linear algebra, Cramer\'s rule, statistics via SciPy). Each topic is organized in its own branch with real datasets and Jupyter notebooks.',
    challenge: 'Building a rock-solid foundation across the full AI/ML stack — from pure math to deployed models — without skipping any layer.',
    solution: 'Organized by domain (ML, NLP, CV, DL, Math) with dedicated branches, real datasets, and progressive difficulty from fundamentals to advanced topics.',
    impact: 'This breadth of practice directly enables the end-to-end production work seen in the featured projects — every pipeline stage was first mastered here.',
  },
]

export const projects: Project[] = [...featuredProjects, ...allProjects]
export const regularProjects = allProjects
