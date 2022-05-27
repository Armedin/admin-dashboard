import { User } from "../../user/schemas/user.schema";
import { JwtDto } from "./jwt.dto";

export class LoginResponseDto extends JwtDto {
  user: User;
}
