export interface ExperienceEntry {
  role: string
  organization: string
  period: string
  status: string
  summary: string
  contributions: string[]
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Associate AI/ML Engineer',
    organization: 'Artem HealthTech Pvt. Ltd.',
    period: 'August 2025 — Present',
    status: 'Current',
    summary: 'Healthcare AI, clinical workflow engineering, speech systems, computer vision and laboratory integrations.',
    contributions: [
      'Work across clinical decision-support and multilingual pre-consultation systems, including backend workflows, provider integrations and safety-related features.',
      'Develop speech infrastructure and integrations across multiple STT providers and streaming interfaces.',
      'Contribute to computer-vision inference and edge optimization, as well as LIS UI and analyzer integration work.',
    ],
  },
]

export const education = [
  { name: 'M.Sc. Artificial Intelligence & Machine Learning', institution: 'Gujarat University', period: '2023 — 2025' },
  { name: 'B.Sc. Zoology', institution: 'Gujarat University', period: '2021 — 2022' },
  { name: 'Diploma in Animal Husbandry', institution: 'Kamdhenu University', period: '2017 — 2020' },
]
