import { ConfigModule } from './config.module';
import { Module } from '@nestjs/common';
import { MongoModule } from './mongo.module';

@Module({
  imports: [ConfigModule, MongoModule],
  exports: [ConfigModule, MongoModule],
})
export class CommonModule {}
