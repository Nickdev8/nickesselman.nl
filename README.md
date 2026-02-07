# nickesselman.nl

## Local dev

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run start
```

## Docker

Build and run with Docker Compose:

```sh
docker compose up --build
```

The app will be available at `http://localhost:3000`.

Environment variables are loaded from `.env` through `docker-compose.yml`.
For production, make sure `ORIGIN` matches your public URL (for example `https://nickesselman.nl`).
