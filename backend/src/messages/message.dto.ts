import { IsNotEmpty, IsString } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  readonly sender: string;

  @IsNotEmpty()
  readonly receiver: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
