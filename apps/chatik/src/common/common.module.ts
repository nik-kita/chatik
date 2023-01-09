import { PgDbModule, UserEntity } from '@app/pg-db';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from './strategies/jwt-access/jwt-access.strategy';
import { RoomEntity } from '../../../../libs/pg-db/src/entities/room.entity';
import { MemberEntity } from '../../../../libs/pg-db/src/entities/member.entity';


const SHARING_MODULES = [
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
