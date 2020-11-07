import { config } from 'aws-sdk';

config.update({ 
    accessKeyId: process.env.AWS_KEY, 
    secretAccessKey: process.env.AWS_SECRET, 
    region: process.env.REGION 
});

export const databaseProviders = [{
    provide: 'DYNAMO_DB',
    useFactory: async () => {
        try {
            return config;
        } catch (ex) {
            console.log(ex);
        }
    }
}];