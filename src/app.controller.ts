import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GetAddresDto } from './dto/get-address.dto';
import { GetBalanceDto } from './dto/get-balance.dto';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService) {}



  @Post('getBalance')
  async getBalance(@Body() dto: GetBalanceDto){
    
    return this.appService.getBalance(dto);
    
  }

  @Post('getAddress')
  async getAddress(@Body() dto: GetAddresDto){
    
    return this.appService.getAddress(dto);
    
  }

  @Post('pay')
  async pay(){
    
  }

}
