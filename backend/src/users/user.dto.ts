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
    example: 'deadpool',
  })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsNotEmpty()
  readonly password: string;
}
