import { NextResponse } from "next/server";

const startedAt = Date.now();

/**
 * GET /api/health
 * Liveness probe for the three Relay prototypes.
 * No auth, no database — it only reports that the runtime is up and which
 * build is serving the request.
 */
export async function GET() {
  const now = Date.now();

  return NextResponse.json(
    {
      status: "ok",
      service: "relay-prototypes",
      environment: process.env.NODE_ENV ?? "unknown",
      node: process.version,
      time: new Date(now).toISOString(),
      uptimeSeconds: Math.round((now - startedAt) / 1000),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
