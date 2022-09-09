import { GraphQLScalarType, Kind } from 'graphql';

const MAX_INT = 2147483647;
const MIN_INT = -2147483648;

const coerceIntString = (value: any) => {
  if (Array.isArray(value)) {
    throw new TypeError(
      `IntString cannot represent an array value: [${String(value)}]`,
    );
  }
  if (Number.isInteger(value)) {
    if (value < MIN_INT || value > MAX_INT) {
      throw new TypeError(
        `Value is integer but outside of valid range for 32-bit signed integer: ${String(
          value,
        )}`,
      );
    }
    return value;
  }
  return String(value);
};

export const IntStringScalar = new GraphQLScalarType({
  name: 'IntString',
  description: `The Float scalar type represents signed double-precision fractional values as specified by IEEE 754.
    The String scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
    IntString is a combination of String and Float`,
  serialize: coerceIntString,
  parseValue: coerceIntString,
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return coerceIntString(parseInt(ast.value, 10));
    }
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    return undefined;
  },
});
