import { registerEnumType } from '@nestjs/graphql';

export enum TimeUnit {
  MONTH = 'Tháng',
}

registerEnumType(TimeUnit, {
  name: 'TimeUnit',
  description: 'The time unit',
});
