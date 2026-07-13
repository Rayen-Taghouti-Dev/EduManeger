export const kpiData = [
  {
    title: 'Total élèves',
    value: '1 245',
    change: '+12,5 %',
    trend: 'up' as const,
    period: 'vs mois dernier',
    icon: 'students' as const,
    accent: 'primary' as const,
  },
  {
    title: 'Enseignants actifs',
    value: '85',
    change: '+3,2 %',
    trend: 'up' as const,
    period: 'vs mois dernier',
    icon: 'teachers' as const,
    accent: 'secondary' as const,
  },
  {
    title: 'Classes',
    value: '42',
    change: '+2',
    trend: 'up' as const,
    period: 'nouveau ce trimestre',
    icon: 'classes' as const,
    accent: 'success' as const,
  },
  {
    title: 'Taux de présence',
    value: '97 %',
    change: '+1,8 %',
    trend: 'up' as const,
    period: 'vs semaine dernière',
    icon: 'attendance' as const,
    accent: 'warning' as const,
  },
];

export const enrollmentData = [
  { month: 'Sep', students: 1080, newEnrollments: 45 },
  { month: 'Oct', students: 1105, newEnrollments: 38 },
  { month: 'Nov', students: 1120, newEnrollments: 28 },
  { month: 'Déc', students: 1135, newEnrollments: 22 },
  { month: 'Jan', students: 1180, newEnrollments: 52 },
  { month: 'Fév', students: 1210, newEnrollments: 35 },
  { month: 'Mar', students: 1245, newEnrollments: 42 },
];

export const revenueData = [
  { month: 'Sep', revenue: 185000, expenses: 142000 },
  { month: 'Oct', revenue: 192000, expenses: 145000 },
  { month: 'Nov', revenue: 188000, expenses: 148000 },
  { month: 'Déc', revenue: 210000, expenses: 152000 },
  { month: 'Jan', revenue: 225000, expenses: 155000 },
  { month: 'Fév', revenue: 218000, expenses: 158000 },
  { month: 'Mar', revenue: 235000, expenses: 160000 },
];

export const attendanceData = [
  { day: 'Lun', present: 1180, absent: 65 },
  { day: 'Mar', present: 1195, absent: 50 },
  { day: 'Mer', present: 1205, absent: 40 },
  { day: 'Jeu', present: 1190, absent: 55 },
  { day: 'Ven', present: 1210, absent: 35 },
];

export const performanceData = [
  { subject: 'Mathématiques', score: 88 },
  { subject: 'Sciences', score: 92 },
  { subject: 'Anglais', score: 85 },
  { subject: 'Histoire', score: 79 },
  { subject: 'Arts', score: 94 },
  { subject: 'EPS', score: 91 },
];

export const activityFeed = [
  {
    id: '1',
    type: 'enrollment' as const,
    title: 'Nouvel élève inscrit',
    description: 'Emma Richardson a rejoint la 10e-A',
    user: 'Sarah Chen',
    initials: 'SC',
    time: 'il y a 2 min',
    status: 'success' as const,
  },
  {
    id: '2',
    type: 'grade' as const,
    title: 'Notes soumises',
    description: 'Résultats de mi-trimestre en mathématiques pour la 11e',
    user: 'James Wilson',
    initials: 'JW',
    time: 'il y a 15 min',
    status: 'info' as const,
  },
  {
    id: '3',
    type: 'payment' as const,
    title: 'Paiement reçu',
    description: '2 450 $ de frais de scolarité de la famille Martinez',
    user: 'Équipe finance',
    initials: 'EF',
    time: 'il y a 1 h',
    status: 'success' as const,
  },
  {
    id: '4',
    type: 'teacher' as const,
    title: 'Nouvel enseignant ajouté',
    description: 'Dr Lisa Park a rejoint le département des sciences',
    user: 'Admin RH',
    initials: 'AR',
    time: 'il y a 3 h',
    status: 'info' as const,
  },
  {
    id: '5',
    type: 'attendance' as const,
    title: 'Alerte de présence',
    description: 'La 8e-B est en dessous du seuil de 90 % aujourd\'hui',
    user: 'Système',
    initials: 'SY',
    time: 'il y a 5 h',
    status: 'warning' as const,
  },
];

export const notifications = [
  {
    id: '1',
    title: 'Rappel de paiement',
    description: '12 familles ont des frais de scolarité en retard',
    time: 'il y a 10 min',
    unread: true,
  },
  {
    id: '2',
    title: 'Rapport disponible',
    description: 'Le rapport de performance académique du T1 est disponible',
    time: 'il y a 1 h',
    unread: true,
  },
  {
    id: '3',
    title: 'Mise à jour du planning',
    description: 'Salle 204 indisponible demain de 14h à 16h',
    time: 'il y a 3 h',
    unread: false,
  },
];

export const upcomingEvents = [
  {
    id: '1',
    title: 'Rencontres parents-enseignants',
    date: '28 Mar',
    time: '9h00',
    type: 'meeting' as const,
    location: 'Grande salle',
  },
  {
    id: '2',
    title: 'Foire aux sciences de printemps',
    date: '3 Avr',
    time: '14h00',
    type: 'event' as const,
    location: 'Gymnase',
  },
  {
    id: '3',
    title: 'Journée de formation du personnel',
    date: '10 Avr',
    time: 'Toute la journée',
    type: 'admin' as const,
    location: 'Campus entier',
  },
  {
    id: '4',
    title: 'Planification de la remise des diplômes',
    date: '15 Avr',
    time: '11h00',
    type: 'meeting' as const,
    location: 'Salle de conférence B',
  },
];

export const schoolOverview = {
  name: 'Académie Greenwood',
  term: 'Trimestre de printemps 2026',
  status: 'active' as const,
  statusLabel: 'Tous les systèmes opérationnels',
  studentsEnrolled: 1245,
  capacity: 1400,
  daysRemaining: 42,
};
