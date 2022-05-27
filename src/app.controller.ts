import { Body, Controller, Get, Post } from '@nestjs/common';
import { Product } from './models';
import { StoreMapService } from './services';

@Controller()
export class AppController {
  constructor(private readonly storeMapService: StoreMapService) {}

  @Get()
  async getHello(): Promise<Product[]> {
    return await this.storeMapService.getAllProducts();
  }

  @Post()
  async saveMultipleProducts(
    @Body() { numberOfProducts }: { numberOfProducts: number },
  ): Promise<Product[]> {
    return await this.storeMapService.saveMultipleProducts(numberOfProducts);
  }
}
