import { ApiProperty } from '@nestjs/swagger';

export abstract class CountFromRecipientResponse {
  @ApiProperty({
    example: 1,
    description: 'The number of notifications from recipient',
  })
  count: number;
}
