import { PrismaClient, Role, UserStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // 1. Admin User
    const adminEmail = 'admin@example.com';
    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            password: 'password123', // In a real app, hash this!
            name: 'Super Admin',
            role: Role.ADMIN,
            status: UserStatus.ACTIVE,
        },
    });
    console.log(`Created Admin: ${admin.email}`);

    // 2. Regular User
    const userEmail = 'user@example.com';
    const user = await prisma.user.upsert({
        where: { email: userEmail },
        update: {},
        create: {
            email: userEmail,
            password: 'password123',
            name: 'John Doe',
            role: Role.USER,
            status: UserStatus.ACTIVE,
        },
    });
    console.log(`Created User: ${user.email}`);

    // 3. Pending User
    const pendingEmail = 'pending@example.com';
    const pending = await prisma.user.upsert({
        where: { email: pendingEmail },
        update: {},
        create: {
            email: pendingEmail,
            password: 'password123',
            name: 'Pending User',
            role: Role.USER,
            status: UserStatus.PENDING,
        },
    });
    console.log(`Created Pending User: ${pending.email}`);

    console.log('✅ Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
