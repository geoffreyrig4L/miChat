import { IsNotEmpty } from 'class-validator';

export class ConversationDto {
  @IsNotEmpty()
  readonly friendCode;
}
