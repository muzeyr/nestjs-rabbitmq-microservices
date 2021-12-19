import { Controller, Get, Inject } from '@nestjs/common';
import { EventPattern, ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor() { }


  @EventPattern('category')
  async handleMessagePrinted(data: Record<any, unknown>) {
    console.log('EventPattern')
    console.log(data);
  }


  @EventPattern('product_create')
  async productCreate(data: Record<any, unknown>) {
    console.log('product_create:::')
    console.log(data);;
    //let tmp = this.client.emit<any>('pr_create', {category_id:data.category_id});


  }
  
}
