import cors from 'cors';
import morgan from 'morgan';
import config from 'config';
import express from 'express';
import { models } from 'mongoose';
import { WebSocketServer } from 'ws';
import bodyParser from 'body-parser';
import { GraphQLError } from 'graphql';
import { Server, createServer } from 'http';
import { ApolloServer } from '@apollo/server';
import { PubSub } from 'graphql-subscriptions';
import { useServer } from 'graphql-ws/lib/use/ws';
import { resolvers } from '@server-resolvers/resolver';
import { typeDefs } from '@server-models/schemas/schema';
import { mongodbService } from '@server-services/mongodb';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { errorMiddlwares } from '@server-commons/middlewares/error';
import { assetMiddlwares } from '@server-commons/middlewares/assets';
import { IResolverContext } from '@server-models/interfaces/IResolverContext';
import { authenticationToken } from '@server-commons/auths/authenticationMiddleware';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { authorizeRoleDirectiveTransformer } from '@server-directives/authorize.directives';

/**
 * Main Entry point for the server,
 * this method start the express server with configuration
 */
async function Main() {
  const pubSub = new PubSub();
  // This `app` is the returned value from `express()`
  const app = express();
  // Create a httpServer and use express app
  const httpServer: Server = createServer(app);
  // Make an executable schema from the schema.graphql and resolver
  const schema = authorizeRoleDirectiveTransformer(
    makeExecutableSchema({
      typeDefs,
      resolvers,
    })
  );
  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if your ApolloServer serves at
    // a different path.
    path: '/v1',
  });
  // Hand in the schema we just created and have the
  // WebSocketServer start listening.
  const serverCleanup = useServer(
    {
      schema,
      // Pass context for subscriptions
      async context(ctx, msg, args) {
        // perform authentication
        const authorizationToken =
          (ctx.connectionParams?.authorization as string) ?? '';
        const authenticatedStaff = await authenticationToken(
          authorizationToken,
          config.get('jwt.private')
        );
        return { pubSub, authenticatedStaff };
      },
    },
    wsServer
  );
  //
  const apolloServer = new ApolloServer<IResolverContext>({
    schema,
    cache: 'bounded',
    csrfPrevention: true,
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
    ],
  });
  try {
    // start the apollo server
    await apolloServer.start();
    // MIDDLEWARES
    app.use(
      '/v1',
      // SET UP CORS
      cors<cors.CorsRequest>({ origin: ['http://localhost:3000'] }),
      // BODYPARSER
      bodyParser.json(),
      // MORGAN
      morgan('combined'),
      // ASSET MIDDLEWARES
      assetMiddlwares(__dirname),
      // ERROR HANDLE
      errorMiddlwares(__dirname),
      // EXPRESSMIDDLWARE
      expressMiddleware(apolloServer, {
        context: async ({ req }) => {
          const authorizationToken = req.headers.authorization;
          // if user is authenticating (login)
          if (
            authorizationToken === 'Authentication' ||
            authorizationToken === 'Reset'
          ) {
            return {
              models,
              config,
              pubSub,
            }; // end return
          } else {
            // perform authentication
            const authenticatedStaff = await authenticationToken(
              authorizationToken,
              config.get('jwt.private')
            );
            return {
              models,
              config,
              pubSub,
              authenticatedStaff,
            }; // end return
          }
        }, // end context
      }) // end expressMiddleware
    ); // end MIDDLWARE
    //
    // start mongodb Server
    await mongodbService(),
      // apply express app as middleware to the apollo server
      // start the express server
      await new Promise<void>((resolve) => {
        httpServer.listen(config.get('server.port'), resolve);
      });
    console.log(
      `B-Suite api started and listening on ${config.get('server.port')}`
    );
  } catch (error) {
    throw new GraphQLError(error.message, {
      extensions: { code: error.code },
    }); // end GraphQLError
  } // end catch
} // end Main
// start the server
Main();
