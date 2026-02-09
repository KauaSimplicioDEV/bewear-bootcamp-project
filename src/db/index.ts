import * as schema from "./schema";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

// Durante o build, DATABASE_URL pode não estar disponível
// A validação real acontecerá em runtime quando o banco for acessado
const DATABASE_URL = process.env.DATABASE_URL || "";

if (!DATABASE_URL && process.env.NODE_ENV !== "production") {
  console.warn("⚠️  DATABASE_URL is not defined in environment variables");
}

export const db = drizzle(DATABASE_URL, {
  schema,
});
