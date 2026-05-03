# Multi-stage build for the Trove Next.js app on CapRover.
#
# Stage 1: install deps + build the production bundle (standalone output)
# Stage 2: minimal runtime image with only the standalone server

FROM node:22-alpine AS deps
WORKDIR /app

# React 19 + wagmi peer-dep conflict — known, harmless.
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps --no-audit --no-fund

# ---

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Constrain V8 heap during build so memory-pressured hosts don't OOM.
ENV NODE_OPTIONS="--max-old-space-size=1024"
# Hardhat is a devDep; next build only touches Next code.
RUN npm run build

# ---

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

# Standalone output bundles only the runtime files needed.
# (No /public directory in this project, so we skip copying it.)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# No HEALTHCHECK — let CapRover/Swarm use its own TCP-port readiness.
CMD ["node", "server.js"]
