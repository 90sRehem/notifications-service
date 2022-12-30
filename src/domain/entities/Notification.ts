import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'node:crypto';
import { Content } from 'src/domain/valueObjects/Content';
import { Replace } from 'src/helpers/replace';

// export interface INotificationProps {
//   content: Content;
//   category: string;
//   recipientId: string;
//   readAt?: Date | null;
//   createdAt: Date;
//   updatedAt?: Date;
//   canceledAt?: Date | null;
// }

export abstract class INotificationProps {
  @ApiProperty({
    example: '7ab25ee7-9650-47c8-897f-d2044c601743',
    description: 'The id of the recipient',
  })
  public recipientId: string;

  @ApiProperty({
    example: 'message',
    description: 'The category of the notification',
  })
  public category: string;

  @ApiProperty({
    example: 'Olá, tudo bem?',
    description: 'The content of the notification',
  })
  public content: Content;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
    description: 'The date when the notification was created',
  })
  public createdAt: Date;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
    description: 'The date when the notification was updated',
  })
  public updatedAt?: Date;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
    description: 'The date when the notification was read',
  })
  public readAt?: Date | null;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
    description: 'The date when the notification was canceled',
  })
  public canceledAt?: Date | null;
}

type NotificationProps = Replace<INotificationProps, { createdAt?: Date }>;

export class Notification {
  private _id: string;
  private _props: INotificationProps;

  constructor(props: NotificationProps, id?: string) {
    this._id = id ?? randomUUID();
    this._props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set recipientId(value: string) {
    this._props.recipientId = value;
  }

  public get recipientId(): string {
    return this._props.recipientId;
  }

  public set content(value: Content) {
    this._props.content = value;
  }

  public get content(): Content {
    return this._props.content;
  }

  public set category(value: string) {
    this._props.category = value;
  }

  public get category(): string {
    return this._props.category;
  }

  public read() {
    this._props.readAt = new Date();
  }

  public unread() {
    this._props.readAt = null;
  }

  public get readAt(): Date | null | undefined {
    return this._props.readAt;
  }

  public get createdAt() {
    return this._props.createdAt;
  }

  public get canceledAt(): Date | null | undefined {
    return this._props.canceledAt;
  }

  public cancel() {
    this._props.canceledAt = new Date();
  }
}
