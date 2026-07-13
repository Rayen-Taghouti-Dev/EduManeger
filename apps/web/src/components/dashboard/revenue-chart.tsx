'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { revenueData } from '@/lib/demo-data';

const tooltipStyle = {
  background: 'var(--surface-elevated)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  fontSize: '12px',
  boxShadow: 'var(--shadow-md)',
};

export function RevenueChart() {
  return (
    <div className="chart-container-sm">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={revenueData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            width={36}
          />
          <Tooltip
            formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
            contentStyle={tooltipStyle}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
          />
        <Bar dataKey="revenue" fill="var(--primary)" radius={[4, 4, 0, 0]} name="Revenus" maxBarSize={24} />
        <Bar dataKey="expenses" fill="var(--secondary)" radius={[4, 4, 0, 0]} name="Dépenses" maxBarSize={24} opacity={0.7} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
