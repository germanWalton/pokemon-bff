import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
