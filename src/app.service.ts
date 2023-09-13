import { Injectable} from '@nestjs/common';
import { GetAddresDto } from './dto/get-address.dto';
import { GetBalanceDto } from './dto/get-balance.dto';
import { InjectModel } from 'nestjs-typegoose';
import { AccountModel } from './model/account.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppService {

  constructor(
    @InjectModel(AccountModel) private readonly accountModel: ModelType<AccountModel>,
    private readonly httpService: HttpService
  ){}
 
  
  

  async getAddress(dto: GetAddresDto){
    

    let account = (await this.accountModel.find({uid: dto.uid}).exec())[0];

    if(!account){

      let moneroWalletData = (await this.httpService.axiosRef('http://127.0.0.1:3001/wallet/newAddres')).data
      
      return await this.accountModel.create({
        uid:dto.uid,
        moneroWalletData
      })

    }
    
    return account;
  }

  async getBalance(dto: GetBalanceDto){
    return 'GetBalanceDto'
  }
}
