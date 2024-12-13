import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./../../common/config/base.entity";
import { OrderEntity } from "src/order/entities/order.entity";

@Entity('shipper')
export class ShipperEntity extends BaseEntity {
    @Column({type: 'varchar'})
    shipper_name: string;

    @Column({type: 'varchar'})
    phone: string;

    @OneToMany(()=>OrderEntity, (order)=>order.shipper)
    orders: OrderEntity[]

}
