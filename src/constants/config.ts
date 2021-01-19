export interface IVideoConfig {
  id: number;
  slug: string;
  name: string;
  videos: IVideoList;
}

export interface IVideoList {
  [key: string]: {
    start: number;
    milestones: number[];
    target?: any;
    status?: number;
    muted?: boolean;
  }
}

export const videoConfig: IVideoConfig[] = [
  {
    id: 0,
    slug: 'brahms-pc2',
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
  }
];