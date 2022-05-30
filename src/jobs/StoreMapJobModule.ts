import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/models';
import { Robot } from 'src/models/robot.entity';
import { StoreMapService } from 'src/services';
import { StoreMapGateway } from 'src/sockets/store-map-socket.gateway';
import { StoreMapJob } from './StoreMapJob';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Robot])],
  providers: [StoreMapJob, StoreMapService, StoreMapGateway],
})
export class StoreMapJobModule {}
