"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { RESOURCE_TYPES } from "@/lib/types";

export function SearchFilter() {
  return (
    <Suspense fallback={<SearchFilterSkeleton />}>
      <SearchFilterContent />
    </Suspense>
  );
}

function SearchFilterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [type, setType] = useState(searchParams.get("type") || "all");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (debouncedQuery) {
      params.set("query", debouncedQuery);
    }
    
    if (type && type !== "all") {
      params.set("type", type);
    }

    const newUrl = params.toString() 
      ? `/resources?${params.toString()}` 
      : "/resources";
    
    router.push(newUrl);
  }, [debouncedQuery, type, router]);

  const hasActiveFilters = query || (type && type !== "all");

  const resetFilters = () => {
    setQuery("");
    setType("all");
    router.push("/resources");
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources..."
          className={cn(
            "w-full rounded-lg border border-zinc-300 bg-white pl-10 pr-10 py-2.5 text-sm",
            "placeholder-zinc-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20",
            "dark:border-zinc-700 dark:bg-zinc-900 dark:placeholder-zinc-500 dark:focus:border-rose-500"
          )}
          aria-label="Search resources"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Type Filter Label */}
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          <Filter className="h-4 w-4" />
          <span>Filter:</span>
        </div>

        {/* Type Filter Options */}
        <div className="flex flex-wrap gap-2">
          <FilterButton
            label="All"
            value="all"
            active={type === "all"}
            onClick={() => setType("all")}
          />
          <FilterButton
            label="Videos"
            value="video"
            active={type === "video"}
            onClick={() => setType("video")}
          />
          <FilterButton
            label="Articles"
            value="article"
            active={type === "article"}
            onClick={() => setType("article")}
          />
          <FilterButton
            label="PDFs"
            value="pdf"
            active={type === "pdf"}
            onClick={() => setType("pdf")}
          />
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="ml-auto flex items-center gap-1 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            <X className="h-4 w-4" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

interface FilterButtonProps {
  label: string;
  value: string;
  active: boolean;
  onClick: () => void;
}

function FilterButton({ label, value, active, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1 text-sm font-medium transition-colors",
        active
          ? "bg-rose-500 text-white hover:bg-rose-600"
          : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
      )}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

function SearchFilterSkeleton() {
  return (
    <div className="mb-8 space-y-4">
      <div className="h-10 w-full animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      <div className="flex gap-2">
        <div className="h-8 w-20 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-8 w-20 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-8 w-20 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}

