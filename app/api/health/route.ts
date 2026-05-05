import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const startedAt = Date.now();

export async function GET() {
  const mem = process.memoryUsage();
  return NextResponse.json({
    ok: true,
    uptime: Math.round((Date.now() - startedAt) / 1000),
    memory: {
      rss: mem.rss,
      heapUsed: mem.heapUsed,
      heapTotal: mem.heapTotal,
      external: mem.external,
    },
    nodeVersion: process.version,
    pid: process.pid,
  });
}
