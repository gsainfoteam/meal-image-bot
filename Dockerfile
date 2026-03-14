FROM oven/bun:latest

WORKDIR /app

ADD package.json bun.lock ./

RUN bun install

ADD index.ts ./

CMD ["bun", "run", "index.ts"]
