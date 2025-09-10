
# Клиентская часть приложения
[Серверная часть](https://github.com/Mikhas3009/izi-api-introduction-backend-)

## Ссылка на сайт
[Менеджер задач](http://147.45.71.150:4200)

# Запуск приложения

## Разворачивание с помощью Docker

Для запуска приложения с использованием Docker выполните следующие шаги:

1. Клонируйте репозиторий:
   git clone <https://github.com/Mikhas3009/izi-api-introduction-frontend-.git>
2. Соберите и запустите контейнеры
    docker build -t frontend:latest .
    docker run -p 8080:8080 frontend 
3. Приложение доступно по адресу: http://localhost:4200

# Стуктура проекта
``` bash
src/
 ├── app/                    # Корневая папка приложения
 │    ├── components/        # standalone конмпоненты
 │    ├── services/          # Сервисы (Api)
 │    ├── interfaces/        # Интерфейсы для моделей данных (Task)
 │
 ├── enviroments/            # Настройки окружений
 │    └── eniviroment.ts/    # Конфигурация по умолчанию (dev)
 │          
 ├── main.ts                 # Точка запуска приложения
 └── server.ts               # Точка входа (запуск сервера)
```