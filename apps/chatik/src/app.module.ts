import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatikConfigModule } from '@app/config/chatik';
import { PgDbModule, UserEntity, UserPgRepo } from '@app/pg-db';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './common/strategies/jwt-access/jwt-access.strategy';

@Module({
  imports: [
    ChatikConfigModule,
    JwtModule,
    PgDbModule,
    TypeOrmModule.forFeature([
      UserEntity,
    ])],
  controllers: [AppController],
  providers: [
    AppService,
    UserPgRepo,
    JwtAccessStrategy,
  ],
})
export class AppModule { }
