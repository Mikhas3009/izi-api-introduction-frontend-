FROM node:22-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь исходный код
COPY . .

# Открываем порт 4200 (стандартный порт ng serve)
EXPOSE 4200

# Запускаем Angular в режиме разработки
CMD ["npm", "start"]