import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
    imports: [],
    controllers: [ArticlesController],
    providers: [
        ArticlesService
    ],
    exports: [
    ]
})
export class ArticlesModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {

    }
}