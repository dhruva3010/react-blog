import { renderHook, waitFor } from '@testing-library/react';
import { usePost } from './usePost';
import { getPost } from '../api/posts';

jest.mock('../api/posts');

describe('usePost', () => {
  test('should fetch a post successfully', async () => {
    const mockPost = { id: '1', title: 'Test Post', content: 'Test Content' };

    (getPost as jest.Mock).mockResolvedValue(mockPost);

    const { result } = renderHook(() => usePost('1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.post).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.post).toEqual(mockPost);
      expect(result.current.error).toBe(null);
    });
  });

  test('should handle error when fetching a post fails', async () => {
    (getPost as jest.Mock).mockRejectedValue(new Error('Failed to fetch post'));

    const { result } = renderHook(() => usePost('1'));

    expect(result.current.loading).toBe(true);
    expect(result.current.post).toBe(null);
    expect(result.current.error).toBe(null);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.post).toBe(null);
      expect(result.current.error).toBe('Failed to fetch post');
    });
  });

  test('should handle invalid post ID', async () => {
    const { result } = renderHook(() => usePost(''));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.post).toBe(null);
      expect(result.current.error).toBe('Invalid post ID');
    });
  });
});