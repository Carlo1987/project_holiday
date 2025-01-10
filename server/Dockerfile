FROM node:20.5.0-alpine3.18
RUN addgroup nodeapp && adduser -S -G nodeapp nodeapp
USER nodeapp
WORKDIR /app/
COPY --chown=nodeapp package*.json .
RUN npm install 
COPY --chown=nodeapp . .
RUN mkdir -p /app/uploads/homes/images
EXPOSE 3700
CMD ["npm","start"]



