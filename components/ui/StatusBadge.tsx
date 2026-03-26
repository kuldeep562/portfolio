import { ProjectStatus } from '@/lib/projects'

const STATUS_CONFIG: Record<ProjectStatus, { label: string; className: string }> = {
  deployed: { label: 'Deployed', className: 'badge-deployed' },
  experimental: { label: 'Experimental', className: 'badge-experimental' },
  research: { label: 'Research', className: 'badge-research' },
  ongoing: { label: 'Ongoing', className: 'badge-ongoing' },
}

interface StatusBadgeProps {
  status: ProjectStatus
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.deployed

  return (
    <span className={`badge ${config.className}`}>
      <span className="badge-dot" />
      {config.label}
    </span>
  )
}
