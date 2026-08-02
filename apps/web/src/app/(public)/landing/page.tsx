'use client';

import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Check,
  CreditCard,
  GraduationCap,
  MessageSquare,
  Shield,
  Star,
  Users,
  Zap,
} from 'lucide-react';

import { PublicLayout } from '@/components/layouts/public-layout';
import { useI18n } from '@/providers/locale-provider';
import { Badge, Button } from '@edumanager/ui';

export default function LandingPage() {
  const { t } = useI18n();

  const features = [
    {
      icon: GraduationCap,
      title: t('landing.featureStudentsTitle'),
      description: t('landing.featureStudentsDesc'),
    },
    {
      icon: Users,
      title: t('landing.featureStaffTitle'),
      description: t('landing.featureStaffDesc'),
    },
    {
      icon: CreditCard,
      title: t('landing.featureFinanceTitle'),
      description: t('landing.featureFinanceDesc'),
    },
    {
      icon: BarChart3,
      title: t('landing.featureAnalyticsTitle'),
      description: t('landing.featureAnalyticsDesc'),
    },
    {
      icon: MessageSquare,
      title: t('landing.featureCommsTitle'),
      description: t('landing.featureCommsDesc'),
    },
    {
      icon: Shield,
      title: t('landing.featureSecurityTitle'),
      description: t('landing.featureSecurityDesc'),
    },
  ];

  const stats = [
    { value: '500+', label: t('landing.statsSchools') },
    { value: '1M+', label: t('landing.statsStudents') },
    { value: '99.9%', label: t('landing.statsUptime') },
    { value: '4.9', label: t('landing.statsRating') },
  ];

  const testimonials = [
    {
      quote: t('landing.testimonial1'),
      author: 'Dr Sarah Mitchell',
      role: t('landing.testimonial1Role'),
    },
    {
      quote: t('landing.testimonial2'),
      author: 'James Okonkwo',
      role: t('landing.testimonial2Role'),
    },
    {
      quote: t('landing.testimonial3'),
      author: 'Lisa Park',
      role: t('landing.testimonial3Role'),
    },
  ];

  const plans = [
    {
      name: t('landing.planStarter'),
      price: t('landing.planStarterPrice'),
      period: t('landing.perMonth'),
      description: t('landing.planStarterDesc'),
      features: [
        t('landing.planFeat200'),
        t('landing.planFeat5Staff'),
        t('landing.planFeatBasicReports'),
        t('landing.planFeatEmail'),
      ],
      highlighted: false,
    },
    {
      name: t('landing.planPro'),
      price: t('landing.planProPrice'),
      period: t('landing.perMonth'),
      description: t('landing.planProDesc'),
      features: [
        t('landing.planFeat1000'),
        t('landing.planFeatUnlimitedStaff'),
        t('landing.planFeatAdvancedAnalytics'),
        t('landing.planFeatFinance'),
        t('landing.planFeatPriority'),
      ],
      highlighted: true,
    },
    {
      name: t('landing.planEnterprise'),
      price: t('landing.planEnterprisePrice'),
      period: '',
      description: t('landing.planEnterpriseDesc'),
      features: [
        t('landing.planFeatUnlimitedStudents'),
        t('landing.planFeatMultiCampus'),
        t('landing.planFeatCustomIntegrations'),
        t('landing.planFeatSla'),
        t('landing.planFeatOnPrem'),
      ],
      highlighted: false,
    },
  ];

  const faqs = [
    { q: t('landing.faq1q'), a: t('landing.faq1a') },
    { q: t('landing.faq2q'), a: t('landing.faq2a') },
    { q: t('landing.faq3q'), a: t('landing.faq3a') },
    { q: t('landing.faq4q'), a: t('landing.faq4a') },
  ];

  const previewKpis = [
    { value: '1,245', label: t('landing.previewStudents') },
    { value: '85', label: t('landing.previewTeachers') },
    { value: '42', label: t('landing.previewClasses') },
    { value: '97%', label: t('landing.previewAttendance') },
  ];

  return (
    <PublicLayout>
      <section className="relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-40" />
        <div className="gradient-mesh relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="animate-slide-up mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6 text-xs">
              <Zap className="mr-1 h-3 w-3" />
              {t('landing.badge')}
            </Badge>
            <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {t('landing.heroTitleBefore')}{' '}
              <span className="text-primary">{t('landing.heroTitleHighlight')}</span>
            </h1>
            <p className="text-muted mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              {t('landing.heroSubtitle')}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="h-11 w-full px-8 sm:w-auto" asChild>
                <Link href="/login">
                  {t('landing.freeTrial')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-11 w-full sm:w-auto" asChild>
                <Link href="/login">{t('public.login')}</Link>
              </Button>
            </div>
            <p className="text-muted-foreground mt-4 text-sm">{t('landing.trialNote')}</p>
          </div>

          <div
            className="animate-fade-in relative mx-auto mt-16 max-w-4xl"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="widget-card overflow-hidden shadow-lg">
              <div className="border-border flex items-center gap-2 border-b px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="bg-danger/60 h-2.5 w-2.5 rounded-full" />
                  <div className="bg-warning/60 h-2.5 w-2.5 rounded-full" />
                  <div className="bg-success/60 h-2.5 w-2.5 rounded-full" />
                </div>
                <span className="text-muted-foreground mx-auto text-xs">dashboard.edumanager.pro</span>
              </div>
              <div className="bg-background-subtle p-4 sm:p-6">
                <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {previewKpis.map((kpi) => (
                    <div key={kpi.label} className="widget-card p-3 text-center">
                      <p className="text-foreground truncate text-sm font-semibold">{kpi.value}</p>
                      <p className="text-muted-foreground truncate text-[10px]">{kpi.label}</p>
                    </div>
                  ))}
                </div>
                <div className="widget-card h-32 sm:h-40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-border border-y bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-foreground text-3xl font-semibold tracking-tight">{s.value}</p>
              <p className="text-muted-foreground mt-1 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-foreground text-3xl font-semibold tracking-tight">
            {t('landing.featuresTitle')}
          </h2>
          <p className="text-muted mx-auto mt-4 max-w-xl text-base">{t('landing.featuresSubtitle')}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="widget-card-hover p-6">
                <div className="bg-primary-light text-primary mb-4 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-foreground text-base font-semibold">{f.title}</h3>
                <p className="text-muted mt-2 text-sm leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-background-subtle px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-foreground mb-12 text-center text-3xl font-semibold tracking-tight">
            {t('landing.testimonialsTitle')}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.author} className="widget-card p-6">
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="fill-warning text-warning h-3.5 w-3.5" />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                <div className="border-border mt-6 border-t pt-4">
                  <p className="truncate text-sm font-medium">{item.author}</p>
                  <p className="text-muted-foreground truncate text-xs">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-foreground text-3xl font-semibold tracking-tight">
            {t('landing.pricingTitle')}
          </h2>
          <p className="text-muted mt-4 text-base">{t('landing.pricingSubtitle')}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.highlighted
                  ? 'widget-card relative overflow-hidden ring-2 ring-primary'
                  : 'widget-card-hover'
              }
            >
              {plan.highlighted ? (
                <div className="bg-primary absolute top-0 right-0 left-0 py-1 text-center text-[10px] font-medium text-white">
                  {t('landing.popular')}
                </div>
              ) : null}
              <div className={plan.highlighted ? 'p-6 pt-8' : 'p-6'}>
                <h3 className="text-foreground text-lg font-semibold">{plan.name}</h3>
                <p className="text-muted-foreground mt-1 text-sm">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-foreground text-4xl font-semibold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-sm">{plan.period}</span>
                </div>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="text-success h-4 w-4 shrink-0" />
                      <span className="min-w-0 text-sm leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-8 h-10 w-full"
                  variant={plan.highlighted ? 'default' : 'outline'}
                  asChild
                >
                  <Link href="/login">{t('public.getStarted')}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="bg-background-subtle px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-foreground mb-12 text-center text-3xl font-semibold tracking-tight">
            {t('landing.faqTitle')}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="widget-card p-6">
                <h3 className="text-foreground text-sm font-semibold">{faq.q}</h3>
                <p className="text-muted mt-2 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-border border-t px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-3xl font-semibold tracking-tight">
            {t('landing.ctaTitle')}
          </h2>
          <p className="text-muted mt-4 text-base">{t('landing.ctaSubtitle')}</p>
          <Button size="lg" className="mt-8 h-11 w-full px-8 sm:w-auto" asChild>
            <Link href="/login">
              {t('landing.ctaButton')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
