export const models: {
  name?: string;
  path: string;
  thumbnail?: string;
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
}[] = [
  {
    name: 'Glass',
    thumbnail: '/img/glass.jpg',
    path: '/models/glass.glb',
    position: [3.5, 0, -3.5],
    scale: [0.5, 0.5, 0.5],
  },
  {
    name: 'Flowers',
    thumbnail: '/img/flowers_decor.jpg',
    path: '/models/flowers_decor.glb',
    position: [-5, 0, -3],
    scale: [0.5, 0.5, 0.5],
    rotation: [-0.2, 0.5, 0],
  },
  {
    name: 'Straw',
    thumbnail: '/img/straw.jpg',
    path: '/models/straw.glb',
    position: [3.2, 0, -3],
    scale: [0.5, 0.5, 0.5],
  },
  {
    name: 'Fork',
    thumbnail: '/img/fork.jpg',
    path: '/models/fork.glb',
    position: [2.5, 0, -3],
    scale: [0.5, 0.5, 0.5],
  },
  {
    name: 'Piece cake',
    thumbnail: '/img/piece_cake.jpg',
    path: '/models/piece_cake.glb',
    position: [2, 0, -3],
    scale: [0.5, 0.5, 0.5],
  },
  {
    name: 'Chicken child',
    thumbnail: '/img/chicken_child.jpg',
    path: '/models/chicken_child.glb',
    rotation: [0, 0, 0],
    position: [0, 1.6, 0],
  },
  {
    name: 'Blank cake',
    thumbnail: '/img/blank_cake_circle.jpg',
    path: '/models/blank_cake_circle.glb',
    position: [0, 1.1, 0],
  },
  {
    name: 'Baby shark',
    thumbnail: '/img/baby_shark.jpg',
    path: '/models/baby_shark.glb',
    position: [0, 1.1, 0.2],
    scale: [0.8, 0.8, 0.8],
  },
  {
    name: 'Turn table',
    thumbnail: '/img/turntable.jpg',
    path: '/models/turntable.glb',
    position: [0, 0.005, 0],
  },
];
