FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build --prod

# Etapa di produzione
FROM nginx:alpine
COPY --from=build /app/dist/ui-angular-app /usr/share/nginx/html

# Espone la porta 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]