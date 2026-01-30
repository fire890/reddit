export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
}

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
    createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
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
    createdAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
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
    createdAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
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

export const getPosts = async (): Promise<Post[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockPosts;
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
