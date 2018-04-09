export interface IDocumentTemplate {
  readonly id: number;
  readonly name: string;
  readonly template: string;
  readonly preview?: string;
  readonly added_by: string;
  readonly date_added: string;
  readonly type: string;
}