FROM node:lts-alpine
WORKDIR /app
COPY ./dist/apps/profile .
ENV PORT=3334
EXPOSE ${PORT}
RUN npm install --production
CMD node ./main.js
