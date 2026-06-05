import { Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { ListsModule } from "./lists/lists.module";
import { CardsModule } from './cards/cards.module';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/test'),
    ListsModule,
    CardsModule,
    BoardsModule
  ],
})
export class AppModule {}
