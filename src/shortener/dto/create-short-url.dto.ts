import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';

export class CreateShortUrlDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(168)
  expirationTimeInHours: number;
}
