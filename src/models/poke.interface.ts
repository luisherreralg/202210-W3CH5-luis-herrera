export interface IPokes {
  count: number;
  next: string;
  previous: string | null;
  results: [];
}

export interface IResults {
  url: string;
  name: string;
}
