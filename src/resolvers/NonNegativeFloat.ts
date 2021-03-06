import { GraphQLScalarType } from 'graphql/type/definition';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';

import { processValue, VALIDATIONS } from './utilities';

export default function (name = 'NonNegativeFloat') {
  return new GraphQLScalarType({
    name,

    description: 'Floats that will have a value of 0 or more.',

    serialize(value) {
      return processValue(value, VALIDATIONS.NonNegativeFloat);
    },

    parseValue(value) {
      return processValue(value, VALIDATIONS.NonNegativeFloat);
    },

    parseLiteral(ast) {
      if (ast.kind !== Kind.FLOAT) {
        throw new GraphQLError(
          `Can only validate floating point numbers as non-negative floating point numbers but got a: ${
          ast.kind
          }`,
        );
      }

      return processValue(ast.value, VALIDATIONS.NonNegativeFloat);
    },
  });
}
