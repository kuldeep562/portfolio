interface MetricBarProps { label: string; value: string; barPercent: number; animate?: boolean; delay?: number }

export default function MetricBar({ label, value }: MetricBarProps) {
  return <div className="metric-bar"><span>{label}</span><strong>{value}</strong></div>
}
