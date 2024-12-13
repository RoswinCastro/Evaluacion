import { Column, Entity } from "typeorm";
import { BaseEntity } from "./../../common/config/base.entity";
import { ManyToOne, JoinColumn } from "typeorm";
import {OrderEntity} from "../../order/entities/order.entity"

    @Entity('order_detail')
    export class OrderDetailEntity extends BaseEntity {
    @ManyToOne(()=>OrderEntity, (order)=>order.orderDetails)
    @JoinColumn({name: "order_id"})
    order:string;

    @ManyToOne(()=>OrderEntity, (product)=>product.orderDetails)
    @JoinColumn({name: "product_id"})
    product:string;


    @Column({type: 'int'})
    quantity: number
    
    }
    
