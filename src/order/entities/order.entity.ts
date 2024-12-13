import { Column, Entity, ManyToMany, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { BaseEntity } from "./../../common/config/base.entity";
import { OrderDetailEntity } from "../../order-detail/entities/order-detail.entity";
import { CustomerEntity } from "src/customers/entities/customer.entity";
import { EmployeeEntity } from "src/employee/entities/employee.entity";
import { ShipperEntity } from "src/shipper/entities/shipper.entity";

    @Entity('order')
    export class OrderEntity extends BaseEntity {
        @OneToMany(()=>OrderDetailEntity, (orderDetails)=>orderDetails.order)
        orderDetails: OrderDetailEntity[];

        @ManyToOne(()=>CustomerEntity, (customer)=>customer.orders)
        @JoinColumn({name: "customer_id"})
        customer: string

        @ManyToOne(()=>EmployeeEntity, (employee)=>employee.orders)
        @JoinColumn({name: "employee_id"})
        employee: string

        @ManyToOne(()=>ShipperEntity, (shipper)=>shipper.orders)
        @JoinColumn({name: "shipper_id"})
        shipper: string

        @Column({type: 'varchar'})
        order_date: string
    
    }
    
