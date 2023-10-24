export const models: {
  name?: string;
  path: string;
  position?: [number, number, number];
  scale?: [number, number, number];
  rotate?: [number, number, number];
}[] = [
  {
    name: 'Glass',
    path: '/models/glass.glb',
    position: [3.5, 0, -3.5],
    scale: [0.5, 0.5, 0.5],
  },
  {
    name: 'Flowers',
    path: '/models/flowers.glb',
    position: [3.5, 0, -3],
    scale: [0.5, 0.5, 0.5],
  },
  {
    name: 'Straw',
    path: '/models/straw.glb',
    position: [5, 0, -3],
    scale: [0.5, 0.5, 0.5],
  },
  {
    name: 'Fork',
    path: '/models/fork.glb',
    position: [2.5, 0, -3],
    scale: [0.5, 0.5, 0.5],
  },
  {
    name: 'Piece cake',
    path: '/models/piece_cake.glb',
    position: [2, 0, -3],
    scale: [0.5, 0.5, 0.5],
  },
  {
    name: 'Chicken child',
    path: '/models/chicken_child.glb',
    rotate: [0, 0, 0],
  },
  {
    name: 'Turn table',
    path: '/models/turntable.glb',
    position: [0, 0.005, 0],
  },
  {
    name: 'Blank cake',
    path: '/models/blank_cake.glb',
  },
];
