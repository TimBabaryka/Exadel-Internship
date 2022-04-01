import { IMenuItem } from './menu-item.model';

export const MENU_CONFIG: IMenuItem[] = [
  {
    id: 'todo',
    title: 'Todo',
    route: '/todo',
    icon: 'listall',
  },
  {
    id: 'logout',
    title: 'Logout',
    route: '/logout',
    icon: 'logout',
  },
];
