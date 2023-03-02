import cors from 'cors';
import morgan from 'morgan';
import config from 'config';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import typeDefs from '@server-models/schema';
import { PubSub } from 'graphql-subscriptions';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from '@server-resolvers/index.resolvers';
import express, { NextFunction, Request, Response } from 'express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { GraphQLError } from 'graphql';

export const pubsub = new PubSub();

/**
 * Main Entry point for the server,
 * this method start the express server with configuration
 */
async function Main() {
  const app = express();
  // MIDDLEWARES
  app.use(cors());
  app.use(morgan('combined'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  // This `app` is the returned value from `express()`
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const _apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if your ApolloServer serves at
    // a different path.
    path: '/graphql',
  });

  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer({ schema }, wsServer);

  app.use('*', async (request, response, next) => {
    // set the res and req to context object for all resovers to leverage
    _apolloServer.requestOptions.context = { request, response, config };
    next(); // makes the middleware move next
  });
  // ERROR HANDLER
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err);
    }
    const { status } = err;
    console.log('Error in server: ', status, err.message);
    res.status(status).json(err);
  });
  // start the mongodb server
  try {
    // start the apollo server
    await _apolloServer.start();
    // apply express app as middleware to the apollo server
    _apolloServer.applyMiddleware({ app, path: '/graphql' });
    // start the express server
    httpServer.listen(config.get('server.port'), async () => {
      console.log(
        `B-Suite api started and listening on ${config.get('server.port')}`
      );
    });
  } catch (error) {
    console.log('ERROR: ', error.message);
  }
}
// start the server
Main();
