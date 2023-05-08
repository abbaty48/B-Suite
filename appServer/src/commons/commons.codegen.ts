import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'appServer/src/models/schemas/schema.ts',
  config: {
    useIndexSignature: true,
    contextType:
      'appServer/src/models/interfaces/IResolverContext#IResolverContext',
  },
  require: ['ts-node/register'],
  generates: {
    'appServer/src/models/@types/resolver_types.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers',
        'typescript-document-nodes',
      ],
    },
    'appServer/src/models/schemas/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
