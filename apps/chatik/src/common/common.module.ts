import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberEntity, RoomEntity, UserEntity } from '../../../../libs/pg-db/src/entities';
import { JwtAccessStrategy } from './strategies/jwt-access/jwt-access.strategy';
import { PgDbModule } from '../../../../libs/pg-db/src';
import { ChatikConfigModule } from '../../../../libs/config/src/chatik';


const SHARING_MODULES = [
  ChatikConfigModule,
  JwtModule,
  PgDbModule,
  TypeOrmModule.forFeature([
    UserEntity,
    RoomEntity,
    MemberEntity,
  ])];
const SHARING_PROVIDERS = [
  JwtAccessStrategy,
];


@Module({
  imports: SHARING_MODULES,
  providers: SHARING_PROVIDERS,
  exports: [...SHARING_MODULES, ...SHARING_PROVIDERS],
})
export class CommonModule { }
