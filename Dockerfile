# Josephine app
# version 1.0.0
FROM node:12-alpine
WORKDIR /usr/src
COPY ["server-package.json", "./package.json"]
COPY ["server-package-lock.json", "./package-lock.json"]
COPY ["index.js", "."]
COPY ["./build", "./build"]
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
