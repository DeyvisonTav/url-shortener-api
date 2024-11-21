import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { Readable } from 'stream';

@Injectable()
export class S3Service {
  private readonly s3 = new S3Client({ region: process.env.AWS_REGION });
  private readonly bucketName = process.env.AWS_BUCKET_NAME;

  async upload(key: string, body: any) {
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Body: JSON.stringify(body),
      ContentType: 'application/json',
    };
    await this.s3.send(new PutObjectCommand(params));
  }

  async download(key: string) {
    const params = { Bucket: this.bucketName, Key: key };
    const data = await this.s3.send(new GetObjectCommand(params));
    return JSON.parse(await this.streamToString(data.Body as Readable));
  }

  private async streamToString(stream: Readable) {
    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString('utf-8');
  }
}
