import { ApiProperty } from '@nestjs/swagger';

export class PokemonDto {
  @ApiProperty({ description: 'Pokemon id' })
  id: number;
  @ApiProperty({ description: 'Pokemon name' })
  name: string;
  @ApiProperty({ description: 'Pokemon types' })
  types: string[];
  @ApiProperty({ description: 'Pokemon abilities' })
  abilities: string[];
  @ApiProperty({ description: 'Number of abilities' })
  numberOfAbilities: number;
}
