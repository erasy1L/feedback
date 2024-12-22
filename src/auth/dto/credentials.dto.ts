import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CredentialsDto {
  @ApiProperty({
    description: 'Email',
    example: 'example@mail.com',
  })
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @ApiProperty({
    description: 'Password',
  })
  @IsNotEmpty({ message: 'password is required' })
  password: string;

  @IsOptional()
  avatar?: string;
}
