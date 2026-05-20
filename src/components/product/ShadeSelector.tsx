import type { ProductShade } from "../../types";

interface ShadeSelectorProps {
  shades: ProductShade[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ShadeSelector({
  shades,
  selectedId,
  onSelect,
}: ShadeSelectorProps) {
  if (shades.length <= 1 && shades[0]?.id === "universal") return null;

  return (
    <div>
      <p className="mb-3 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-ink-light">
        Nuance&nbsp;
        <span className="font-light normal-case tracking-normal text-ink">
          · {shades.find((s) => s.id === selectedId)?.name}
        </span>
      </p>
      <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Select shade">
        {shades.map((shade) => (
          <button
            key={shade.id}
            type="button"
            role="radio"
            aria-checked={selectedId === shade.id}
            aria-label={shade.name}
            onClick={() => onSelect(shade.id)}
            className={`h-10 w-10 rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
              selectedId === shade.id
                ? "border-champagne ring-2 ring-champagne ring-offset-2 ring-offset-surface scale-[1.02]"
                : "border-ink/[0.12] hover:border-champagne/60"
            }`}
            style={{ backgroundColor: shade.hex }}
          />
        ))}
      </div>
    </div>
  );
}
