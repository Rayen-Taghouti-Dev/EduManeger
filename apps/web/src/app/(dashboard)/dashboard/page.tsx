'use client';

import { SchoolOverview } from '@/components/dashboard/school-overview';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { AttendanceChart } from '@/components/dashboard/attendance-chart';
import { EnrollmentChart } from '@/components/dashboard/enrollment-chart';
import { KpiCards } from '@/components/dashboard/kpi-cards';
import { NotificationsPanel } from '@/components/dashboard/notifications-panel';
import { PerformanceChart } from '@/components/dashboard/performance-chart';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { UpcomingEvents } from '@/components/dashboard/upcoming-events';
import { useI18n } from '@/providers/locale-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@edumanager/ui';

export default function DashboardPage() {
  const { t } = useI18n();

  return (
    <div className="gradient-mesh mx-auto w-full max-w-[1600px] space-y-6">
      <SchoolOverview />

      <KpiCards />

      <section className="grid gap-4 lg:grid-cols-12 lg:gap-6">
        <Card className="card-hover overflow-hidden lg:col-span-8">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-semibold leading-none">
              {t('dashboard.enrollmentTitle')}
            </CardTitle>
            <CardDescription className="text-xs">{t('dashboard.enrollmentDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="overflow-hidden pt-4">
            <EnrollmentChart />
          </CardContent>
        </Card>

        <div className="lg:col-span-4">
          <UpcomingEvents />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <Card className="card-hover overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-semibold leading-none">
              {t('dashboard.attendanceTitle')}
            </CardTitle>
            <CardDescription className="text-xs">{t('dashboard.attendanceDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="overflow-hidden pt-4">
            <AttendanceChart />
          </CardContent>
        </Card>

        <Card className="card-hover overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-semibold leading-none">
              {t('dashboard.performanceTitle')}
            </CardTitle>
            <CardDescription className="text-xs">{t('dashboard.performanceDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="overflow-hidden pt-4">
            <PerformanceChart />
          </CardContent>
        </Card>

        <Card className="card-hover overflow-hidden sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-semibold leading-none">
              {t('dashboard.revenueTitle')}
            </CardTitle>
            <CardDescription className="text-xs">{t('dashboard.revenueDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="overflow-hidden pt-4">
            <RevenueChart />
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-3">
          <NotificationsPanel />
        </div>
        <div className="lg:col-span-6">
          <ActivityFeed />
        </div>
        <div className="lg:col-span-3">
          <QuickActions />
        </div>
      </section>
    </div>
  );
}
