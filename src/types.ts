interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
}

export type SortType =  'asc' | 'desc';

export interface State {
  products : Product[],
  loading: boolean,
  error : null | string,
  filter:{
    page : number,
    sortType : SortType
  }
}