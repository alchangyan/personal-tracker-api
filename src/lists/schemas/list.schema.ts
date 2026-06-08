import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes } from "mongoose";

export type ListDocument = HydratedDocument<List>;

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})

export class List {
  @Prop({ type: SchemaTypes.ObjectId, ref: "Board" })
  boardId: string;

  @Prop({ required: true })
  name: string;
}

export const ListSchema = SchemaFactory.createForClass(List);

ListSchema.virtual("cards", {
  ref: "Card",
  localField: "_id",
  foreignField: "listId",
});
