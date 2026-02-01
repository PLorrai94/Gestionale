FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build --prod

# Production stage
FROM nginx:alpine

# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

# Copy built Angular app
COPY --from=build /app/dist/ui-angular-app/browser /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
