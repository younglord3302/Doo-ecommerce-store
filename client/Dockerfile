FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Install serve to serve the build
RUN npm install -g serve

# Create a simple nginx config or modify serve behavior
# The -s flag causes issues with manifest.json, so we'll use a different approach
RUN apk add --no-cache nginx && \
    mkdir -p /var/log/nginx && \
    mkdir -p /etc/nginx/http.d

# Create nginx config
RUN echo 'server {\
    listen 3000;\
    server_name localhost;\
    root /app/build;\
    index index.html;\
    \
    location / {\
        try_files $uri $uri/ /index.html;\
    }\
    \
    location /manifest.json {\
        alias /app/build/manifest.json;\
        add_header Content-Type application/json;\
    }\
    \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {\
        expires 1y;\
        add_header Cache-Control "public, immutable";\
    }\
}' > /etc/nginx/http.d/default.conf

# Expose port
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
