
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install -g @angular/cli@17
RUN npm ci
COPY . .
RUN ng build

FROM nginx:alpine

# Меняем конфиг nginx-а на собственный
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем собранное приложение из предыдущего этапа в рабочую директорию nginx
COPY --from=build /app/dist/Frontend/browser /usr/share/nginx/html
EXPOSE 4200

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]