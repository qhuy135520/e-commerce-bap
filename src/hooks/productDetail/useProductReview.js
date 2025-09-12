import { useState, useMemo } from "react";

export default function useProductReview({ reviews = [], avgRating = 0, pageSize = 5 }) {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);

  const counts = useMemo(() => {
    const c = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      const k = Math.max(1, Math.min(5, Math.round(r.rating)));
      c[k] += 1;
    });
    return c;
  }, [reviews]);

  const totalReviews = reviews.length;
  const displayAvg = Number.isFinite(Number(avgRating)) ? Number(avgRating) : 0;

  const filteredSorted = useMemo(() => {
    let list = [...reviews];
    if (filter !== "all") list = list.filter((r) => Math.round(r.rating) === Number(filter));

    list.sort((a, b) => {
      const ta = new Date(a.createdAt).getTime();
      const tb = new Date(b.createdAt).getTime();
      return sortBy === "newest" ? tb - ta : ta - tb;
    });
    return list;
  }, [reviews, filter, sortBy]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredSorted.slice(start, start + pageSize);
  }, [filteredSorted, page, pageSize]);

  return {
    filter,
    setFilter,
    sortBy,
    setSortBy,
    page,
    setPage,
    counts,
    totalReviews,
    displayAvg,
    filteredSorted,
    paginated,
    pageSize,
  };
}
