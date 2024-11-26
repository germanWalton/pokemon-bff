import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { PokemonService } from './pokemon.service';
import { PokemonTransformer } from './transformers/pokemon.transformer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpService: HttpService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('https://pokeapi.co/api/v2'),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    httpService = module.get<HttpService>(HttpService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPokemonByName', () => {
    it('should return a transformed Pokemon object', async () => {
      const mockData = {
        id: 1,
        name: 'bulbasaur',
        types: [{ type: { name: 'grass' } }],
        abilities: [{ ability: { name: 'overgrow' } }],
      };

      const mockResponse: AxiosResponse = {
        data: mockData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: {} as any },
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));
      jest.spyOn(PokemonTransformer, 'transform').mockReturnValue({
        id: 1,
        name: 'bulbasaur',
        types: ['grass'],
        abilities: ['overgrow'],
        numberOfAbilities: 1,
      });
      jest.spyOn(cacheManager, 'get').mockResolvedValue(null);
      jest.spyOn(cacheManager, 'set').mockResolvedValue(undefined);

      const result = await service.getPokemonByName('bulbasaur');
      expect(result).toEqual({
        id: 1,
        name: 'bulbasaur',
        types: ['grass'],
        abilities: ['overgrow'],
        numberOfAbilities: 1,
      });
    });
  });

  describe('getPokemonByType', () => {
    it('should return a list of PokemonTypeResponse', async () => {
      const mockData = {
        pokemon: [
          {
            pokemon: {
              name: 'bulbasaur',
              url: 'https://pokeapi.co/api/v2/pokemon/1/',
            },
          },
        ],
      };

      const mockResponse: AxiosResponse = {
        data: mockData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: {} as any },
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

      const result = await service.getPokemonByType('grass');
      expect(result).toEqual([{ name: 'bulbasaur', id: 1 }]);
    });
  });

  describe('getRandomPokemon', () => {
    it('should return a transformed Pokemon object', async () => {
      const mockData = {
        id: 1,
        name: 'bulbasaur',
        types: [{ type: { name: 'grass' } }],
        abilities: [{ ability: { name: 'overgrow' } }],
      };

      const mockResponse: AxiosResponse = {
        data: mockData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: {} as any },
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));
      jest.spyOn(PokemonTransformer, 'transform').mockReturnValue({
        id: 1,
        name: 'bulbasaur',
        types: ['grass'],
        abilities: ['overgrow'],
        numberOfAbilities: 1,
      });

      const result = await service.getRandomPokemon();
      expect(result).toEqual({
        id: 1,
        name: 'bulbasaur',
        types: ['grass'],
        abilities: ['overgrow'],
        numberOfAbilities: 1,
      });
    });
  });
});
