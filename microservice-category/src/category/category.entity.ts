import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column('varchar',{
        default:'[]',
        transformer:{
            to(value: any[]): string{
                console.log(11,value);
                return JSON.stringify(value);
            },
            from(value: string): any[]{
              try {
                console.log(222,value);
                if(value.length>0)
                return JSON.parse(value);
              } catch (error) {
                  console.log(error);
                  return []
              }
            }
        }
    })
    products: any[];


}