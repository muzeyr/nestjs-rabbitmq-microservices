import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    CategoryModule,
    ClientsModule.register([
      {
        name: 'CATEGORY_SERVICE', transport: Transport.RMQ,
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
