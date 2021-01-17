export interface IVideoConfig {
  name: string;
  videos: IVideoList;
}

export interface IVideoList {
  [key: string]: {
    start: number;
    milestones: number[];
    target: any | null;
  }
}

export const videoConfig: IVideoConfig[] = [
  {
    name: 'Brahms: Piano Concerto No. 2 in B-flat major',
    videos: {
      'BszBccYHuAk': {
        start: 1429,
        milestones: [
          46
        ],
        target: null,
      },
      'o6_lbrlehsg': {
        start: 1485,
        milestones: [
          38
        ],
        target: null,
      },
      'y4YqWXmF9Dg': {
        start: 1499,
        milestones: [
          38
        ],
        target: null,
      },
    }
  },
  {
    name: 'Rachmaninov: Prelude in G minor',
    videos: {
      'mxnL7UrkmY4': {
        start: 17,
        milestones: [
          46
        ],
        target: null,
      },
      'GhBXx-2PadM': {
        start: 3,
        milestones: [
          38
        ],
        target: null,
      },
    },
  }
];