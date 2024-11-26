import { Pokemon } from '../interfaces/pokemon.interface';
import { PokemonAbility } from '../interfaces/pokemon.ability.interface';
import { PokemonType } from '../interfaces/pokemon.type.interface';

export class PokemonTransformer {
  static transform(rawData: any): Pokemon {
    return {
      id: rawData.id,
      name: rawData.name,
      types: rawData.types.map((t: PokemonType) => t.type.name),
      abilities: rawData.abilities.map((a: PokemonAbility) => a.ability.name),
      numberOfAbilities: rawData.abilities.length,
    };
  }
}
