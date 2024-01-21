import { Content } from './Content';

describe('Content', () => {
  it('should be able to create a new content', () => {
    const content = new Content('Hello World!');
    expect(content.content).toBe('Hello World!');
  });

  it('should not be able to create a new content with less than 5 characters', () => {
    expect(() => new Content('')).toThrow(
      'O conteúdo deve ter no mínimo 5 e no máximo 255 caracteres.',
    );
  });

  it('should not be able to create a new content with more than 255 characters', () => {
    expect(() => new Content('a'.repeat(256))).toThrow(
      'O conteúdo deve ter no mínimo 5 e no máximo 255 caracteres.',
    );
  });
});
