import { Body, Controller, Get } from '@nestjs/common';
import { MoneroService } from './monero.service';
import { getAddressForReplenishmentDto } from './dto/address-for-replenishment.dto';

@Controller('monero')
export class MoneroController {
    constructor(
        private readonly moneroService:MoneroService
    ){}

    @Get('getAddressForReplenishment')
    async getAddressForReplenishment(@Body() dto :getAddressForReplenishmentDto){
        return this.moneroService.getAddressForReplenishment(dto)
    }
}
