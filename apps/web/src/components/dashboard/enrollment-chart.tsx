'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { enrollmentData } from '@/lib/demo-data';

const tooltipStyle = {
  background: 'var(--surface-elevated)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  fontSize: '12px',
  boxShadow: 'var(--shadow-md)',
};

export function EnrollmentChart() {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={enrollmentData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="enrollmentGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.2} />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
            width={40}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Area
            type="monotone"
            dataKey="students"
            stroke="var(--primary)"
            strokeWidth={2}
            fill="url(#enrollmentGrad)"
            name="Élèves"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
