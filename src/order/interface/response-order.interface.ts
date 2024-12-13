import { OrderEntity} from '../entities/order.entity';

export interface ResponseAllOrders {
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: OrderEntity[];
}