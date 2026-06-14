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
import { CardsService } from "./cards.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";

import { JwtGuard } from "../jwt/jwt.guard";

@Controller("cards")
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @UseGuards(JwtGuard)
  @Get()
  findAll(@Query("listId") listId: string) {
    return this.cardsService.findAll(listId);
  }

  @UseGuards(JwtGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cardsService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @UseGuards(JwtGuard)
  @Put(":id")
  update(@Param("id") id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(id, updateCardDto);
  }

  @UseGuards(JwtGuard)
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.cardsService.delete(id);
  }
}
