import { Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Product } from 'src/models';
import { StoreMapService } from 'src/services';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class StoreMapGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly storeMapService: StoreMapService) {}

  @SubscribeMessage('save-product')
  async saveProduct(@MessageBody() product: Product): Promise<void> {
    const newProduct = await this.storeMapService.saveProduct(product);
    Logger.log(
      `product-update message has successfully been received. ID::${newProduct.id}`,
    );
    this.server.emit('product-update', { data: newProduct });
  }

  @SubscribeMessage('delete-product')
  async deleteProduct(@MessageBody() id: string): Promise<void> {
    const response = await this.storeMapService.deleteProduct(id);
    if (response?.data) {
      Logger.log(
        `product-delete message has successfully been received. ID::${id}`,
      );
      this.server.emit('product-delete', { data: id });
    }
  }
}
