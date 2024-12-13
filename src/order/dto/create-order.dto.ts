import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    quantity: number
}

