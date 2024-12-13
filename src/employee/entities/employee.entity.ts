import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./../../common/config/base.entity";
import { OrderEntity } from "src/order/entities/order.entity";

    @Entity('employee')
    export class EmployeeEntity extends BaseEntity {
        @Column({type: 'varchar'})
        last_name: string;
    
        @Column({type: 'varchar'})
        firt_name: string;
    
        @Column({type: 'date'})
        birth_date: Date;
    
        @Column({type: 'varchar'})
        city: string;
        
        @Column({type: 'varchar'})
        phote: string;
    
        @Column({type: 'varchar'})
        note: string;

        @OneToMany(()=>OrderEntity, (order)=>order.employee)
        orders: OrderEntity[]
    
    }
    
