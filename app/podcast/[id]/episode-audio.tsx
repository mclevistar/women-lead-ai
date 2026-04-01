"use client";

export default function EpisodeAudio({ audioUrl }: { audioUrl: string }) {
  return (
    <div className="mb-10">
      <audio controls className="w-full" preload="none">
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
