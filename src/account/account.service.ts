import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { GetBalanceDto } from './dto/get-balance.dto';
import { InjectModel } from 'nestjs-typegoose';
import { AccountModel } from './model/account.model';
import { ModelType } from 'typegoose';
import { MoneroService } from 'src/monero/monero.service';

@Injectable()
export class AccountService {
    constructor(
        @InjectModel(AccountModel)
        private readonly accountModel: ModelType<AccountModel>,
        @Inject(forwardRef(() => MoneroService)) private readonly moneroService: MoneroService
        //  private readonly moneroService: MoneroService

    ){}

    async getBalance(dto: GetBalanceDto){
        let account =  await this.getAccount(dto.uid);

        await this.moneroService.updateBalance(account);
        
        return account
    }

    async getAccount(uid) {
        let account = await this.accountModel.findOne({ uid: uid }).exec();
        if(!account)
            return this.creatAccount(uid)
        return account
    }

    async creatAccount(uid){
        return await this.accountModel.create({
                  uid: uid,
                  balanceRub:0,
                  balanceMonero: 0
                });
    }
}
