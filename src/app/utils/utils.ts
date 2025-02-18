import {Menu, MenuComponent} from '../models/menu.model';

export function findComponent(componentsList: MenuComponent[], type: string) {
  console.log('componentsList', componentsList);
  console.log('type', type);
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAA")
  return componentsList.find((component) => component.type === type);
}

export function findComponentList(componentsList: MenuComponent[], type: string) {
  return componentsList.filter((component) => component.type === type);
}
