# Start from a base image with Node.js
FROM node:20-alpine

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      npm \
      yarn

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    PUPPETEER_CACHE_DIR=/home/web/.cache

RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
    && mkdir -p /logs \
    && chown -R pptruser:pptruser /logs \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

USER pptruser

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY yarn.lock .

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

RUN yarn build

# Expose the port that your Express app is running on
EXPOSE 3000

# Command to run your application
CMD ["yarn", "start"]
