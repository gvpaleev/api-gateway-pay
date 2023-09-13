import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './configs/mongo.config';
import { AccountModel } from './model/account.model';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:getMongoConfig
    }),
    TypegooseModule.forFeature([  
      {
        typegooseClass:AccountModel,
        schemaOptions:{
          collection:'account'
        }
      }
    ]),
    HttpModule
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
