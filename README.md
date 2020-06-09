# Fullstack GraphQL Application

[Live demo](https://graphql-demo.dqntio.now.sh/)

## Features

- CRUD GraphQL API server:
  - apollo-server + mongoose
  - CD to [Heroku](https://heroku.com)
- Client application:
  - Next.js, material-ui, apollo libraries
  - CD to [Vercel](https://vercel.com/)
- Code quality control:
  - linting on commit
- Developer experience:
  - types generation from GraphQL schema
  - automatic server rebuild and restart

## Requirements

- Node.js
- Yarn

## Environment variables

Client and server are using environment variables to connect to API and database.
For local development or launch these variables can be provided by `packages/client/.env` file for the client and by `packages/server/.env` file for the server.

## Client

Requires `NEXT_PUBLIC_GRAPHQL_URI` environment variable.

Start development server:
```sh
yarn dev:client
```

## Server

Requires `MONGODB_URI` environment variable.

Start development server:
```sh
yarn dev:server
```
