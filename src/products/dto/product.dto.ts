import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsUrl()
  image: string;

  @IsNumber()
  price: number;

  @IsNotEmpty()
  description: string;

  @IsMongoId()
  creatorId: string;
}

export class UpdateProductDto {
  title?: string;

  @IsOptional()
  @IsUrl()
  image?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  description?: string;
}
