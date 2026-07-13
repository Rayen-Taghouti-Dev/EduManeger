const { createRequire } = require('module');
const path = require('path');

const requireFromApi = createRequire(path.join(__dirname, '../../apps/api/package.json'));
const bcrypt = requireFromApi('bcrypt');
const { PrismaClient, SchoolPlan, SchoolStatus, UserStatus } = requireFromApi('@prisma/client');

const prisma = new PrismaClient();

async function ensureRole({ schoolId, slug, name, description, isSystem, permissions }) {
  const existing = await prisma.role.findFirst({
    where: {
      schoolId: schoolId ?? null,
      slug,
      deletedAt: null,
    },
  });

  if (existing) {
    return prisma.role.update({
      where: { id: existing.id },
      data: {
        name,
        description,
        isSystem,
        permissions,
      },
    });
  }

  return prisma.role.create({
    data: {
      schoolId: schoolId ?? null,
      slug,
      name,
      description,
      isSystem,
      permissions,
    },
  });
}

async function ensureUserRole(userId, roleId, schoolId) {
  const existing = await prisma.userRole.findFirst({
    where: { userId, roleId, schoolId },
  });

  if (existing) {
    return existing;
  }

  return prisma.userRole.create({
    data: { userId, roleId, schoolId },
  });
}

async function main() {
  const seedPassword = process.env.AUTH_SEED_PASSWORD || 'ChangeMe123!';
  const passwordHash = await bcrypt.hash(seedPassword, 12);

  const school = await prisma.school.upsert({
    where: { slug: 'greenwood-academie' },
    update: {
      name: 'Académie Greenwood',
      status: SchoolStatus.ACTIVE,
      plan: SchoolPlan.ENTERPRISE,
    },
    create: {
      name: 'Académie Greenwood',
      slug: 'greenwood-academie',
      email: 'contact@greenwood.edu',
      city: 'Tunis',
      country: 'TN',
      timezone: 'Africa/Tunis',
      status: SchoolStatus.ACTIVE,
      plan: SchoolPlan.ENTERPRISE,
    },
  });

  const roleDefinitions = [
    {
      schoolId: null,
      slug: 'SUPER_ADMIN',
      name: 'Super administrateur',
      description: 'Accès plateforme complet',
      isSystem: true,
      permissions: ['*'],
    },
    {
      schoolId: school.id,
      slug: 'SCHOOL_ADMIN',
      name: 'Administrateur établissement',
      description: 'Administration complète de l’établissement',
      isSystem: false,
      permissions: ['school:*'],
    },
    {
      schoolId: school.id,
      slug: 'TEACHER',
      name: 'Enseignant',
      description: 'Accès pédagogique',
      isSystem: false,
      permissions: ['grades:read', 'grades:write', 'attendance:write'],
    },
    {
      schoolId: school.id,
      slug: 'ACCOUNTANT',
      name: 'Comptable',
      description: 'Accès finance et paiements',
      isSystem: false,
      permissions: ['finance:*'],
    },
    {
      schoolId: school.id,
      slug: 'PARENT',
      name: 'Parent',
      description: 'Accès parent',
      isSystem: false,
      permissions: ['student:read:self'],
    },
    {
      schoolId: school.id,
      slug: 'STUDENT',
      name: 'Élève',
      description: 'Accès élève',
      isSystem: false,
      permissions: ['grades:read:self'],
    },
  ];

  const roles = {};
  for (const roleDefinition of roleDefinitions) {
    roles[roleDefinition.slug] = await ensureRole(roleDefinition);
  }

  const superAdmin = await prisma.user.upsert({
    where: { email: 'superadmin@edumanager.pro' },
    update: {
      firstName: 'Super',
      lastName: 'Admin',
      passwordHash,
      status: UserStatus.ACTIVE,
    },
    create: {
      email: 'superadmin@edumanager.pro',
      firstName: 'Super',
      lastName: 'Admin',
      passwordHash,
      status: UserStatus.ACTIVE,
    },
  });

  const schoolAdmin = await prisma.user.upsert({
    where: { email: 'admin@greenwood.edu' },
    update: {
      firstName: 'Alex',
      lastName: 'Morgan',
      passwordHash,
      status: UserStatus.ACTIVE,
    },
    create: {
      email: 'admin@greenwood.edu',
      firstName: 'Alex',
      lastName: 'Morgan',
      passwordHash,
      status: UserStatus.ACTIVE,
    },
  });

  await ensureUserRole(superAdmin.id, roles.SUPER_ADMIN.id, school.id);
  await ensureUserRole(schoolAdmin.id, roles.SCHOOL_ADMIN.id, school.id);

  console.log('Auth seed completed.');
  console.log(`School: ${school.name}`);
  console.log('Users:');
  console.log('  superadmin@edumanager.pro / ' + seedPassword);
  console.log('  admin@greenwood.edu / ' + seedPassword);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
