import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// export class PassportLocalGuard extends AuthGuard('local') {} | par défaut
export class PassportLocalGuard extends AuthGuard('my-local') {}
