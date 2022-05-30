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
import { Robot } from './models/robot.entity';
import { StoreMapService } from './services';

@Controller()
export class AppController {
  constructor(private readonly storeMapService: StoreMapService) {}

  @Get('/by-position')
  async getAllProductsByPosition(
    @Query('x') x: number,
    @Query('y') y: number,
  ): Promise<Product[]> {
    return await this.storeMapService.getProductsByPosition(x, y);
  }

  @Get('/robots')
  async getAllRobots(
    @Query('numberOfRobots') numberOfRobots: number,
  ): Promise<Robot[]> {
    return await this.storeMapService.getAllRobots(numberOfRobots);
  }

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

  @Post('/mutiple-robots')
  async saveMultipleRobots(
    @Body() { numberOfRobots }: { numberOfRobots: number },
  ): Promise<{
    data: number;
  }> {
    return await this.storeMapService.saveMultipleRobots(numberOfRobots);
  }

  @Post()
  async saveProduct(@Body() product: Product): Promise<Product> {
    return await this.storeMapService.saveProduct(product);
  }
}
