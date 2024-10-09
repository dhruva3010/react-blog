import { getPosts, getPost, createPost } from './posts';

describe('posts API', () => {
  test('getPosts should return an array of posts', async () => {
    const posts = await getPosts();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('content');
  });

  test('getPost should return a single post', async () => {
    const post = await getPost('1');
    expect(post).not.toBeNull();
    expect(post).toHaveProperty('id', '1');
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('content');
  });

  test('getPost should return null for non-existent post', async () => {
    const post = await getPost('999');
    expect(post).toBeNull();
  });

  test('createPost should add a new post', async () => {
    const newPost = {
      title: 'New Test Post',
      content: 'This is a new test post.',
      image: 'https://example.com/image.jpg',
    };

    const createdPost = await createPost(newPost);
    expect(createdPost).toHaveProperty('id');
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.content).toBe(newPost.content);
    expect(createdPost.image).toBe(newPost.image);

    // Verify that the new post is added to the list
    const posts = await getPosts();
    const addedPost = posts.find(post => post.id === createdPost.id);
    expect(addedPost).not.toBeUndefined();
  });
});