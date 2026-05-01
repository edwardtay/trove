/**
 * Side-effect import that loads .env.local first (Next.js convention),
 * then .env as fallback. Import as `import "./_env";` at the top of any
 * CLI script that needs PRIVATE_KEY etc.
 */

import { config } from "dotenv";

config({ path: ".env.local" });
config({ path: ".env" }); // fallback, won't override .env.local
