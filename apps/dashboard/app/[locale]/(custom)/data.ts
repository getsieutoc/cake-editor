export const models: {
  id: string;
  name?: string;
  path: string;
  thumbnail?: string;
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  isSelected?: boolean;
  annotations: string[];
}[] = [
  {
    id: '0',
    name: 'Glass',
    annotations: ['This is glass'],
    thumbnail: '/img/glass.jpg',
    path: '/models/glass.glb',
    position: [3.5, 0, -3.5],
    scale: [0.5, 0.5, 0.5],
  },
  {
    id: '1',
    name: 'Flowers',
    annotations: ['This is flowers'],
    thumbnail: '/img/flowers_decor.jpg',
    path: '/models/flowers_decor.glb',
    position: [-5, 0, -3],
    scale: [0.5, 0.5, 0.5],
    rotation: [-0.2, 0.5, 0],
  },
  {
    id: '2',
    name: 'Straw',
    annotations: ['This is straw!'],
    thumbnail: '/img/straw.jpg',
    path: '/models/straw.glb',
    position: [3.2, 0, -3],
    scale: [0.5, 0.5, 0.5],
  },
  {
    id: '3',
    name: 'Fork',
    annotations: ['This is fork'],
    thumbnail: '/img/fork.jpg',
    path: '/models/fork.glb',
    position: [2.5, 0, -3],
    scale: [0.5, 0.5, 0.5],
  },
  {
    id: '4',
    name: 'Piece cake',
    annotations: ['Piece cake is there!', 'Hello world!'],
    thumbnail: '/img/piece_cake.jpg',
    path: '/models/piece_cake.glb',
    position: [2, 0, -3],
    scale: [0.5, 0.5, 0.5],
  },
  {
    id: '5',
    name: 'Chicken child',
    annotations: ['This is a chicken child'],
    thumbnail: '/img/chicken_child.jpg',
    path: '/models/chicken_child.glb',
    rotation: [0, 0, 0],
    position: [0, 1.6, 0],
  },
  {
    id: '6',
    name: 'Blank cake',
    annotations: ['White cake with fragrant jam filling and custard cake'],
    thumbnail: '/img/blank_cake_circle.jpg',
    path: '/models/blank_cake_circle.glb',
    position: [0, 1.1, 0],
  },
  {
    id: '7',
    name: 'Baby shark',
    annotations: ['Complete cake baby shark'],
    thumbnail: '/img/baby_shark.jpg',
    path: '/models/baby_shark.glb',
    position: [0, 1.1, 0.2],
    scale: [0.8, 0.8, 0.8],
  },
  {
    id: '8',
    name: 'Turn table',
    annotations: [''],
    thumbnail: '/img/turntable.jpg',
    path: '/models/turntable.glb',
    position: [0, 0.005, 0],
  },
];
