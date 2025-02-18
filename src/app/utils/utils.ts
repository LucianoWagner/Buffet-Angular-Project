import {Menu, MenuComponent} from '../models/menu.model';

export function findComponent(componentsList: MenuComponent[], type: string) {
  return componentsList.find((component) => component.type === type);
}

export function findComponentList(componentsList: MenuComponent[], type: string) {
  return componentsList.filter((component) => component.type === type);
}
