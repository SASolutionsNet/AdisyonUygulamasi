# Build aşaması
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=development --base-href=/

# Nginx ile yayınlama
FROM nginx:alpine

# Tüm önceki dosyaları sil ve izinleri ayarla
RUN rm -rf /usr/share/nginx/html && \
    mkdir -p /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Build edilmiş dosyaları kopyala
COPY --from=build /app/dist/bussines-application.web.ng/browser /usr/share/nginx/html 


# Nginx yapılandırmasını kopyala
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Son izin kontrolleri
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Nginx'i root olarak çalıştır (son çare)
USER root

CMD ["nginx", "-g", "daemon off;"]