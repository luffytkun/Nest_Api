import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({
  imports: [CommonModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
