import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
  hash(plainText: string, salt: string | number): Promise<string> {
    return bcrypt.hash(plainText, salt);
  }

  compare(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }

  genSalt(rounds: number): Promise<string> {
    return bcrypt.genSalt(rounds);
  }
}
