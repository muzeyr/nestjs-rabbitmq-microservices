 
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Module({
  imports:[TypeOrmModule.forFeature([Category]),
  ClientsModule.register([
    {
      name: 'CATEGORY_SERVICE', transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@localhost:5672'],
        queue: 'e-commerce',
        queueOptions: {
          durable: false
        },
      },
    },
  ])
],
  exports:[TypeOrmModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
