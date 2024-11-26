import { ApiProperty } from '@nestjs/swagger';

export class PokemonTypeDto {
  @ApiProperty({ description: 'Pokemon name' })
  name: string;
  @ApiProperty({ description: 'Pokemon id' })
  id: number;
}
