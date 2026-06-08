import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { Board } from "./schemas/board.schema";

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name) private readonly boardModel: Model<Board>
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const createdBoard = await this.boardModel.create(createBoardDto);

    return createdBoard;
  }

  async findAll(): Promise<Board[]> {
    return this.boardModel.find().exec();
  }

  async findOne(id: string): Promise<Board> {
    return this.boardModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    return this.boardModel
      .findByIdAndUpdate({ _id: id }, updateBoardDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Board> {
    const deletedBoard = await this.boardModel
      .findByIdAndDelete({ _id: id })
      .exec();
    return deletedBoard;
  }
}
