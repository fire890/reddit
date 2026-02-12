import { Post, PostCategory } from './data';

interface RedditPost {
  data: {
    id: string;
    author: string;
    title: string;
    selftext: string;
    ups: number;
    num_comments: number;
    created_utc: number;
    permalink: string;
    url: string;
    subreddit: string;
  };
}

const categoryToSubreddit: Record<PostCategory, string> = {
  '정치': 'politics',
  '투자': 'investing',
  '연예': 'entertainment',
  '뻘글': 'popular',
};

async function fetchPostsFromSubreddit(subreddit: string, limit: number = 1): Promise<Post[]> {
  try {
    const url = `https://www.reddit.com/r/${subreddit}/top.json?limit=${limit}&t=day`;
    console.log(`Fetching from URL: ${url}`);
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
      },
    });

    console.log(`Response status for ${subreddit}: ${response.status}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseJson = await response.json();
    console.log(`Raw Reddit API response for ${subreddit}:`, JSON.stringify(responseJson, null, 2));

    const { data } = responseJson;
    const posts = data.children as RedditPost[];
    console.log(`Posts before mapping for ${subreddit}:`, posts);

    return posts.map((post) => ({
      id: post.data.id,
      author: post.data.author,
      originalTitle: post.data.title,
      originalContent: post.data.selftext,
      translatedTitle: '', // This will be handled by another service
      translatedContent: '', // This will be handled by another service
      upvotes: post.data.ups,
      commentsCount: post.data.num_comments,
      createdAt: new Date(post.data.created_utc * 1000).toISOString(),
      category: Object.keys(categoryToSubreddit).find(
        (key) => categoryToSubreddit[key as PostCategory] === post.data.subreddit.toLowerCase()
      ) as PostCategory || '뻘글',
      url: `https://www.reddit.com${post.data.permalink}`,
    }));
  } catch (error) {
    console.error(`Failed to fetch posts from r/${subreddit}:`, error);
    return [];
  }
}

export async function getTopPosts(category: PostCategory | '전체' = '전체'): Promise<Post[]> {
  const categoriesToFetch: PostCategory[] =
    category === '전체'
      ? ['정치', '투자', '연예', '뻘글']
      : [category];

  const postPromises = categoriesToFetch.map((cat) =>
    fetchPostsFromSubreddit(categoryToSubreddit[cat], 4)
  );

  const results = await Promise.all(postPromises);
  return results.flat();
}
