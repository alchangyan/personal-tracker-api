import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes } from "mongoose";

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
  @Prop({ type: SchemaTypes.ObjectId, ref: "List" })
  listId: string;

  @Prop({ required: true })
  name: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
