/**
 * Generates a per-visitor identity using a cookie + IP hash.
 *
 * Sets a persistent `visitor_id` cookie so the same visitor stays consistent
 * across sessions even if their IP shifts (e.g. mobile handoff), and so two
 * people sharing an office NAT don't collide.
 *
 * This is NOT authentication — it's a fingerprint for demo isolation.
 */
import { headers, cookies } from "next/headers";
import { createHash, randomUUID } from "crypto";

export async function getUserId(): Promise<string> {
  const cookieStore = await cookies();
  let visitorId = cookieStore.get("visitor_id")?.value;

  if (!visitorId) {
    visitorId = randomUUID();
    try {
      cookieStore.set("visitor_id", visitorId, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
    } catch {
      // Called from a Server Component render (e.g. page.tsx -> GetWorkflowsForUser).
      // Cookies can't be set here — it'll be set on the next Server Action call instead.
    }
  }

  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  return createHash("sha256")
    .update(`${ip}:${visitorId}`)
    .digest("hex")
    .slice(0, 32);
}
