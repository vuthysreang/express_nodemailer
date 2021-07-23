# NodeMailer Express Sequelize Docker Postgres

Backend API for Nodemailer-express project.

### Built With

- [Node.js v14 or Latest](https://nodejs.org/)
- [Sequelize v6](https://sequelize.org/)
- [PostgreSQL v13](https://www.postgresql.org/)

### Project Structure

```
.

[Project root directory]
├── bin
│   └── www ----------------------- (generate by express)
├── common ------------------------ (define our general logic)
├── config
│   └── config.js ----------------- (generate by sequelize)
├── controllers ------------------- (define our app logic here)
├── database
│   ├── migrations ---------------- (generate by sequelize)
│   ├── models -------------------- (generate by sequelize)
│   └── seeders ------------------- (generate by sequelize)
├── public ------------------------ (static files)
├── routes ------------------------ (define our routers)
├── scripts
│   └── start.sh ------------------ (define our entrypoint script)
├── views ------------------------- (view templates)
├── .dockerignore ----------------- (ignore copy local files to image)
├── .gitignore
├── .sequelizerc ------------------ (define sequelize structure)
├── app.js ------------------------ (core components)
├── docker-compose_dev.yml ------------ (use to start docker services)
├── Dockerfile -------------------- (use to build docker image)
└── package.json
```

## Getting Started

**To get a local copy up and running follow these simple steps.**

- Install all dependencies using NPM

  > npm install

- Run Docker

  > docker-compose -f docker-compose_DEV.yml up -d

- Run project using NPM

  > npm run dev

- Terminate Docker
  > docker-compose -f docker-compose_DEV.yml down -v

### Prerequisites

- [Docker & Docker Compose](https://docs.docker.com/)
- [Node.js installed (for development only)](https://nodejs.org/)
