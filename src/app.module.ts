import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { ListsModule } from "./lists/lists.module";
import { CardsModule } from './cards/cards.module';
import { BoardsModule } from './boards/boards.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the module available everywhere
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/test'),
    ListsModule,
    CardsModule,
    BoardsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
