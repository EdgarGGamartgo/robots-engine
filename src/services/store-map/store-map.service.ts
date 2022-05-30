import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/models';
import { Robot } from 'src/models/robot.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StoreMapService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Robot) private robotRepository: Repository<Robot>,
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

  async getProductsByPosition(x: number, y: number): Promise<Product[]> {
    return await this.productRepository.find({
      where: { x, y },
    });
  }

  async getAllRobots(numberOfRobots = 1): Promise<Robot[]> {
    return await this.robotRepository.find({
      take: numberOfRobots,
    });
  }

  getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async saveProduct(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }

  async saveRobot(robot: Robot): Promise<Robot> {
    return await this.robotRepository.save(robot);
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

  async saveMultipleRobots(numberOfRobots: number): Promise<{
    data: number;
  }> {
    let idx = 0;
    while (idx < numberOfRobots) {
      const { id } = await this.saveRobot({
        x: this.getRandomIntInclusive(0, 100),
        y: this.getRandomIntInclusive(0, 100),
        name: `RT-${uuidv4()}`,
        orientation: '',
        speed: this.getRandomIntInclusive(0, 100),
        dest_x: this.getRandomIntInclusive(0, 100),
        dest_y: this.getRandomIntInclusive(0, 100),
      });
      idx++;
      Logger.log(`Robot has been created. ID::${id}`);
    }
    return { data: numberOfRobots };
  }

  async updateRobot(robot: Robot): Promise<Robot> {
    if (robot?.id) {
      const updatedRobot = await this.saveRobot(robot);
      Logger.log(
        `Robot has been updated. ID::${updatedRobot.id}. X::${updatedRobot.x}. Y::${updatedRobot.y}. Orientation::${updatedRobot.orientation}.`,
      );
      return updatedRobot;
    }

    return null;
  }
}
