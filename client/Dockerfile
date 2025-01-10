FROM node:20.5.0-alpine3.18
RUN addgroup angularapp && adduser -S -G angularapp angularapp
USER angularapp
WORKDIR /app/
COPY --chown=angularapp package*.json .
RUN npm install 
COPY --chown=angularapp . .
EXPOSE 4200
CMD ["npm","start"]