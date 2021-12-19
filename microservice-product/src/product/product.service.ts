import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product) private readonly productRepo: Repository<Product>) {
        
    }

    async find(options: FindManyOptions): Promise<Product[]>{
        return this.productRepo.find(options);
    }
    
    async findById(id: number | string): Promise<Product>{
        return this.productRepo.findOne(id);
    }
    
    async create(data):Promise<Product>{

        return this.productRepo.save(data);
    }
    mySuperLongProcessOfUser(data: any) {
        return new Promise(resolve => {
          setTimeout(() => {
            console.log(`done processing data: ${JSON.stringify(data)}`);
            
          }, 10000);
        });
      }    

}
