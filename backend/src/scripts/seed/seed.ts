import { NestFactory } from '@nestjs/core';
import { GenerateSeedService } from '@src/generate-seed/generateSeed.service';
import { SeedModule } from './seed.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);

  const seedService = app.get(GenerateSeedService);

  await seedService.seedUsers(10);
  console.log('Seeding complete.');

  await app.close();
}
bootstrap();
