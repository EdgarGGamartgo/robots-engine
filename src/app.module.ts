import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './models';
import { Robot } from './models/robot.entity';
import { StoreMapService } from './services/store-map/store-map.service';
import { StoreMapSocketModule } from './sockets/store-map.module';
import { StoreMapJobModule } from './jobs/StoreMapJobModule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'robotsDemo',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, Robot]),
    StoreMapSocketModule,
    StoreMapJobModule,
  ],
  controllers: [AppController],
  providers: [AppService, StoreMapService],
})
export class AppModule {}
