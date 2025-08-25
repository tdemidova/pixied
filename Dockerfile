FROM nginx:alpine

# Копируем файлы сайта
COPY . /usr/share/nginx/html

# Копируем НАШУ конфигурацию поверх дефолтной
COPY nginx.conf /etc/nginx/conf.d/default.conf