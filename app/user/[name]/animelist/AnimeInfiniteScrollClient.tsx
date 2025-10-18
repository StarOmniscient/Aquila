"use client";

import { useEffect, useRef, useState } from "react";
import { fetchAnimePage } from "./actions";

type AnimeItem = {
  id: string;
  title: string; // adjust to your schema
};

export default function AnimeInfiniteScroll({
  userId,
  isOwner,
}: {
  userId: string;
  isOwner: boolean;
}) {
  const [animeList, setAnimeList] = useState<AnimeItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 1.0 }
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 1) loadMore();
  }, [page]);

  async function loadMore() {
    setLoading(true);
    try {
      const result = await fetchAnimePage({ userId, page, take: 10 });
      if (result.length > 0) {
        setAnimeList((prev) => [...prev, ...result]);
        if (result.length < 10) setHasMore(false);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Load failed", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {animeList.map((anime) => (
        <div key={anime.id}>{anime.title}</div>
      ))}
      {loading && <p>Loading...</p>}
      <div ref={observerRef} style={{ height: "20px" }} />
    </div>
  );
}