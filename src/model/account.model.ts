
import { Prop } from "@typegoose/typegoose";
import { TimeStamps, Base } from "@typegoose/typegoose/lib/defaultClasses";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";


class MoneroWalletData{
	@IsString()
	@Prop({unique:true})
	address:string;

	@IsNumber()
	@Prop({unique:true})
	index:Number;

	@IsNumber()
	actualBalance:Number;

	@IsNumber()
	userBalance:Number;
}

export interface AccountModel extends Base{};
export class AccountModel extends TimeStamps{

	@IsString()
	@Prop({unique:true})
	uid:string;


	@Type(()=>MoneroWalletData)
	@Prop({type:()=>MoneroWalletData, _id:false})
	moneroWalletData: MoneroWalletData;
	
	// @IsOptional()
	// @Prop()
	// balanceRub?: string;





	
}