import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Put,
} from "@nestjs/common";
import { ListsService } from "./lists.service";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";

@Controller("lists")
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @Get()
  findAll(@Query("boardId") boardId: string) {
    return this.listsService.findAll(boardId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.listsService.findOne(id);
  }

  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listsService.create(createListDto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateListDto: UpdateListDto) {
    return this.listsService.update(id, updateListDto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.listsService.delete(id);
  }
}
