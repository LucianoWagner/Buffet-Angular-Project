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


export interface MenuUpdate {
  name: string;
  isVegetarian: boolean;
  date: string;
  price: number;
  stock: number;
  starter?: number;
  mainDish?: number;
  dessert?: number;
  drink?: number;


}
