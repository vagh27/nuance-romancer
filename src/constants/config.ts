export interface IVideoConfig {
  id: number;
  slug: string;
  name: string;
  videos: IVideoList;
}

export interface IVideoObject {
  start: number;
  milestones: number[];
  target?: any;
  status?: number;
  muted?: boolean;
}

export interface IVideoList {
  [key: string]: IVideoObject;
}

export const videoConfig: IVideoConfig[] = [
  {
    id: 0,
    slug: 'brahms-piano-concerto-2',
    name: 'Brahms: Piano Concerto No. 2 in B-flat major',
    videos: {
      'BszBccYHuAk': {
        start: 1429,
        milestones: [],
      },
      'o6_lbrlehsg': {
        start: 1485,
        milestones: [],
      },
      'y4YqWXmF9Dg': {
        start: 1499,
        milestones: [],
      },
      'n94vcKmDJwo': {
        start: 1387,
        milestones: [],
      }
    }
  },
  {
    id: 1,
    slug: 'rachmaninov-prelude',
    name: 'Rachmaninov: Prelude in G minor',
    videos: {
      'mxnL7UrkmY4': {
        start: 17,
        milestones: [],
      },
      // 'GhBXx-2PadM': {
      //   start: 3,
      //   milestones: [
      //     38
      //   ],
      // },
      'rQQHRC-T8WM': {
        start: 2,
        milestones: [],
      },
    },
  },

  {
    id: 2,
    slug: 'beethoven-string-quartet-15',
    name: 'String Quartet No. 15 in A Minor, Molto adagio',
    videos: {
      'iorsbZ2-NBI': {
        start: 0,
        milestones: [],
      },
      '6sj77dIxP0U': {
        start: 1,
        milestones: [],
      },
      'Yb_bs-JPyag': {
        start: 1,
        milestones: [],
      },
    },
  },

  {
    id: 3,
    slug: 'prokofiev-toccata',
    name: 'Prokofiev: Toccata',
    videos: {
      'b5ROxf7iNcY': {
        start: 21,
        milestones: [],
      },
      'KoMEaX75FkY': {
        start: 12,
        milestones: [],
      },
    },
  },

  {
    id: 4,
    slug: 'bartok-folk-dances',
    name: 'Bartok: Romainian Folk Dances',
    videos: {
      'Z50Ooqv1GFg': {
        start: 6,
        milestones: [],
      },
      '4HAIHSqiwAA': {
        start: 4,
        milestones: [],
      },
    },
  },

  {
    id: 5,
    slug: 'chopin-ballade-1',
    name: 'Chopin: Ballade No. 1 in G minor',
    videos: {
      'Ce8p0VcTbuA': {
        start: 2,
        milestones: [],
      },
      'bvtdjIIcgWQ': {
        start: 4,
        milestones: [],
      },
      // 'taY5oHleS4I': {
      //   start: 6,
      //   milestones: [
      //     38
      //   ],
      // },
      '3Ag-a76PQFg': {
        start: 15,
        milestones: [],
      },
      'BK42YaHaJ5M': {
        start: 5,
        milestones: [],
      },
    },
  },

  {
    id: 6,
    slug: 'prokofiev-piano-sonata-7-precipitato',
    name: 'Prokofiev: Piano Sonata No. 7 in B-flat min, Precipitato',
    videos: {
      'omx6jg82bJc': {
        start: 0,
        milestones: [],
      },
      '7U-L_n9tAJM': {
        start: 16,
        milestones: [],
      },
      'Zwji3k0v_AM': {
        start: 0,
        milestones: [],
      },
      'k-sg7VGUR-A': {
        start: 0,
        milestones: [],
      },
    },
  },
];
