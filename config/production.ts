export default {
  port: 4000,
  database: process.env.DATABASE_URL || 'mongodb://localhost:27017/api',
  emailFrom: process.env.EMAIL_FROM || 'test@test.com',
};
