import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/database';

export const usePost = (id: string) => {
  const post = useLiveQuery(() => db.posts.get(parseInt(id)));

  return {
    post,
    loading: post === undefined,
    error: post === undefined ? 'Post not found' : null
  };
};