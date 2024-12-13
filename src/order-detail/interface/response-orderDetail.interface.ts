import { OrderDetailEntity } from "../entities/order-detail.entity";

export interface ResponseAllOrders{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: OrderDetailEntity[];
}