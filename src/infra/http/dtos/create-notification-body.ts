import { IsNotEmpty, IsUUID, Length } from 'class-validator';
export class CreateNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  @Length(5, 255, {
    message(validationArguments) {
      return `O conteúdo deve ter no mínimo ${validationArguments.constraints[0]} e no máximo ${validationArguments.constraints[1]} caracteres.`;
    },
  })
  content: string;

  category: string;
}
