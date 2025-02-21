export const menuTypes: { label: string; value: string; icon: string }[] = [
  { label: 'Entrante', value: 'STARTER', icon: '@tui.pizza' },
  { label: 'Principal', value: 'MAIN_DISH', icon: '@tui.beef' },
  { label: 'Postre', value: 'DESSERT', icon: '@tui.ice-cream-bowl' },
  { label: 'Bebida', value: 'DRINK', icon: '@tui.cup-soda' },
];

export const navBarItems: {
  [key: string]: { label: string; href: string; icon: string }[];
} = {
  CLIENT: [
    { label: 'Productos', href: '/menus', icon: '@tui.store' },
    {
      label: 'Sugerencias',
      href: '/suggestions',
      icon: '@tui.lightbulb',
    },
  ],
  ADMIN: [
    { label: 'Menus', href: '/menus', icon: '@tui.notebook-text' },
    {
      label: 'Componentes',
      href: '/components',
      icon: '@tui.pizza',
    },

    {
      label: 'Comidas',
      href: '/foods',
      icon: '@tui.beef',
    },

    {
      label: 'Sugerencias',
      href: '/suggestions',
      icon: '@tui.lightbulb',
    },

    {
      label: 'Estadísticas',
      href: '/statistics',
      icon: '@tui.chart-no-axes-combined',
    },
    {
      label: 'Trabajadores',
      href: '/workers',
      icon: '@tui.book-user',
    },
  ],

  WORKER: [
    {
      label: 'Usuarios',
      href: '/users',
      icon: '@tui.users',
    },
    {
      label: 'Compras',
      href: '/purchases',
      icon: '@tui.package',
    },
    {
      label: 'Pagos',
      href: '/payments',
      icon: '@tui.tickets',
    },
    {
      label: 'Sugerencias',
      href: '/suggestions',
      icon: '@tui.lightbulb',
    },
  ],
};
