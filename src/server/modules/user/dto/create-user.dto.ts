import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsEmail()
  @MinLength(4)
  @MaxLength(50)
  readonly email: string;

  @MinLength(8, { message: 'Password is too short' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  readonly password?: string;

  @IsOptional()
  @IsString()
  readonly provider?: string;

  @IsOptional()
  @IsString()
  readonly provider_id?: string;
}
