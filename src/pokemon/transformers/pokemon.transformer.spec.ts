import { PokemonTransformer } from '../transformers/pokemon.transformer';
import { Pokemon } from '../interfaces/pokemon.interface';

describe('PokemonTransformer', () => {
  it('should transform raw data into a Pokemon object', () => {
    const rawData = {
      id: 1,
      name: 'Bulbasaur',
      types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
      abilities: [
        { ability: { name: 'overgrow' } },
        { ability: { name: 'chlorophyll' } },
      ],
    };

    const expectedPokemon: Pokemon = {
      id: 1,
      name: 'Bulbasaur',
      types: ['grass', 'poison'],
      abilities: ['overgrow', 'chlorophyll'],
      numberOfAbilities: 2,
    };

    const transformedPokemon = PokemonTransformer.transform(rawData);

    expect(transformedPokemon).toEqual(expectedPokemon);
  });
});
