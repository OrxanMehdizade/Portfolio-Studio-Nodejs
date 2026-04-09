const adminRepo = require('../../repositories/adminRepository');
const { hashPassword } = require('./hashPassword');

const seedAdminUser = async () => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if(!adminEmail || !adminPassword) {
        console.log('⚠️ ADMIN_EMAIL and ADMIN_PASSWORD are not set. Skipping seed.');
        return;
    }

    const adminExists = await adminRepo.existsByEmail(adminEmail);

    if (!adminExists) {
        const hashedPwd = await hashPassword(adminPassword);

        await adminRepo.createAdmin({
            name:'Admin User',
            email: adminEmail,
            password: hashedPwd,
            role:'admin'
        });

        console.log('✅ Admin user created');
    } else {
        console.log('ℹ️ Admin user already exists');
    }
};

module.exports = seedAdminUser;