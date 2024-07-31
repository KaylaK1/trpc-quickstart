// Main Router Instance
// standalone adapter
import { createHTTPServer } from  '@trpc/server/adapters/standalone';
import { db } from './db';
import { publicProcedure, router } from './trpc';
import { z } from 'zod';

// Router containing query procedures
const appRouter = router({
    userList: publicProcedure
        .query(async () => {
            // Retrieve users from db
            const users = await db.user.findMany();

            return users;
        }),
    userById: publicProcedure
        .input(z.string()) // z: input validator and parser. Input is then accessible through input
        .query(async (opts) => {
            const { input } = opts; // const input: string
            // Retrieve the user with given ID
            const user = await db.user.findById(input); // const user: User | undefined

            return user;
        }),
    userCreate: publicProcedure
        .input(z.object({ name: z.string() }))
        .mutation(async (opts) => {
            const { input } = opts; // const input: { name: string; }
            // Create a new user in the database
            const user = await db.user.create(input); // const user: { name: string; id: string; }
            
            return user;
        }),
});

// Export type router type signature - not the router itself.
export type AppRouter = typeof appRouter;

// Serve the API
const server = createHTTPServer({
    router: appRouter,
});

server.listen(3000);
