import type { Resource } from "@/lib/resources";

const display = { fontFamily: "var(--loaded-dmserif), Georgia, serif" };

// A preview of the lead magnet for resource cards: the cover sits on a soft
// panel so portrait PDFs and landscape stills both fit without cropping.
// Resources without a cover image get a text tile in the brand colours.
export default function ResourceCover({
  resource,
  tone = "light",
  className = "",
}: {
  resource: Resource;
  /** light: on the cream background; dark: on a burgundy card */
  tone?: "light" | "dark";
  className?: string;
}) {
  const panel = tone === "dark" ? "bg-[#EFE2D3]/10" : "bg-[#602D37]/[0.06]";

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-xl ${panel} ${className}`}>
      {resource.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resource.image}
          alt={`Preview of ${resource.title}`}
          loading="lazy"
          className="max-h-[85%] max-w-[85%] rounded-md object-contain shadow-[0_12px_32px_rgba(96,45,55,0.25)] transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex h-[85%] aspect-[3/4] flex-col justify-end rounded-md bg-[#602D37] p-4 text-[#EFE2D3] shadow-[0_12px_32px_rgba(96,45,55,0.25)] transition-transform duration-300 group-hover:-rotate-1 group-hover:scale-[1.03]">
          <span className="text-lg leading-tight" style={display}>
            {resource.title}
          </span>
        </div>
      )}
    </div>
  );
}
