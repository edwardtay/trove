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
# V8 heap cap for the build. Next.js 15 + React 19 + viem/ethers/wagmi
# compilation peaks around 1.0-1.4 GB during webpack chunking — 1024 OOMs,
# 2048 gives ~600 MB headroom without exhausting tight hosts.
ENV NODE_OPTIONS="--max-old-space-size=2048"
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

# Real healthcheck against /api/health — Swarm restarts unhealthy tasks.
# TCP-port readiness misses OOM-during-request and event-loop stalls.
HEALTHCHECK --interval=30s --timeout=5s --start-period=45s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health > /dev/null || exit 1

CMD ["node", "server.js"]
