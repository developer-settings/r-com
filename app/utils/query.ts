import { neon } from '@neondatabase/serverless';

import postgres from 'postgres';
export const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });
// neon(process.env.DATABASE_URL!);
