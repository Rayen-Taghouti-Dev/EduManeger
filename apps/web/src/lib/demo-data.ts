export const kpiMeta = [
  {
    id: 'students',
    value: '1 245',
    change: '+12.5%',
    trend: 'up' as const,
    icon: 'students' as const,
    accent: 'primary' as const,
    titleKey: 'dashboard.kpiStudents' as const,
    periodKey: 'dashboard.vsLastMonth' as const,
  },
  {
    id: 'teachers',
    value: '85',
    change: '+3.2%',
    trend: 'up' as const,
    icon: 'teachers' as const,
    accent: 'secondary' as const,
    titleKey: 'dashboard.kpiTeachers' as const,
    periodKey: 'dashboard.vsLastMonth' as const,
  },
  {
    id: 'classes',
    value: '42',
    change: '+2',
    trend: 'up' as const,
    icon: 'classes' as const,
    accent: 'success' as const,
    titleKey: 'dashboard.kpiClasses' as const,
    periodKey: 'dashboard.newThisTerm' as const,
  },
  {
    id: 'attendance',
    value: '97%',
    change: '+1.8%',
    trend: 'up' as const,
    icon: 'attendance' as const,
    accent: 'warning' as const,
    titleKey: 'dashboard.kpiAttendance' as const,
    periodKey: 'dashboard.vsLastWeek' as const,
  },
];

export const enrollmentSeries = [
  { monthKey: 'dashboard.monthSep' as const, students: 1080, newEnrollments: 45 },
  { monthKey: 'dashboard.monthOct' as const, students: 1105, newEnrollments: 38 },
  { monthKey: 'dashboard.monthNov' as const, students: 1120, newEnrollments: 28 },
  { monthKey: 'dashboard.monthDec' as const, students: 1135, newEnrollments: 22 },
  { monthKey: 'dashboard.monthJan' as const, students: 1180, newEnrollments: 52 },
  { monthKey: 'dashboard.monthFeb' as const, students: 1210, newEnrollments: 35 },
  { monthKey: 'dashboard.monthMar' as const, students: 1245, newEnrollments: 42 },
];

export const revenueSeries = [
  { monthKey: 'dashboard.monthSep' as const, revenue: 185000, expenses: 142000 },
  { monthKey: 'dashboard.monthOct' as const, revenue: 192000, expenses: 145000 },
  { monthKey: 'dashboard.monthNov' as const, revenue: 188000, expenses: 148000 },
  { monthKey: 'dashboard.monthDec' as const, revenue: 210000, expenses: 152000 },
  { monthKey: 'dashboard.monthJan' as const, revenue: 225000, expenses: 155000 },
  { monthKey: 'dashboard.monthFeb' as const, revenue: 218000, expenses: 158000 },
  { monthKey: 'dashboard.monthMar' as const, revenue: 235000, expenses: 160000 },
];

export const attendanceSeries = [
  { dayKey: 'dashboard.dayMon' as const, present: 1180, absent: 65 },
  { dayKey: 'dashboard.dayTue' as const, present: 1195, absent: 50 },
  { dayKey: 'dashboard.dayWed' as const, present: 1205, absent: 40 },
  { dayKey: 'dashboard.dayThu' as const, present: 1190, absent: 55 },
  { dayKey: 'dashboard.dayFri' as const, present: 1210, absent: 35 },
];

export const performanceSeries = [
  { subjectKey: 'dashboard.subjectMath' as const, score: 88 },
  { subjectKey: 'dashboard.subjectScience' as const, score: 92 },
  { subjectKey: 'dashboard.subjectEnglish' as const, score: 85 },
  { subjectKey: 'dashboard.subjectHistory' as const, score: 79 },
  { subjectKey: 'dashboard.subjectArts' as const, score: 94 },
  { subjectKey: 'dashboard.subjectPe' as const, score: 91 },
];

