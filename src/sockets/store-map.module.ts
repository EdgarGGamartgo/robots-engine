import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/models';
import { Robot } from 'src/models/robot.entity';
import { StoreMapService } from 'src/services';
import { StoreMapGateway } from './store-map-socket.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Robot])],
  providers: [StoreMapGateway, StoreMapService],
})
export class StoreMapSocketModule {}
