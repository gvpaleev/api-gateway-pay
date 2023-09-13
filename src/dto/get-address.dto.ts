import { IsString } from "class-validator";


export class GetAddresDto {

    @IsString()
    uid:string;

    
}