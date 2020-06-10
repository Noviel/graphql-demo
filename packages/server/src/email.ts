import { GraphQLScalarType } from 'graphql';

const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function isEmail(value: string) {
  return EMAIL_REGEXP.test(String(value).toLowerCase());
}

export function assertEmail(value: string) {
  if (!isEmail(value)) {
    throw new Error(`"${value}" is not a correct email address.`);
  }
}

export const EmailScalarType = new GraphQLScalarType({
  name: 'Email',
  description: 'Email address with validation',
  serialize(value) {
    assertEmail(value);
    return value;
  },
  parseValue(value) {
    assertEmail(value);
    return value;
  },
  parseLiteral(ast) {
    switch (ast.kind) {
      case 'StringValue':
        assertEmail(ast.value);
        return ast.value;
    }
    return null;
  },
});
