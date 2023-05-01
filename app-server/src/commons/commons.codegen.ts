import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/models/schemas/schema.ts',
  config: {
    useIndexSignature: true,
    contextType: '../../models/interfaces/IResolverContext#IResolverContext',
  },
  require: ['ts-node/register'],
  generates: {
    'src/models/@types/resolver_types.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers',
        'typescript-document-nodes',
      ],
    },
    'src/models/schemas/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
