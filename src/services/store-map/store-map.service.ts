import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/models';
import { Repository } from 'typeorm';

@Injectable()
export class StoreMapService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getAllProducts(
    take = 10000,
    skip = 0,
  ): Promise<{
    data: Product[];
    count: number;
  }> {
    const [result, total] = await this.productRepository.findAndCount({
      order: { id: 'ASC' },
      take,
      skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async saveProduct(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async deleteProduct(id: string): Promise<{ data: number }> {
    return await this.productRepository.delete(id).then((r) => {
      return { data: r.affected };
    });
  }

  async saveMultipleProducts(numberOfProducts: number): Promise<{
    data: number;
  }> {
    let idx = 0;
    while (idx < numberOfProducts) {
      await this.saveProduct({
        x: this.getRandomIntInclusive(0, 100),
        y: this.getRandomIntInclusive(0, 100),
      });
      idx++;
      Logger.log(`Product has been created. ID::${idx}`);
    }
    return { data: numberOfProducts };
  }
}
