// import { UserDto } from 'src/users/user.dto';

import { IsNotEmpty } from 'class-validator';

export class ConversationDto {
  @IsNotEmpty()
  readonly users: string[];
}
