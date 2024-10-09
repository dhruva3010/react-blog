import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/database';
import { Post } from '../types';

export const usePosts = () => {
  const posts = useLiveQuery<Post[]>(() => db.posts.orderBy('created_at').reverse().toArray()) || [];

  return {
    posts,
    loading: posts === undefined,
    error: null
  };
};