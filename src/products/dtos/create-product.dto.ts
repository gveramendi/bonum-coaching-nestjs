import {IsNotEmpty, IsNumber, IsString, IsUrl, MaxLength, MinLength} from "class-validator";

export class CreateProductDto {
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  @IsNotEmpty()
  readonly code: string;

  @IsString()
  @MaxLength(64)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MaxLength(255)
  readonly description: string;

  @IsString()
  @IsUrl(undefined, { message: 'Image URL is not valid.' })
  readonly image: string;

  @IsNumber()
  readonly price: number;
}