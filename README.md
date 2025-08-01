# bun-test

## Architecture
- docker-compose.yml: for running on your laptop
- app: All app and server code goes here; external volume, but initialize with Bun from inside Docker container
    - chatbot: Nepal Coding chatbot UI in plain javascript
    - index.ts: Bun server file
- logs: Bun logs go here, external volume exposed inside Docker container


You must add the following:
- .env.development: dev environment vars; external file exposed inside Docker container
```
API_KEY=""
API_URL="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="
```

## Dev

### Set up

Run `docker compose up -d`. Shell into the container, cd into /app and run `bun init --react`.

### Run on your laptop

Run `docker compose up -d`. Shell into the container, cd into react-app and run `bun dev`. It should be served now at http://localhost:3000.

### Run on a dev server


## Production

Not sure about logging yet

## Resources
- https://bun.sh
- https://blog.stackademic.com/bun-1-0-logging-requests-to-an-output-file-50e54a7393c9