export const activityMeta = [
  {
    id: '1',
    type: 'enrollment' as const,
    status: 'success' as const,
    initials: 'SC',
    titleKey: 'dashboard.activity1Title' as const,
    descKey: 'dashboard.activity1Desc' as const,
    userKey: 'dashboard.activity1User' as const,
    timeKey: 'dashboard.activity1Time' as const,
  },
  {
    id: '2',
    type: 'grade' as const,
    status: 'info' as const,
    initials: 'JW',
    titleKey: 'dashboard.activity2Title' as const,
    descKey: 'dashboard.activity2Desc' as const,
    userKey: 'dashboard.activity2User' as const,
    timeKey: 'dashboard.activity2Time' as const,
  },
  {
    id: '3',
    type: 'payment' as const,
    status: 'success' as const,
    initials: 'EF',
    titleKey: 'dashboard.activity3Title' as const,
    descKey: 'dashboard.activity3Desc' as const,
    userKey: 'dashboard.activity3User' as const,
    timeKey: 'dashboard.activity3Time' as const,
  },
  {
    id: '4',
    type: 'teacher' as const,
    status: 'info' as const,
    initials: 'AR',
    titleKey: 'dashboard.activity4Title' as const,
    descKey: 'dashboard.activity4Desc' as const,
    userKey: 'dashboard.activity4User' as const,
    timeKey: 'dashboard.activity4Time' as const,
  },
  {
    id: '5',
    type: 'attendance' as const,
    status: 'warning' as const,
    initials: 'SY',
    titleKey: 'dashboard.activity5Title' as const,
    descKey: 'dashboard.activity5Desc' as const,
    userKey: 'dashboard.activity5User' as const,
    timeKey: 'dashboard.activity5Time' as const,
  },
];

export const notificationMeta = [
  {
    id: '1',
    unread: true,
    titleKey: 'dashboard.notif1Title' as const,
    descKey: 'dashboard.notif1Desc' as const,
    timeKey: 'dashboard.notif1Time' as const,
  },
  {
    id: '2',
    unread: true,
    titleKey: 'dashboard.notif2Title' as const,
    descKey: 'dashboard.notif2Desc' as const,
    timeKey: 'dashboard.notif2Time' as const,
  },
  {
    id: '3',
    unread: false,
    titleKey: 'dashboard.notif3Title' as const,
    descKey: 'dashboard.notif3Desc' as const,
    timeKey: 'dashboard.notif3Time' as const,
  },
];

export const eventMeta = [
  {
    id: '1',
    type: 'meeting' as const,
    titleKey: 'dashboard.event1Title' as const,
    dateKey: 'dashboard.event1Date' as const,
    timeKey: 'dashboard.event1Time' as const,
    locationKey: 'dashboard.event1Location' as const,
  },
  {
    id: '2',
    type: 'event' as const,
    titleKey: 'dashboard.event2Title' as const,
    dateKey: 'dashboard.event2Date' as const,
    timeKey: 'dashboard.event2Time' as const,
    locationKey: 'dashboard.event2Location' as const,
  },
  {
    id: '3',
    type: 'admin' as const,
    titleKey: 'dashboard.event3Title' as const,
    dateKey: 'dashboard.event3Date' as const,
    timeKey: 'dashboard.event3Time' as const,
    locationKey: 'dashboard.event3Location' as const,
  },
  {
    id: '4',
    type: 'meeting' as const,
    titleKey: 'dashboard.event4Title' as const,
    dateKey: 'dashboard.event4Date' as const,
    timeKey: 'dashboard.event4Time' as const,
    locationKey: 'dashboard.event4Location' as const,
  },
];

export const schoolOverview = {
  name: 'Académie Greenwood',
  status: 'active' as const,
  studentsEnrolled: 1245,
  capacity: 1400,
  daysRemaining: 42,
};

/** @deprecated Use keyed series above */
export const kpiData = kpiMeta;
export const enrollmentData = enrollmentSeries;
export const revenueData = revenueSeries;
export const attendanceData = attendanceSeries;
export const performanceData = performanceSeries;
export const activityFeed = activityMeta;
export const notifications = notificationMeta;
export const upcomingEvents = eventMeta;
