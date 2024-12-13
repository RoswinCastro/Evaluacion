import { ShipperEntity} from "../entities/shipper.entity";

export interface ResponseAllShippers {
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: ShipperEntity[];
}