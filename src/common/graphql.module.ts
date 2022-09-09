import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DirectiveLocation, GraphQLDirective } from 'graphql';

import { GraphQLModule } from '@nestjs/graphql';
import { IntStringScalar } from './scalars/int-string.scalar';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { upperDirectiveTransformer } from './directives/upper-case.directive';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/common/schema.gql'),
      // resolvers: { IntString: IntStringScalar },
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
      playground: true,
    }),
  ],
})
export class GraphqlModule {}
