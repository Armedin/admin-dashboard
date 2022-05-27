import { Model } from "mongoose";
import {
  Logger,
  ConflictException,
  InternalServerErrorException,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserRoleEnum } from "./enums/user-role.enum";
import { RegisterDto } from "./dto/register.dto";
import { BcryptService } from "../../utilities/bcrypt/bcrypt.service";

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private bcryptService: BcryptService
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const salt = await this.bcryptService.genSalt(10);
    const hashedPassword = await this.bcryptService.hash(
      registerDto.password,
      salt
    );

    const createdUser = await this.createUser({
      ...registerDto,
      password: hashedPassword,
    });

    return createdUser;
  }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    try {
      const now = new Date(Date.now()).toUTCString();
      const createdUser = new this.userModel({
        ...createUserDto,
        registered_at: now,
        last_login_at: now,
      });
      await createdUser.save();
      return createdUser;
    } catch (e) {
      // duplicate email error code
      if (e.code === 11000) {
        throw new ConflictException(
          "This email address has already been used."
        );
      } else {
        this.logger.error("Error creating user. Details:", e);
        throw new InternalServerErrorException(e);
      }
    }
  }

  async findOrCreateUser(
    data: any,
    createUserDto: CreateUserDto
  ): Promise<User> {
    const user = await this.userModel.findOne(data).exec();
    if (!user) {
      const createdUser = await this.createUser({
        ...createUserDto,
      });

      return createdUser;
    }

    return user;
  }

  async update(id: string, user: User): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user);

    this.logger.log(
      `A user has been updated with ID: ${id} | Date: ${new Date().toLocaleDateString()}`
    );

    return updatedUser;
  }

  async findByEmail(email: string): Promise<any> {
    return this.userModel.findOne({ email });
  }

  async findByAccessToken(accessToken: string) {}
}
