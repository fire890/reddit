import { subHours, subDays } from 'date-fns';

export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
}

export type PostCategory = '정치' | '투자' | '연예' | '뻘글';
export type TimeRange = '실시간' | '오늘' | '이번 주';

export interface Post {
  id: string;
  author: string;
  originalTitle: string;
  originalContent: string;
  translatedTitle: string;
  translatedContent: string;
  upvotes: number;
  commentsCount: number;
  createdAt: string;
  category: PostCategory;
}

const now = new Date();

const mockPosts: Post[] = [
  {
    id: '1',
    author: 'u/PlantLover99',
    originalTitle: "I built a self-watering plant pot with a Raspberry Pi and now I can't stop.",
    originalContent: "Hey everyone! Just wanted to share a little project I've been working on for a few weeks. It's a self-watering plant pot controlled by a Raspberry Pi.\nI love having plants, but I'm notoriously bad at remembering to water them. So, I decided to automate the process. It uses a moisture sensor to detect the soil's water level, and if it gets too dry, a small pump automatically waters the plant. Now my green friends are always happy!",
    translatedTitle: '라즈베리 파이로 자동 급수 화분을 만들었는데, 이제 멈출 수가 없네요.',
    translatedContent:
      '안녕하세요 여러분! 몇 주 동안 작업해 온 작은 프로젝트를 공유하고 싶었어요. 바로 라즈베리 파이로 제어되는 자동 급수 화분입니다.\n저는 식물을 키우는 것을 좋아하지만, 물 주는 것을 잊어버리는 것으로 악명이 높죠. 그래서 이 과정을 자동화하기로 결심했습니다. 토양 수분 센서를 사용해서 흙의 수분 레벨을 감지하고, 너무 건조해지면 작은 펌프가 자동으로 물을 줍니다. 이제 제 초록 친구들이 항상 행복하게 지낼 수 있어요!',
    upvotes: 1254,
    commentsCount: 88,
    createdAt: subHours(now, 3).toISOString(),
    category: '뻘글',
  },
  {
    id: '2',
    author: 'u/SpaceExplorer21',
    originalTitle: "What's a scientific 'myth' that you're tired of hearing?",
    originalContent: "For me, it's the idea that we only use 10% of our brains. It's been debunked so many times, but you still see it in movies and pop culture. It drives me crazy. What about you?",
    translatedTitle: '듣기 지겨운 과학적 "오해"는 무엇인가요?',
    translatedContent:
      '저는 우리가 뇌의 10%만 사용한다는 이야기에요. 수없이 많은 반박이 있었지만, 여전히 영화나 대중 문화에서 볼 수 있죠. 정말 미치겠어요. 여러분은 어떠신가요?',
    upvotes: 3402,
    commentsCount: 1542,
    createdAt: subHours(now, 0.5).toISOString(),
    category: '뻘글',
  },
  {
    id: '3',
    author: 'u/CozyGamerGal',
    originalTitle: 'Stardew Valley is the perfect game to unwind after a long day.',
    originalContent: "There's something so calming about farming, talking to the villagers, and just living a simple life. No stress, no deadlines. Just pure relaxation. It's my go-to comfort game.",
    translatedTitle: '스타듀 밸리는 긴 하루를 보낸 후 휴식을 취하기에 완벽한 게임입니다.',
    translatedContent:
      '농사를 짓고, 마을 사람들과 이야기하고, 그저 단순한 삶을 사는 것에는 마음을 진정시키는 무언가가 있어요. 스트레스도 없고, 마감 기한도 없죠. 순수한 휴식뿐입니다. 제가 찾는 위안이 되는 게임이에요.',
    upvotes: 890,
    commentsCount: 231,
    createdAt: subHours(now, 8).toISOString(),
    category: '연예',
  },
  {
    id: '4',
    author: 'u/StockWizard',
    originalTitle: 'Thoughts on the recent market dip? Are we heading for a correction?',
    originalContent: "The tech stocks took a major hit this week. I'm wondering if this is a good buying opportunity or the start of a bigger downturn. I'm holding my positions for now but feeling a bit nervous. What are your strategies?",
    translatedTitle: '최근 시장 하락에 대한 생각? 조정장으로 가는 걸까요?',
    translatedContent:
      '이번 주 기술주들이 큰 타격을 입었습니다. 이게 좋은 매수 기회일지, 아니면 더 큰 하락의 시작일지 궁금합니다. 저는 일단 제 포지션을 유지하고 있지만 약간 불안하네요. 여러분의 전략은 무엇인가요?',
    upvotes: 2100,
    commentsCount: 530,
    createdAt: subDays(now, 1).toISOString(),
    category: '투자',
  },
  {
    id: '5',
    author: 'u/PoliticalJunkie',
    originalTitle: 'The new bill just passed. What are the immediate implications?',
    originalContent: "I've read the summary, but I'm looking for a deeper analysis from people who understand the legal and economic ramifications. How will this affect international trade relations?",
    translatedTitle: '새 법안이 방금 통과되었습니다. 즉각적인 영향은 무엇일까요?',
    translatedContent:
      '요약본은 읽어봤지만, 법적, 경제적 파장을 이해하는 분들의 더 깊이 있는 분석을 찾고 있습니다. 이것이 국제 무역 관계에 어떤 영향을 미칠까요?',
    upvotes: 5600,
    commentsCount: 1200,
    createdAt: subDays(now, 3).toISOString(),
    category: '정치',
  },
];

const mockComments: Comment[] = [
  {
    id: 'c1-1',
    postId: '1',
    author: '개발자아재',
    content: '와 대박이네요 ㅋㅋㅋ 저도 하나 만들어보고 싶어요! 혹시 코드 공유 가능하신가요?',
    createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'c1-2',
    postId: '1',
    author: '식집사',
    content: '이거 완전 똥손인 저에게 필요한 제품이네요. 판매하실 생각은 없으신가요?',
    createdAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'c2-1',
    postId: '2',
    author: '과학도',
    content: 'ㅋㅋㅋㅋ 10%는 진짜 전설이죠. 볼 때마다 한숨 나옴.',
    createdAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'c2-2',
    postId: '2',
    author: '레딧중독',
    content: '금이 물보다 무겁다는 것도요. 같은 부피일 때만 해당되는데 말이죠!',
    createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'c3-1',
    postId: '3',
    author: '겜순이',
    content: '인정합니다... 자기 전에 힐링하려고 들어갔다가 새벽까지 하게 되는 마법',
    createdAt: new Date(now.getTime() - 7 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'c1-3',
    postId: '1',
    author: 'u/PlantLover99',
    content: '@개발자아재 네! 깃허브에 정리해서 곧 올릴게요!',
    createdAt: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
  },
];

export const getPosts = async (
  category: PostCategory | '전체',
  timeRange: TimeRange
): Promise<Post[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  const now = new Date();
  let startTime: Date;

  switch (timeRange) {
    case '실시간':
      startTime = subHours(now, 1);
      break;
    case '오늘':
      startTime = subHours(now, 24);
      break;
    case '이번 주':
      startTime = subDays(now, 7);
      break;
  }

  const filteredPosts = mockPosts
    .filter(post => {
      const postDate = new Date(post.createdAt);
      return postDate >= startTime;
    })
    .filter(post => {
      if (category === '전체') return true;
      return post.category === category;
    });

  return filteredPosts.sort((a, b) => b.upvotes - a.upvotes);
};

export const getPostById = async (id: string): Promise<Post | undefined> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockPosts.find(p => p.id === id);
};

export const getCommentsByPostId = async (postId: string): Promise<Comment[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 150));
  return mockComments
    .filter(c => c.postId === postId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};
