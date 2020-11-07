import { Module } from '@nestjs/common';
console.log(1);
import { DatabaseModule } from './@database';

import { AppController } from './app.controller';
import { AppService } from './app.service';

console.log(2);
import { ArticlesModule } from './articles';

@Module({
  imports: [DatabaseModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {

  }
}
