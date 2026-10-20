// Collapsible transcript, grouped into ~5-sentence paragraphs for readability
export default function Transcript({ text }: { text: string }) {
  const paragraphs = text.split(/\n{2,}/).flatMap((block) => {
    const joined = block.replace(/\n/g, " ").trim();
    if (!joined) return [];
    const sentences = joined.match(/[^.!?]+[.!?]+\s*/g) ?? [joined];
    const paras: string[] = [];
    let current = "";
    sentences.forEach((s, i) => {
      current += s;
      if ((i + 1) % 5 === 0 || i === sentences.length - 1) {
        paras.push(current.trim());
        current = "";
      }
    });
    return paras;
  });

  return (
    <details className="group border-t border-border/60 pt-8">
      <summary className="font-display text-xl font-semibold text-foreground cursor-pointer select-none list-none flex items-center justify-between">
        <span>Transcript</span>
        <span className="text-sm font-normal text-muted-foreground group-open:hidden">Show</span>
        <span className="text-sm font-normal text-muted-foreground hidden group-open:inline">Hide</span>
      </summary>
      <div className="mt-6 space-y-4">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-sm text-foreground leading-7">
            {para}
          </p>
        ))}
      </div>
    </details>
  );
}
