import { Controller, Get, Req, Res, Post, Body, Query, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {
    }

    @Get('')
    async getArticles(@Res() res) {
       const articles = await this.articlesService.getArticles();
       res.json(articles);
    }

    @Post('')
    async createArticle(@Req() req, @Res() res, @Body() body) {
        const article = await this.articlesService.create(body);
        res.json(article);
    }

    @Get(':articleId')
    async getArticleById(@Req() req, @Res() res, @Param() param) {
       const article = await this.articlesService.getArticleById(param.articleId);
       res.json(article);
    }
}
