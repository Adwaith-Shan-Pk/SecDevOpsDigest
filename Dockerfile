# Use the official NGINX image from Docker Hub as the base
FROM nginx:alpine

# Copy all the project files (HTML, CSS, JS) into the NGINX web server directory
COPY . /usr/share/nginx/html

# Expose port 80 to allow traffic to the web server
EXPOSE 80