import { IsNotEmpty, IsString } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  @IsString()
  readonly receiver: string;

  @IsNotEmpty()
  @IsString()
  readonly conversation: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
