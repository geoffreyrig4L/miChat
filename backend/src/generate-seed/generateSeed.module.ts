import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@src/schemas/User.schema';
import { GenerateSeedService } from './generateSeed.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [GenerateSeedService],
  exports: [GenerateSeedService],
})
export class GenerateSeedModule {}
