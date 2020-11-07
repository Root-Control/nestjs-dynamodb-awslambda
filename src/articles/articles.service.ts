import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';

import { IArticle } from './interfaces/article.interface';
import { ArticleSchema } from './schema/article.schema';

@Injectable()
export class ArticlesService {
    private readonly mapper = new DataMapper({ client: new DynamoDB() });

    constructor() {

    }

    async create(article: Partial<IArticle>, user?): Promise<IArticle> {
        const newArticle: IArticle = Object.assign(new ArticleSchema, article);
        newArticle.creatorId = user ? user._id: '';

        try {
            return await this.mapper.put(newArticle);
        } catch (ex) {
            throw new HttpException(ex, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async getArticles(): Promise<IArticle[]> {
        
        const articles: IArticle[] = [];
        try {
            for await (const article of this.mapper.scan(ArticleSchema)) {
                articles.push(article);
            }
            return articles;
        } catch (ex) {
            throw new HttpException(ex, HttpStatus.UNPROCESSABLE_ENTITY);
        }
        
    }

    async getArticleById(articleId: string): Promise<IArticle> {
        try {
            const findById = Object.assign(new ArticleSchema, { _id: articleId });
            return await this.mapper.get(findById);
        } catch (ex) {
            if (ex.itemSought) throw new HttpException({ message: 'item not found' }, HttpStatus.UNPROCESSABLE_ENTITY);
            else throw new HttpException(ex, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

   
}
