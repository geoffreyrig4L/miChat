import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  get(): void {
    console.log('sign in');
  }

  create(): void {
    console.log('sign up');
  }
}
