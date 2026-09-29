# Day 10 -- this file has two steps. Step 1 builds the React app. Step 2
# takes only the finished files and serves them with Nginx. This keeps
# the final image small -- no extra tools are shipped, only what's needed.

# ---- Step 1: build the React app into plain HTML/CSS/JS files ----
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Step 2: serve those files with Nginx (a small, fast web server) ----
FROM nginx:1.27-alpine AS production

# Day 10 -- our app has multiple pages (like /crud) handled by React
# itself, not by real files on the server. This tells Nginx: if you can't
# find a matching file, just show index.html and let React handle the page.
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
