const { createRequire } = require('module');
const path = require('path');

const requireFromApi = createRequire(path.join(__dirname, '../../apps/api/package.json'));
const {
  PrismaClient,
  Gender,
  ParentRelationship,
  StudentStatus,
} = requireFromApi('@prisma/client');

const prisma = new PrismaClient();

async function ensureParent(schoolId, parentData) {
  const existing = await prisma.parent.findFirst({
    where: {
      schoolId,
      email: parentData.email,
      deletedAt: null,
    },
  });

  if (existing) {
    return existing;
  }

  return prisma.parent.create({
    data: {
      schoolId,
      firstName: parentData.firstName,
      lastName: parentData.lastName,
      email: parentData.email,
      phone: parentData.phone,
    },
  });
}

async function main() {
  const school = await prisma.school.findFirst({
    where: { slug: 'greenwood-academie', deletedAt: null },
  });

  if (!school) {
    throw new Error('Greenwood school not found. Run pnpm db:seed:auth first.');
  }

  const adminUser = await prisma.user.findFirst({
    where: { email: 'admin@greenwood.edu', deletedAt: null },
  });

  const classrooms = await Promise.all([
    prisma.classroom.upsert({
      where: {
        schoolId_name_academicYear: {
          schoolId: school.id,
          name: '6ème A',
          academicYear: '2025-2026',
        },
      },
      update: {},
      create: {
        schoolId: school.id,
        name: '6ème A',
        gradeLevel: '6ème',
        section: 'A',
        academicYear: '2025-2026',
        roomNumber: 'B12',
        capacity: 30,
      },
    }),
    prisma.classroom.upsert({
      where: {
        schoolId_name_academicYear: {
          schoolId: school.id,
          name: '5ème B',
          academicYear: '2025-2026',
        },
      },
      update: {},
      create: {
        schoolId: school.id,
        name: '5ème B',
        gradeLevel: '5ème',
        section: 'B',
        academicYear: '2025-2026',
        roomNumber: 'C04',
        capacity: 28,
      },
    }),
    prisma.classroom.upsert({
      where: {
        schoolId_name_academicYear: {
          schoolId: school.id,
          name: '4ème A',
          academicYear: '2025-2026',
        },
      },
      update: {},
      create: {
        schoolId: school.id,
        name: '4ème A',
        gradeLevel: '4ème',
        section: 'A',
        academicYear: '2025-2026',
        roomNumber: 'A08',
        capacity: 32,
      },
    }),
  ]);

  const studentsSeed = [
    {
      studentNumber: 'GW-2026-001',
      firstName: 'Amira',
      lastName: 'Ben Salah',
      gender: Gender.FEMALE,
      email: 'amira.bensalah@student.greenwood.edu',
      phone: '+216 20 111 001',
      dateOfBirth: new Date('2012-03-14'),
      enrollmentDate: new Date('2025-09-01'),
      status: StudentStatus.ACTIVE,
      classroomId: classrooms[0].id,
      parent: {
        firstName: 'Karim',
        lastName: 'Ben Salah',
        email: 'karim.bensalah@email.tn',
        phone: '+216 98 111 001',
        relationship: ParentRelationship.FATHER,
      },
    },
    {
      studentNumber: 'GW-2026-002',
      firstName: 'Youssef',
      lastName: 'Mansouri',
      gender: Gender.MALE,
      email: 'youssef.mansouri@student.greenwood.edu',
      phone: '+216 20 111 002',
      dateOfBirth: new Date('2011-07-22'),
      enrollmentDate: new Date('2025-09-01'),
      status: StudentStatus.ACTIVE,
      classroomId: classrooms[1].id,
      parent: {
        firstName: 'Leila',
        lastName: 'Mansouri',
        email: 'leila.mansouri@email.tn',
        phone: '+216 98 111 002',
        relationship: ParentRelationship.MOTHER,
      },
    },
    {
      studentNumber: 'GW-2026-003',
      firstName: 'Sarra',
      lastName: 'Trabelsi',
      gender: Gender.FEMALE,
      email: 'sarra.trabelsi@student.greenwood.edu',
      phone: '+216 20 111 003',
      dateOfBirth: new Date('2010-11-05'),
      enrollmentDate: new Date('2024-09-01'),
      status: StudentStatus.ACTIVE,
      classroomId: classrooms[2].id,
      parent: {
        firstName: 'Hichem',
        lastName: 'Trabelsi',
        email: 'hichem.trabelsi@email.tn',
        phone: '+216 98 111 003',
        relationship: ParentRelationship.FATHER,
      },
    },
    {
      studentNumber: 'GW-2026-004',
      firstName: 'Omar',
      lastName: 'Gharbi',
      gender: Gender.MALE,
      email: null,
      phone: '+216 20 111 004',
      dateOfBirth: new Date('2012-01-18'),
      enrollmentDate: new Date('2025-09-01'),
      status: StudentStatus.INACTIVE,
      classroomId: classrooms[0].id,
      parent: {
        firstName: 'Nadia',
        lastName: 'Gharbi',
        email: 'nadia.gharbi@email.tn',
        phone: '+216 98 111 004',
        relationship: ParentRelationship.MOTHER,
      },
    },
    {
      studentNumber: 'GW-2025-099',
      firstName: 'Rania',
      lastName: 'Jebali',
      gender: Gender.FEMALE,
      email: 'rania.jebali@student.greenwood.edu',
      phone: null,
      dateOfBirth: new Date('2009-05-30'),
      enrollmentDate: new Date('2021-09-01'),
      status: StudentStatus.GRADUATED,
      classroomId: null,
      parent: {
        firstName: 'Sami',
        lastName: 'Jebali',
        email: 'sami.jebali@email.tn',
        phone: '+216 98 111 005',
        relationship: ParentRelationship.GUARDIAN,
      },
    },
  ];

  for (const seed of studentsSeed) {
    const existing = await prisma.student.findFirst({
      where: {
        schoolId: school.id,
        studentNumber: seed.studentNumber,
        deletedAt: null,
      },
    });

    if (existing) {
      continue;
    }

    const parent = await ensureParent(school.id, seed.parent);

    const student = await prisma.student.create({
      data: {
        schoolId: school.id,
        classroomId: seed.classroomId,
        studentNumber: seed.studentNumber,
        firstName: seed.firstName,
        lastName: seed.lastName,
        gender: seed.gender,
        email: seed.email,
        phone: seed.phone,
        dateOfBirth: seed.dateOfBirth,
        enrollmentDate: seed.enrollmentDate,
        status: seed.status,
        createdById: adminUser?.id ?? null,
        updatedById: adminUser?.id ?? null,
      },
    });

    await prisma.studentParent.create({
      data: {
        studentId: student.id,
        parentId: parent.id,
        relationship: seed.parent.relationship,
        isPrimary: true,
      },
    });
  }

  console.log(`Seeded students for ${school.name}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
