import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { List } from './schemas/list.schema';

@Injectable()
export class ListsService {
  constructor(@InjectModel(List.name) private readonly listModel: Model<List>) {}

  async create(createListDto: CreateListDto): Promise<List> {
    const createdList = await this.listModel.create(createListDto);
    
    return createdList;
  }

  async findAll(): Promise<List[]> {
    return this.listModel.find().exec();
  }

  async findOne(id: string): Promise<List> {
    return this.listModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateListDto: UpdateListDto): Promise<List> {
    return this.listModel
      .findByIdAndUpdate({ _id: id }, updateListDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<List> {
    const deletedList = await this.listModel
      .findByIdAndDelete({ _id: id })
      .exec();
    return deletedList;
  }
}
