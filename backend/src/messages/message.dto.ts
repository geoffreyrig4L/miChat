import { IsNotEmpty, IsString } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  readonly sender: string;

  @IsNotEmpty()
  readonly receiver: string;

  @IsNotEmpty()
  readonly conversation: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;
}
