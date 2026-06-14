import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/create-board.dto";
import { UpdateBoardDto } from "./dto/update-board.dto";
import { JwtGuard } from "../jwt/jwt.guard";

@Controller("boards")
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.boardsService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createListDto: CreateBoardDto) {
    return this.boardsService.create(createListDto);
  }

  @UseGuards(JwtGuard)
  @Put(":id")
  update(@Param("id") id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(id, updateBoardDto);
  }

  @UseGuards(JwtGuard)
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.boardsService.delete(id);
  }
}
