import { Body, Controller, Get, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext, ClientProxy, EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){

    }
 

    @Get()
    async findAll(){
        return this.productService.find({});
    }

    @Get('/:id/category')
    async postProduct(@Param('id') id:number ){
        return this.productService.find({
            where:{
                category_id:id
            }
        })
    }

    @EventPattern('pr_create')
    @Post()
    async create(
        @Body('category_id') category_id: number,
        @Body('name') name: string,
    ){
      console.log(123);
        const product = await this.productService.create({category_id,name});

        return product;
        
    }
     


}
