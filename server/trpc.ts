// Router Instance for tRPC backend
import { initTRPC } from '@trpc/server';

// Initialization
const t = initTRPC.create();

// Reusable router and procedure helper
export const router = t.router;
export const publicProcedure = t.procedure;