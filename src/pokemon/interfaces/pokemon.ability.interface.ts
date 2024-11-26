export type Ability = {
  name: string;
  url: string;
};

export interface PokemonAbility {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}
