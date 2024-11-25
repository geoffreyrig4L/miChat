import { IsNotEmpty } from 'class-validator';

export class UserDto {
  readonly email: string;
  @IsNotEmpty()
  readonly username: string;
  @IsNotEmpty()
  readonly password: string;
}
