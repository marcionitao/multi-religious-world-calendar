"use client"

import { RELIGIONS, type ReligionId } from "@/lib/religions"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

type Props = {
  active: Set<ReligionId>
  onToggle: (id: ReligionId) => void
  onSelectAll: () => void
  onClear: () => void
}

export function ReligionFilter({ active, onToggle, onSelectAll, onClear }: Props) {
  const allActive = active.size === RELIGIONS.length
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Tradições
        </h2>
        <button
          type="button"
          onClick={allActive ? onClear : onSelectAll}
          className="text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          {allActive ? "Limpar" : "Todas"}
        </button>
      </div>
      <ul className="flex flex-col gap-1">
        {RELIGIONS.map((r) => {
          const isOn = active.has(r.id)
          return (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => onToggle(r.id)}
                aria-pressed={isOn}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-md px-2 py-2 text-left transition-colors",
                  "hover:bg-muted/60",
                  !isOn && "opacity-45",
                )}
              >
                <span
                  className="relative flex size-5 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: r.colorVar }}
                  aria-hidden
                >
                  <span className="text-[10px] leading-none text-white/95">
                    {r.glyph}
                  </span>
                  {isOn && (
                    <Check
                      className="absolute -right-1 -bottom-1 size-3 rounded-full bg-background p-[1px] text-foreground"
                      strokeWidth={3}
                    />
                  )}
                </span>
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="text-sm text-foreground">{r.name}</span>
                  <span className="text-[11px] text-muted-foreground truncate">
                    {r.calendar}
                  </span>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
