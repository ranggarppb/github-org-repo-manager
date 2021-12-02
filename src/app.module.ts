import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MemberModule } from './member/member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as connectionOptions from './database/ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(connectionOptions),
    MemberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
