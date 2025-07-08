# my car

###

- nest new mycar

### module

- nest g moudle users
- nest g module reports
  a

### controller

- nest g controller users
- nest g controller reports

### services

- nest g service users
- nest g service reports

## repository

- npm i @nestjs/typeorm
- npm i typeorm
- npm i sqlite3

### entity 구성

1. user.entity.ts 파일 생성
   - 필드추가
2. user.module.ts 파일에 imports 구성
   - imports: [
     TypeOrmModule.forFeature([
     User
     ])
     ]
3. app.module.ts 파일에서 forRoot 의 entities : 구성
   - entities: [User]

## INTERCEPTOR

**intercept(`context`:ExecutionContext, `next`:CallHandler)**

## COOKIE SESSION

- npm install cookie-session
- npm install @types/cookie-session

## CONFIG

- npm install @nestjs/config
- npm install cross-env

### migration

- "typeorm": "cross-env NODE_ENV=development typeorm-ts-node-esm"

```sh
 ts-node ./node_modules/typeorm/cli.js migration:generate src/migrations/created-user -d src/data-source.ts



   npm run typeorm migration:generate -- -n initial-schema -o
```

## WEB SOCKET'S

```sh
$ npm i --save @nestjs/websockets @nestjs/platform-socket.io
```
