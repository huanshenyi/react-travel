# 1.nodeイメージ取得して、Reactプロジェクトビルド
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY public public/
COPY src src/
RUN npm run build
# 2.Ngnix実行、ビルド完了したファイルをサーバーフォルダにコピー
FROM nginx:alpine
COPY --from=build /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]