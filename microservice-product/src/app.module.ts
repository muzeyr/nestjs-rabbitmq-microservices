import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ProductModule,
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE', transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'category',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {

}
