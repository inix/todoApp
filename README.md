# 介绍

一个NestJS实现的Todo应用后端。
技术栈：
* NestJS
* TypeORM
* PostgreSQL
* Swagger

# 演示

本人已经在VPS上搭建了应用，用于临时演示，地址：http://dochat.site:13000/api/。

# 运行应用
## 1. 安装PostgreSQL数据库
### （1）直接安装

参考官方安装教程: https://www.postgresql.org/download/

### （2）Docker运行数据库

```bash
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres:15.3-alpine3.18
```

## 2. 运行应用
### （1）解压应用代码

```bash
tar -zxvf todo-1.5.0.tar.gz
cd todo-1.5.0
```

### （2）配置应用环境变量
```bash
cp .env.example .env
```

在PostgreSQL里创建一个名为tododb的数据库，然后修改.env里的信息为正确信息（一般只需要修改数据库密码）。

### （3）安装依赖和初始化数据库

Node.js建议用v14 LTS，本项目用 14.21.3；多版本管理推荐asdf或者nvm。

```bash
# 依赖
npm install

# 生成
npm run typeorm:generate mig

# 运行
npm run typeorm:run
```

### （4）运行应用
```bash
# 开发
npm run start

# 观察模式
npm run start:dev

# 生产
npm run start:prod
```

# Docker运行应用
## 构建镜像并运行

```bash
docker-compose build
docker-compose up
docker-compose down
```

## 初始化数据库

```bash
docker-compose run nestjs npm run typeorm:generate mig

# run migration
docker-compose run nestjs npm run typeorm:run
```
