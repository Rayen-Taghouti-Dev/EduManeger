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
import { Badge, Button } from '@edumanager/ui';

const features = [
  {
    icon: GraduationCap,
    title: 'Gestion des élèves',
    description: 'Inscriptions, profils, présences et dossiers dans un système unifié.',
  },
  {
    icon: Users,
    title: 'Personnel & enseignants',
    description: 'Gestion du personnel, des horaires et du suivi des performances.',
  },
  {
    icon: CreditCard,
    title: 'Finance & facturation',
    description: 'Scolarité automatisée, suivi des paiements et rapports financiers.',
  },
  {
    icon: BarChart3,
    title: 'Analytique',
    description: 'Tableaux de bord en temps réel et rapports exportables par département.',
  },
  {
    icon: MessageSquare,
    title: 'Communication',
    description: 'Messagerie parents, annonces et mises à jour de progression.',
  },
  {
    icon: Shield,
    title: 'Sécurité entreprise',
    description: 'Accès par rôles, journaux d\'audit et conformité RGPD intégrée.',
  },
];

const stats = [
  { value: '500+', label: 'Écoles' },
  { value: '1M+', label: 'Élèves' },
  { value: '99,9 %', label: 'Disponibilité' },
  { value: '4,9', label: 'Note' },
];

const testimonials = [
  {
    quote:
      'EduManager Pro a transformé la gestion de l\'Académie Greenwood. Des inscriptions à la finance — tout est fluide.',
    author: 'Dr Sarah Mitchell',
    role: 'Directrice, Académie Greenwood',
  },
  {
    quote:
      'L\'analytique seule nous fait gagner 20 heures par semaine. Notre conseil adore les rapports en temps réel.',
    author: 'James Okonkwo',
    role: 'Directeur, Préparatoire Riverside',
  },
  {
    quote:
      'Enfin un logiciel scolaire moderne. Les enseignants l\'ont adopté en quelques jours.',
    author: 'Lisa Park',
    role: 'Directrice IT, International Oak Hill',
  },
];

const plans = [
  {
    name: 'Débutant',
    price: '99 $',
    period: '/mois',
    description: 'Jusqu\'à 200 élèves',
    features: ['200 élèves', '5 comptes personnel', 'Rapports de base', 'Support par e-mail'],
    highlighted: false,
  },
  {
    name: 'Professionnel',
    price: '249 $',
    period: '/mois',
    description: 'Jusqu\'à 1 000 élèves',
    features: [
      '1 000 élèves',
      'Personnel illimité',
      'Analytique avancée',
      'Module finance',
      'Support prioritaire',
    ],
    highlighted: true,
  },
  {
    name: 'Entreprise',
    price: 'Sur mesure',
    period: '',
    description: 'Réseaux multi-campus',
    features: [
      'Élèves illimités',
      'Multi-campus',
      'Intégrations personnalisées',
      'SLA dédié',
      'Option sur site',
    ],
    highlighted: false,
  },
];

const faqs = [
  {
    q: 'Combien de temps prend la mise en place ?',
    a: 'La plupart des écoles sont opérationnelles en 2 semaines avec un accompagnement guidé.',
  },
  {
    q: 'Pouvons-nous migrer nos données existantes ?',
    a: 'Oui — assistance à la migration gratuite avec les forfaits Professionnel et Entreprise.',
  },
  {
    q: 'Nos données sont-elles sécurisées ?',
    a: 'Chiffrement entreprise, sauvegardes régulières et conformité RGPD intégrée.',
  },
  {
    q: 'Y a-t-il un essai gratuit ?',
    a: 'Essai gratuit de 14 jours. Aucune carte bancaire requise.',
  },
];

const previewKpis = [
  { value: '1 245', label: 'Élèves' },
  { value: '85', label: 'Enseignants' },
  { value: '42', label: 'Classes' },
  { value: '97 %', label: 'Présence' },
];

export default function LandingPage() {
  return (
    <PublicLayout>
      <section className="relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-40" />
        <div className="gradient-mesh relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="animate-slide-up mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6 text-xs">
              <Zap className="mr-1 h-3 w-3" />
              Approuvé par plus de 500 écoles privées
            </Badge>
            <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Le système d&apos;exploitation des{' '}
              <span className="text-primary">écoles modernes</span>
            </h1>
            <p className="text-muted mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:text-lg">
              Unifiez la gestion académique, financière et la communication sur une plateforme
              élégante. Conçu pour les administrateurs exigeants.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" className="h-11 w-full px-8 sm:w-auto" asChild>
                <Link href="/login">
                  Essai gratuit
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-11 w-full sm:w-auto" asChild>
                <Link href="/login">Connexion</Link>
              </Button>
            </div>
            <p className="text-muted-foreground mt-4 text-sm">
              Sans carte bancaire · Essai de 14 jours
            </p>
          </div>

          <div className="animate-fade-in relative mx-auto mt-16 max-w-4xl" style={{ animationDelay: '0.2s' }}>
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
            Tout ce dont votre école a besoin
          </h2>
          <p className="text-muted mx-auto mt-4 max-w-xl text-base">
            Une plateforme unique remplaçant les tableurs, logiciels obsolètes et outils déconnectés.
          </p>
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
            Apprécié par les dirigeants scolaires
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.author} className="widget-card p-6">
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="fill-warning text-warning h-3.5 w-3.5" />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="border-border mt-6 border-t pt-4">
                  <p className="truncate text-sm font-medium">{t.author}</p>
                  <p className="text-muted-foreground truncate text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-foreground text-3xl font-semibold tracking-tight">
            Tarification simple et transparente
          </h2>
          <p className="text-muted mt-4 text-base">Des forfaits adaptés à la taille de votre école.</p>
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
              {plan.highlighted && (
                <div className="bg-primary absolute top-0 right-0 left-0 py-1 text-center text-[10px] font-medium text-white">
                  Le plus populaire
                </div>
              )}
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
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="text-success h-4 w-4 shrink-0" />
                      <span className="truncate">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-8 h-10 w-full"
                  variant={plan.highlighted ? 'default' : 'outline'}
                  asChild
                >
                  <Link href="/login">Commencer</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="bg-background-subtle px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-foreground mb-12 text-center text-3xl font-semibold tracking-tight">
            Questions fréquentes
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
            Prêt à transformer votre école ?
          </h2>
          <p className="text-muted mt-4 text-base">
            Rejoignez des centaines d&apos;écoles privées sur EduManager Pro.
          </p>
          <Button size="lg" className="mt-8 h-11 px-8" asChild>
            <Link href="/login">
              Commencer votre essai gratuit
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
