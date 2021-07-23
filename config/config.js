require('dotenv').config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USERNAME || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'nodemailer-express_db',
    host: process.env.POSTGRES_HOSTNAME || 'localhost',
    dialect: 'postgres',
    seederStorage: 'sequelize'
  },
  test: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOSTNAME,
    dialect: 'postgres',
    seederStorage: 'sequelize'
  },
  production: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOSTNAME,
    dialect: 'postgres',
    seederStorage: 'sequelize'
  },
  jwtConfig: {
    tokenSecret: process.env.JWT_TOKEN_SECRET || 'Test_dev_kit_$3cReT_token',
    tokenExpire: process.env.JWT_TOKEN_EXPIRED || '1d',
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET || 'Test_dev_kit_$3cReT_refresh',
    refreshTokenExpire: process.env.JWT_REFRESH_EXPIRED || '7d'
  },
  mailConfig: {
    appEmail: process.env.APP_EMAIL || 'sreangvuthy18@gmail.com',
    appEmailPass: process.env.APP_EMAIL_PASS || 'gmailpassword',
    appEmailTokenSecret: process.env.APP_EMAIL_TOKEN_SECRET || 'Test_dev_kit_$3cReT_email',
    appResetPasswordTokenSecret: process.env.APP_RESET_PASSWORD_TOKEN_SECRET || 'Test_dev_kit_$6Test_reset_password',
  }

}