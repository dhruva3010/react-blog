import Dexie, { Table } from 'dexie';
import { Post } from '../types';

export class MyBlogDatabase extends Dexie {
  posts!: Table<Post>;

  constructor() {
    super('MyBlogDatabase');
    this.version(1).stores({
      posts: '++id, title, content, image, video, created_at'
    });
  }
}

export const db = new MyBlogDatabase();