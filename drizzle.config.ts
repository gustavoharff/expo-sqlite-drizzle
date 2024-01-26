import type { Config } from 'drizzle-kit';

export default {
  schema: './src/lib/drizzle/schema.ts',
  out: './drizzle',
  driver: 'expo',
} satisfies Config;
