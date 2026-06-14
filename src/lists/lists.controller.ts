import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ListsService } from "./lists.service";
import { CreateListDto } from "./dto/create-list.dto";
import { UpdateListDto } from "./dto/update-list.dto";
import { JwtGuard } from "../jwt/jwt.guard";

@Controller("lists")
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @UseGuards(JwtGuard)
  @Get()
  findAll(@Query("boardId") boardId: string) {
    return this.listsService.findAll(boardId);
  }

  @UseGuards(JwtGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.listsService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createListDto: CreateListDto) {
    return this.listsService.create(createListDto);
  }

  @UseGuards(JwtGuard)
  @Put(":id")
  update(@Param("id") id: string, @Body() updateListDto: UpdateListDto) {
    return this.listsService.update(id, updateListDto);
  }

  @UseGuards(JwtGuard)
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.listsService.delete(id);
  }
}
