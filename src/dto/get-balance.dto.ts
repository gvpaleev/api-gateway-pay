import { IsString } from "class-validator";


export class GetBalanceDto {

    @IsString()
    uid:string;

    
}