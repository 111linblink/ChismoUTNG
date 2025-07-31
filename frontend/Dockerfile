# Etapa 1: build
FROM node:20 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY . .

# Instala dependencias
RUN npm install --legacy-peer-deps

# Compila la aplicación Angular
RUN npm run build

# Etapa 2: servir aplicación con Nginx
FROM nginx:stable-alpine

# Elimina el contenido por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia archivos compilados desde el build de Angular
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copia archivo de configuración de Nginx (opcional, si lo tienes)
COPY nginx.conf /etc/nginx/nginx.conf   

# Expone el puerto 80
EXPOSE 80

# Comando por defecto al iniciar el contenedor
CMD ["nginx", "-g", "daemon off;"]
