import { useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";

interface UseInfiniteScrollOptions {
  fetchNextPage: () => Promise<unknown>;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  threshold?: number;
  rootMargin?: string;
}

export const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  threshold = 0.1,
  rootMargin = "400px",
}: UseInfiniteScrollOptions) => {
  const fetchingRef = useRef(false);
  const { ref, inView } = useInView({ threshold, rootMargin });

  const handleFetchNext = useCallback(async () => {
    if (fetchingRef.current) return;

    fetchingRef.current = true;
    try {
      await fetchNextPage();
    } finally {
      fetchingRef.current = false;
    }
  }, [fetchNextPage]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !fetchingRef.current) {
      handleFetchNext();
    }
  }, [inView, hasNextPage, isFetchingNextPage, handleFetchNext]);

  return { ref };
};
