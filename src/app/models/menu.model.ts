export interface Menu {
  id?: number;
  name:string;
  vegetarian: boolean;
  date: string;
  price:number;
  stock:number;
  components: MenuComponent[];
}


export interface MenuComponent {
  id?: number;
  name: string;
  imageUrl?: string;
  type: string;
}
