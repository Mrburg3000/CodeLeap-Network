"use client";

export type SortOption = "newest" | "oldest" | "most_liked";
export type FilterOption = "all" | "mine";

interface SortFilterBarProps {
  sort: SortOption;
  filter: FilterOption;
  onSortChange: (s: SortOption) => void;
  onFilterChange: (f: FilterOption) => void;
}

export default function SortFilterBar({
  sort,
  filter,
  onSortChange,
  onFilterChange,
}: SortFilterBarProps) {
  return (
    <div className="sort-filter-bar">
      <div className="sort-filter-group">
        <label className="sort-filter-label">Sort</label>
        <div className="sort-filter-pills">
          {(["newest", "oldest", "most_liked"] as SortOption[]).map((opt) => (
            <button
              key={opt}
              className={`pill ${sort === opt ? "active" : ""}`}
              onClick={() => onSortChange(opt)}
            >
              {opt === "newest" && "Newest"}
              {opt === "oldest" && "Oldest"}
              {opt === "most_liked" && "Most Liked"}
            </button>
          ))}
        </div>
      </div>

      <div className="sort-filter-group">
        <label className="sort-filter-label">Filter</label>
        <div className="sort-filter-pills">
          {(["all", "mine"] as FilterOption[]).map((opt) => (
            <button
              key={opt}
              className={`pill ${filter === opt ? "active" : ""}`}
              onClick={() => onFilterChange(opt)}
            >
              {opt === "all" ? "All Posts" : "My Posts"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}