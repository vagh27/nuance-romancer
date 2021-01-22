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
        milestones: [
          46
        ],
      },
      'o6_lbrlehsg': {
        start: 1485,
        milestones: [
          38
        ],
      },
      'y4YqWXmF9Dg': {
        start: 1499,
        milestones: [
          38
        ],
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
        milestones: [
          46
        ],
      },
      'GhBXx-2PadM': {
        start: 3,
        milestones: [
          38
        ],
      },
    },
  },
  {
    id: 2,
    slug: 'chopin-ballade-1',
    name: 'Chopin: Ballade No. 1 in G minor',
    videos: {
      'Ce8p0VcTbuA': {
        start: 2,
        milestones: [
          46
        ],
      },
      'bvtdjIIcgWQ': {
        start: 4,
        milestones: [
          38
        ],
      },
      // 'taY5oHleS4I': {
      //   start: 6,
      //   milestones: [
      //     38
      //   ],
      // },
      '3Ag-a76PQFg': {
        start: 15,
        milestones: [
          38
        ],
      },
      'BK42YaHaJ5M': {
        start: 5,
        milestones: [
          38
        ],
      },
    },
  },
  {
    id: 3,
    slug: 'beethoven-string-quartet-15',
    name: 'String Quartet No. 15 in A Minor, Op. 132: III. Molto adagio',
    videos: {
      'iorsbZ2-NBI': {
        start: 0,
        milestones: [
          46
        ],
      },
      '6sj77dIxP0U': {
        start: 1,
        milestones: [
          38
        ],
      },
      'Yb_bs-JPyag': {
        start: 1,
        milestones: [
          38
        ],
      },
    },
  }
];
