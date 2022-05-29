import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Product } from './models';
import { StoreMapService } from './services';

@Controller()
export class AppController {
  constructor(private readonly storeMapService: StoreMapService) {}

  @Get()
  async getAllProducts(
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<{
    data: Product[];
    count: number;
  }> {
    return await this.storeMapService.getAllProducts(take, skip);
  }

  @Delete('/:id')
  async deleteById(@Param('id') id: string): Promise<{ data: number }> {
    return await this.storeMapService.deleteProduct(id);
  }

  @Post('/mutiple')
  async saveMultipleProducts(
    @Body() { numberOfProducts }: { numberOfProducts: number },
  ): Promise<{
    data: number;
  }> {
    return await this.storeMapService.saveMultipleProducts(numberOfProducts);
  }

  @Post()
  async saveProduct(@Body() product: Product): Promise<Product> {
    return await this.storeMapService.saveProduct(product);
  }
}
