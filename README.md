
# Клиентская часть приложения

# Запуск приложения

# Разворачивание с помощью Docker

Для запуска приложения с использованием Docker выполните следующие шаги:

1. Клонируйте репозиторий:
   git clone <https://github.com/Mikhas3009/izi-api-introduction-backend-.git>
2. Соберите и запустите контейнеры
    docker build -t my-angular-dev .
    docker run -p 4200:4200 my-angular-dev
3. Приложение доступно по адресу: http://localhost:4200
