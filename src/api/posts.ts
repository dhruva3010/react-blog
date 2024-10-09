import { db } from '../db/database';
import { Post } from '../types';

export const getPosts = async (): Promise<Post[]> => {
  return await db.posts.orderBy('created_at').reverse().toArray();
};

export const getPost = async (id: string): Promise<Post | undefined> => {
  return await db.posts.get(parseInt(id));
};

export const createPost = async (post: Omit<Post, 'id' | 'created_at'>): Promise<Post> => {
  const id = await db.posts.add({
    ...post,
    created_at: new Date().toISOString()
  });
  return { id: id.toString(), ...post, created_at: new Date().toISOString() };
};