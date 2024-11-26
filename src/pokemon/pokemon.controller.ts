import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HttpErrorInterceptor } from '../interceptors/http-error.interceptor';
import { StandardResponseInterceptor } from '../interceptors/standard-response.interceptor';
import { Pokemon } from '../pokemon/interfaces/pokemon.interface';
import { PokemonTypeDto } from './dto/pokemon-type.dto';
import { PokemonDto } from './dto/pokemon.dto';
import { PokemonTypeResponse } from './interfaces/pokemon.type.response';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
@UseInterceptors(HttpErrorInterceptor, StandardResponseInterceptor)
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  @Get('/random')
  @ApiOperation({ summary: 'Get a random Pokemon' })
  @ApiResponse({
    status: 200,
    description: 'Pokemon',
    type: [PokemonDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Not found.',
  })
  async getRandomPokemon(): Promise<Pokemon> {
    return this.pokemonService.getRandomPokemon();
  }

  @Get('/:name')
  @ApiOperation({ summary: 'Get a Pokemon by name' })
  @ApiResponse({
    status: 200,
    description: 'Pokemon',
    type: [PokemonDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Not found.',
  })
  async getPokemon(@Param('name') name: string): Promise<Pokemon> {
    return this.pokemonService.getPokemonByName(name);
  }

  @Get('/type/:type')
  @ApiOperation({ summary: 'Get Pokemon types' })
  @ApiResponse({
    status: 200,
    description: 'Pokemon',
    type: [PokemonTypeDto],
  })
  @ApiResponse({
    status: 404,
    description: 'Not found.',
  })
  async getPokemonByType(
    @Param('type') type: string,
  ): Promise<PokemonTypeResponse[]> {
    return this.pokemonService.getPokemonByType(type);
  }
}
