# 1. Sèvi ak yon imaj Node.js ofisyèl tankou baz
FROM node:20-alpine

# 2. Defini katab travay la anndan Docker
WORKDIR /app

# 3. Kopye tout pwojè a nèt ak katab dist ak node_modules ki bati deja yo
COPY . .

# 4. Louvri pò 4173 lan egzakteman jan IBM Code Engine mande l la
EXPOSE 4173

# 5. Kòmand pou lanse sèvè preview Vite a pou pwodiksyon
CMD ["npm", "run", "preview"]