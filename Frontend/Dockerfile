# Étape de build
FROM node:18-alpine AS builder
WORKDIR /app

# Copie des fichiers de configuration
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Installation des dépendances
RUN npm ci

# Copie du reste des fichiers source
COPY . .

# Build de l'application
RUN npm run build

# Étape de production
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copie des fichiers nécessaires depuis l'étape de build
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Copie du répertoire .next
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

# Copie des fichiers node_modules (si nécessaire pour le mode standalone)
COPY --from=builder /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

ENV PORT 3000
# Assurez-vous que cette commande correspond à votre script de démarrage dans package.json
CMD ["npm", "start"]