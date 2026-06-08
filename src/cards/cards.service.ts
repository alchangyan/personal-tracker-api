import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { Card } from "./schemas/card.schema";

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<Card>
  ) {}

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const createdCard = await this.cardModel.create(createCardDto);

    return createdCard;
  }

  async findAll(listId: string): Promise<Card[]> {
    return this.cardModel.find({ listId }).exec();
  }

  async findOne(id: string): Promise<Card> {
    return this.cardModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<Card> {
    return this.cardModel
      .findByIdAndUpdate({ _id: id }, updateCardDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Card> {
    const deletedCard = await this.cardModel
      .findByIdAndDelete({ _id: id })
      .exec();
    return deletedCard;
  }
}
