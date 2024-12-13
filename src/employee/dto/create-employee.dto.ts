import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    firt_name: string;

    @IsDate()
    @IsNotEmpty()
    birth_date: Date;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    phote: string;

    @IsString()
    @IsNotEmpty()
    note: string;

}

