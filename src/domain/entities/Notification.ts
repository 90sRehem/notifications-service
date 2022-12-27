import { randomUUID } from 'node:crypto';
import { Content } from 'src/domain/valueObjects/Content';
import { Replace } from 'src/helpers/replace';

interface INotificationProps {
  content: Content;
  category: string;
  recipientId: string;
  readAt?: Date | null;
  createdAt: Date;
  updatedAt?: Date;
}

export class Notification {
  private _id: string;
  private _props: INotificationProps;

  constructor(props: Replace<INotificationProps, { createdAt?: Date }>) {
    this._id = randomUUID();
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

  public set readAt(value: Date | null | undefined) {
    this._props.readAt = value;
  }

  public get readAt(): Date | null | undefined {
    return this._props.readAt;
  }

  public get createdAt() {
    return this._props.createdAt;
  }
}
