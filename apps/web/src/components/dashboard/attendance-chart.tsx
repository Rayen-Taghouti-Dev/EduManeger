'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { attendanceData } from '@/lib/demo-data';

const tooltipStyle = {
  background: 'var(--surface-elevated)',
  border: '1px solid var(--border)',
  borderRadius: '8px',
  fontSize: '12px',
  boxShadow: 'var(--shadow-md)',
};

const COLORS = ['var(--success)', 'var(--danger)'];

export function AttendanceChart() {
  const totals = attendanceData.reduce(
    (acc, d) => ({ present: acc.present + d.present, absent: acc.absent + d.absent }),
    { present: 0, absent: 0 },
  );

  const pieData = [
    { name: 'Présents', value: totals.present },
    { name: 'Absents', value: totals.absent },
  ];

  const rate = Math.round((totals.present / (totals.present + totals.absent)) * 100);

  return (
    <div className="flex min-w-0 items-center gap-4">
      <div className="chart-container-sm min-w-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-24 shrink-0 space-y-3">
        <div>
          <p className="text-foreground text-2xl font-semibold leading-none">{rate}%</p>
          <p className="text-muted-foreground mt-1 text-[10px]">Moy. hebdo.</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="bg-success h-2 w-2 shrink-0 rounded-full" />
            <span className="text-muted-foreground truncate text-[11px]">Présents</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-danger h-2 w-2 shrink-0 rounded-full" />
            <span className="text-muted-foreground truncate text-[11px]">Absents</span>
          </div>
        </div>
      </div>
    </div>
  );
}
