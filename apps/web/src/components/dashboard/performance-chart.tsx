'use client';

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { performanceSeries } from '@/lib/demo-data';
import { useI18n } from '@/providers/locale-provider';

const tooltipStyle = {
  background: 'var(--surface-elevated)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  fontSize: '12px',
  boxShadow: 'var(--shadow-md)',
};

export function PerformanceChart() {
  const { t } = useI18n();
  const data = performanceSeries.map((row) => ({
    subject: t(row.subjectKey),
    score: row.score,
  }));

  return (
    <div className="chart-container-sm">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Radar
            name={t('dashboard.score')}
            dataKey="score"
            stroke="var(--primary)"
            fill="var(--primary)"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
