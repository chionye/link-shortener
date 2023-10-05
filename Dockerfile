FROM node:lts-alpine
ENV NODE_ENV=production
ENV PORT 7000
ENV URL http://localhost:
ENV FINGERPRINT=my-custom-fingerprint
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 7000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]