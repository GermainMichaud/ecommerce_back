export default {
  port: process.env.PORT || 4000,
  database: process.env.DATABASE_URL || '',
  emailFrom: process.env.EMAIL_FROM || 'test@test.com',
};
