import { Injectable } from '@nestjs/common';
import { GetBalanceDto } from './dto/get-balance.dto';
import { InjectModel } from 'nestjs-typegoose';
import { AccountModel } from './model/account.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { HttpService } from '@nestjs/axios';
import { getAddressForReplenishmentDto } from './dto/address-for-replenishment.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(AccountModel)
    private readonly accountModel: ModelType<AccountModel>,
    private readonly httpService: HttpService,
  ) {}

  async getAddressForReplenishment(dto: getAddressForReplenishmentDto) {
    let addressForReplenishment = (
      await this.httpService.axiosRef(
        'http://127.0.0.1:3001/wallet/createSubAccountForReplenishment',
        {
          params: {
            accountIndex: dto.moneroAccountIndex,
          },
        },
      )
    ).data;

    return await this.accountModel.create({
      uid: dto.uid,
      addressForReplenishment,
    });
  }

  async getBalance(dto: GetBalanceDto) {
    return 'GetBalanceDto';
  }
}
