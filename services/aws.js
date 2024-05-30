import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

class S3Service {
    #s3Client;

    constructor() {
        this.#s3Client = new S3Client({
            region: process.env.S3_REGION,
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            }
        });
    }

    async send(weatherResult) {
        try {
            const command = new PutObjectCommand({
                Bucket: process.env.S3_BUCKET_NAME,
                Key: `${ new Date().toISOString() }.json`,
                Body: JSON.stringify(weatherResult),
            });

            await this.#s3Client.send(command);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default new S3Service();
