# bun-test

## Architecture
- docker-compose.yml: for running on your laptop
- react-app: React app goes here; external volume, but initialize with Bun from inside Docker container
    - logs: Bun and React logs go here, Bun makes this directory.

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
- https://bun.com/guides/ecosystem/react
- https://blog.stackademic.com/bun-1-0-logging-requests-to-an-output-file-50e54a7393c9
- https://blog.bitsrc.io/react-error-handling-and-logging-best-practices-4444c57cd666