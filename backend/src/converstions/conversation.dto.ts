import { UserDto } from 'src/users/user.dto';

export class ConversationDto {
  readonly users: UserDto[];
}
