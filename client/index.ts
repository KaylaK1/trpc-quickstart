import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';

// Passing AppRouter as a generic lets the trpc object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000',
        }),
    ],
});


// Querying & mutating
// Inferred types
const user = await trpc.userById.query('1');

const createdUser = await trpc.userCreate.mutate({ name: 'kayla' });