import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[TypeOrmModule.forFeature([Product]),
  ClientsModule.register([
    {
      name: 'PRODUCT_SERVICE', transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'e-commerce',
        queueOptions: {
          durable: false
        },
      },
    },
  ])],
  exports:[TypeOrmModule],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
