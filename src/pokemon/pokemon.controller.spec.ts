import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../pokemon/interfaces/pokemon.interface';
import { PokemonTypeResponse } from './interfaces/pokemon.type.response';

describe('PokemonController', () => {
  let controller: PokemonController;
  let service: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        {
          provide: PokemonService,
          useValue: {
            getRandomPokemon: jest.fn(),
            getPokemonByName: jest.fn(),
            getPokemonByType: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRandomPokemon', () => {
    it('should return a random Pokemon', async () => {
      const result: Pokemon = {
        id: 1,
        name: 'bulbasaur',
        types: ['grass'],
        abilities: ['overgrow'],
        numberOfAbilities: 1,
      };
      jest.spyOn(service, 'getRandomPokemon').mockResolvedValue(result);

      expect(await controller.getRandomPokemon()).toBe(result);
    });
  });

  describe('getPokemon', () => {
    it('should return a Pokemon by name', async () => {
      const result: Pokemon = {
        id: 1,
        name: 'bulbasaur',
        types: ['grass'],
        abilities: ['overgrow'],
        numberOfAbilities: 1,
      };
      jest.spyOn(service, 'getPokemonByName').mockResolvedValue(result);

      expect(await controller.getPokemon('bulbasaur')).toBe(result);
    });
  });

  describe('getPokemonByType', () => {
    it('should return a list of Pokemon by type', async () => {
      const result: PokemonTypeResponse[] = [{ name: 'bulbasaur', id: 1 }];
      jest.spyOn(service, 'getPokemonByType').mockResolvedValue(result);

      expect(await controller.getPokemonByType('grass')).toBe(result);
    });
  });
});
