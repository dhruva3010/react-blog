import { renderHook, waitFor } from '@testing-library/react';
import { usePosts } from './usePosts';
import { getPosts } from '../api/posts';

jest.mock('../api/posts');

describe('usePosts', () => {
  test('should fetch posts successfully', async () => {
    const mockPosts = [
      { id: '1', title: 'Test Post 1', content: 'Content 1' },
      { id: '2', title: 'Test Post 2', content: 'Content 2' },
    ];

    (getPosts as jest.Mock).mockResolvedValue(mockPosts);

    const { result } = renderHook(() => usePosts());

    expect(result.current.loading).toBe(true);
    expect(result.current.posts).toEqual([]);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.posts).toEqual(mockPosts);
      expect(result.current.error).toBe(null);
    });
  });

  test('should handle error when fetching posts fails', async () => {
    (getPosts as jest.Mock).mockRejectedValue(new Error('Failed to fetch posts'));

    const { result } = renderHook(() => usePosts());

    expect(result.current.loading).toBe(true);
    expect(result.current.posts).toEqual([]);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.posts).toEqual([]);
      expect(result.current.error).toBe('Failed to fetch posts');
    });
  });
});