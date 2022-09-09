import { registerEnumType } from '@nestjs/graphql';

export enum AttributeKey {
  VCPU = 'vCPU',
  RAM = 'RAM',
  SSD = 'SSD',
  BANDWIDTH = 'BANDWIDTH',
  TRANSMISSION_TRAFFIC = 'TRANSMISSION_TRAFFIC',
  IP = 'IP',
}

registerEnumType(AttributeKey, {
  name: 'AttributeKey',
  description: 'The key of attribute',
});
