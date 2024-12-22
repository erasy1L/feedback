<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Feedback Management Service

<div align="center">
 <div>
   <a href="https://github.com/nestjs/nest">
     <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
   </a>
   <a href="https://github.com/microsoft/TypeScript">
     <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
   </a>
   <a href="https://github.com/postgres/postgres">
     <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
   </a>
 </div>
 <div>
   <a href="https://github.com/docker">
     <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
   </a>
   <a href="https://github.com/typeorm/typeorm">
     <img src="https://img.shields.io/badge/TypeORM-FE0902?style=for-the-badge&logo=typeorm&logoColor=white" alt="TypeORM" />
   </a>
   <a href="https://github.com/swagger-api/swagger-ui">
     <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black" alt="Swagger" />
   </a>
 </div>
</div>

## Description

Feedback management service API written using [NestJS](https://github.com/nestjs/nest) framework with [TypeORM](https://github.com/typeorm/typeorm). Authentication is done with simple JWT access token.

Deployed version is at https://feedback-production-7b76.up.railway.app/docs

## Table of Contents

- [Project setup](<#project-setup>)
	- [With docker compose](<#with-docker-compose>)
  - [Locally](#locally)
- [Using](#using)
- [Migrations (optional)](<#migrations-optional>)

## Project setup

Swagger docs will be available at http://localhost:3000/docs

**Create a new .env file and paste the contents from the [.env.example](.env.example) file into it**

### With docker compose:

-	```bash
	$ docker compose up -d
	```

Visit http://localhost:3000/docs

---

### Locally:
-	```bash
	$ npm install
	```

- **Start postgres db service with ```$ docker compose up -d db```**

- **Change -> DATABASE_HOST=localhost in [.env](.env)**

-	```bash
	# development
	$ npm run start

	# watch mode
	$ npm run start:dev

	# production mode
	$ npm run start:prod
	```

Visit http://localhost:3000/docs

## Migrations (optional)

Migrations can be managed with these npm scripts:

```bash
# npm run typeorm:up
"typeorm:up": "npm run typeorm migration:run -- -d ./src/config/typeorm.ts", 
# npm run typeorm:down
"typeorm:down": "npm run typeorm -- -d ./src/config/typeorm.ts migration:revert", 
# npm run typeorm:generate --name=Schema - Generates migration files automatically by importing entities in ./src/config/typeorm.ts
"typeorm:generate": "cross-env npm run typeorm -- -d ./src/config/typeorm.ts migration:generate ./migrations/${npm_config_name}", 
# npm run typeorm:create --name=Schema
"typeorm:create": "cross-env npm run typeorm -- migration:create ./migrations/${npm_config_name}"
```

After creating or generating migrations using either typeorm:generate or typeorm:create 
you need to add them in migrations array: 
```ts
// ./src/config/typeorm.ts

export default new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [Category, Status, User, Post, Upvote], // add entities here if you want to generate migrations with typeorm:generate
  migrations: [
    CategorySchema1734799849268,
    StatusSchema1734799895350,
    UserSchema1734798791233,
    PostsSchema1734799961379,
    UpvoteSchema1734800485138,
  ],
});
```

## Using

Get the access token from either **/auth/sign-in** or **/auth/sign-up** endpoints and paste into authorize modal

![swagger auth](<./images/Screenshot Swagger UI.png>)

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).
