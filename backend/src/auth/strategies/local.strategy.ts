import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserDto } from '@src/users/user.dto';

//Une strategy = Une méthode d'authentification

// ! Cette stratégie n'est pas nécessaire mais je la garde afin de conserver un exemple de stratégie locale
// ? Si jamais je souhaite l'enlever, il me suffira de mettre la fonction authService.generateToken() directement dans la fonction validateUser() du service et appelé cette dernière depuis mon controller

@Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) { | par défaut si on renseigne local dans le PassportGuard
export class LocalStrategy extends PassportStrategy(Strategy, 'my-local') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    return await this.authService.validateUser({
      username,
      password,
    } as UserDto);
  }
}
