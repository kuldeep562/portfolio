import type { ProjectStatus } from '@/lib/projects'

interface StatusBadgeProps { status: ProjectStatus }

const classes: Record<ProjectStatus, string> = {
  Completed: 'status-completed',
  Ongoing: 'status-ongoing',
  'In progress / paused': 'status-paused',
  'Design phase': 'status-design',
  'Validation needed': 'status-validation',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status ${classes[status]}`}>{status}</span>
}
