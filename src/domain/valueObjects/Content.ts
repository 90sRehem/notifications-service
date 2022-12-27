export class Content {
  private readonly _content: string;

  constructor(value: string) {
    const isContentLengthValid = this.validateContentLength(value);

    if (!isContentLengthValid) {
      throw new Error(
        'O conteúdo deve ter no mínimo 5 e no máximo 255 caracteres.',
      );
    }

    this._content = value;
  }

  public get content(): string {
    return this._content;
  }

  private validateContentLength(value: string): boolean {
    return value.length >= 5 && value.length <= 255;
  }
}
