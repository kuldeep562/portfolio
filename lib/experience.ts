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
    summary: 'Working across healthcare AI, speech systems, computer vision and laboratory integrations.',
    contributions: [
      'Develop backend workflows, provider integrations and safety-related features for clinical decision-support and multilingual pre-consultation applications.',
      'Integrate speech-to-text providers and streaming interfaces into shared speech infrastructure.',
      'Contribute to computer-vision inference and edge optimization, alongside LIS interface and analyzer integration work.',
    ],
  },
]

export const education = [
  { name: 'M.Sc. Artificial Intelligence & Machine Learning', institution: 'Gujarat University', period: '2023 — 2025' },
  { name: 'B.Sc. Zoology', institution: 'Gujarat University', period: '2021 — 2022' },
  { name: 'Diploma in Animal Husbandry', institution: 'Kamdhenu University', period: '2017 — 2020' },
]
