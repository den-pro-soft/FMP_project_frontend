export interface IDocumentTemplate {
  readonly id: number;
  name: string;
  readonly resource: string;
  readonly preview?: string;
  readonly type:string
}