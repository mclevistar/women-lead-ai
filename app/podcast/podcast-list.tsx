"use client";

import { useState } from "react";
import Link from "next/link";
import type { Episode } from "@/lib/episodes";
import { allTopics } from "@/lib/episodes";

export default function PodcastList({ episodes }: { episodes: Episode[] }) {
  const [search, setSearch] = useState("");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const filtered = episodes.filter((ep) => {
    const matchesSearch = !search ||
      ep.title.toLowerCase().includes(search.toLowerCase()) ||
      ep.guest.toLowerCase().includes(search.toLowerCase());
    const matchesTopic = !activeTopic || ep.topics.includes(activeTopic);
    return matchesSearch && matchesTopic;
  });

  return (
    <>
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search episodes or guests..."
          className="w-full border-b border-border bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
        />
      </div>

      {/* Topic filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveTopic(null)}
          className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${
            !activeTopic
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          All
        </button>
        {allTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => setActiveTopic(activeTopic === topic ? null : topic)}
            className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${
              activeTopic === topic
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Episode list */}
      <div className="divide-y divide-border/60">
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">No episodes found.</p>
        ) : (
          filtered.map((episode) => (
            <Link
              key={episode.id}
              href={`/podcast/${episode.id}`}
              className="block py-5 group"
            >
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-xs text-muted-foreground font-medium">EP {episode.episodeNumber}</span>
                <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                  {episode.title}
                </h3>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>with {episode.guest}</span>
                <span>&middot;</span>
                <span>{episode.duration}</span>
                <span>&middot;</span>
                <span>{new Date(episode.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
