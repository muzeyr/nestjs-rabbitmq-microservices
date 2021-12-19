import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
    

    constructor(
        @InjectRepository(Category) private readonly categoryRepo: Repository<Category>) {

    }

    async find(): Promise<Category[]> {
        return this.categoryRepo.find();
    }
    async findOne(id: number):Promise<Category> {
        return this.categoryRepo.findOne(id);
    }

    async create(data): Promise<Category> {

        return this.categoryRepo.save(data);
    }
}
