import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ example: 'f4a3b7c0-8e5a-4b8c-9b9c-8d6b5a4c3b2a' })
  recipientId: string;

  @IsNotEmpty()
  @Length(5, 255, {
    message(validationArguments) {
      return `O conteúdo deve ter no mínimo ${validationArguments.constraints[0]} e no máximo ${validationArguments.constraints[1]} caracteres.`;
    },
  })
  @ApiProperty({ example: 'Olá, tudo bem?' })
  content: string;

  @ApiProperty({ example: 'message' })
  category: string;
}
