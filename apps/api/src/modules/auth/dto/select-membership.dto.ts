import { IsJWT, IsString } from 'class-validator';

export class SelectMembershipDto {
  @IsJWT()
  loginToken!: string;

  @IsString()
  userRoleId!: string;
}
