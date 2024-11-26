import { HttpService } from '@nestjs/axios';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Pokemon } from './interfaces/pokemon.interface';
import { PokemonTypeResponse } from './interfaces/pokemon.type.response';
import { PokemonTransformer } from './transformers/pokemon.transformer';
import { PokemonEntry } from './interfaces/pokemon.entry.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class PokemonService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  private getBaseUrl(): string {
    return this.configService.get<string>('POKEAPI_BASE_URL');
  }

  async getPokemonByName(name: string): Promise<Pokemon> {
    try {
      const cacheKey = `pokemon-${name}`;
      const cachedData = await this.cacheManager.get<Pokemon>(cacheKey);

      if (cachedData) {
        return cachedData;
      }

      const baseUrl = this.getBaseUrl();
      const { data } = await firstValueFrom(
        this.httpService.get(`${baseUrl}/pokemon/${name.toLowerCase()}`),
      );
      const transformedData = PokemonTransformer.transform(data);
      await this.cacheManager.set(cacheKey, transformedData, 600000);
      return transformedData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getPokemonByType(type: string): Promise<PokemonTypeResponse[]> {
    try {
      const cacheKey = `pokemon-type-${type}`;
      const cachedData = await this.cacheManager.get<PokemonTypeResponse[]>(
        cacheKey,
      );
      if (cachedData) {
        return cachedData;
      }
      const baseUrl = this.getBaseUrl();
      const { data } = await firstValueFrom(
        this.httpService.get(`${baseUrl}/type/${type.toLowerCase()}`),
      );

      const transformedData = data.pokemon.map((p: PokemonEntry) => {
        const urlParts: string[] = p.pokemon.url.split('/');
        const id: number = parseInt(urlParts[urlParts.length - 2]);
        return { name: p.pokemon.name, id: id };
      });
      await this.cacheManager.set(cacheKey, transformedData, 600000);
      return transformedData;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getRandomPokemon(): Promise<Pokemon> {
    try {
      const baseUrl = this.getBaseUrl();
      const randomId = Math.floor(Math.random() * 898) + 1;
      const { data } = await firstValueFrom(
        this.httpService.get(`${baseUrl}/pokemon/${randomId}`),
      );
      return PokemonTransformer.transform(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
