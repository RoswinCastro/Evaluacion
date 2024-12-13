
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateShipperDto {
    @IsString()
    @IsNotEmpty()
    shipper_name: string;

    @IsString()
    @IsNotEmpty()
    phone: string;
}
