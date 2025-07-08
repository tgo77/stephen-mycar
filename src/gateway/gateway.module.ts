import { Module } from '@nestjs/common';
import { MyCarGateway } from './gateway';

@Module({
  providers: [MyCarGateway],
})
export class GatewayModule {}
