import { Body, Controller, Get, HttpServer, Inject, Param, Post } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service'; 
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { Message } from './message.event';

@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService,
                @Inject('CATEGORY_SERVICE') private readonly client: ClientProxy){

    }
    @Get('/:id')
    async getFindById(@Param('id') id: number) {
        const category = await this.categoryService.findOne(id);
        console.log(category);
        this.client.emit<any>('category', category);

      return 'Hello World printed'+id;
    }

    @EventPattern('category_create')
    @Post()
    async create(
        @Body('title') title: string,
        @Body('description') description: string,
    ){
        console.log('>>>>',title);
        console.log('<>>>>>>',description);
        this.categoryService.create({title,description});
    }
     
    @Post(':id/product')
   async createProduct(@Param('id') id: number,
                        @Param('name') name: string){
       const category = await this.categoryService.findOne(id);
       let tmp = this.client.emit<any>('product_create', {category_id:id,name});
       console.log('tmp::',tmp);
       const products =  category.products;
       products.push({name});
       
       category.products = products;
       await this.categoryService.create(category);
       return category;

     
   }

    @Get()
    async all() {
         
        //this.client.emit<any>('all', new Message(data));
        return this.categoryService.find();

        /*
        let categories = await   this.categoryService.find();
        for (const category of categories) {
            try {
                await (this.httpService.get(`http://localhost:8001/api/product/${category.id}/category`).subscribe(products=>{
                    category.products =  products.data;
                    console.log(category);
                }));
            } catch (error) {
                
            }
        }
        return categories;
        */
    }

   



}
 