# --- Etapa 1: Construcción (Build) ---
FROM node:20-alpine AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación para producción
RUN npm run build

# --- Etapa 2: Servir (Serve) ---
# Usar una imagen de Nginx súper ligera para servir los archivos estáticos
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa de 'build' al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx expone el puerto 80 por defecto, así que no necesitamos EXPOSE

# El comando por defecto de la imagen de Nginx ya inicia el servidor
CMD ["nginx", "-g", "daemon off;"]