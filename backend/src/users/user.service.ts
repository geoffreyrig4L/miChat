import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  create(): void {
    console.log('Hello World!');
  }
}
