import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({
    type: String,
    required: false,
  })
  readonly email: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'jojo',
  })
  readonly username: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'aaa',
  })
  @IsNotEmpty()
  readonly password: string;

  readonly picture: string;
}
