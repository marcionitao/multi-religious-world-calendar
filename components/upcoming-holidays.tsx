"use client"

import { RELIGION_BY_ID, type ReligionId } from "@/lib/religions"
import { HOLIDAYS, type Holiday } from "@/lib/holidays"
import { parseIso, MONTHS_PT } from "@/lib/calendar-utils"
import { useMemo } from "react"

type Props = {
  referenceDate: Date
  activeReligions: Set<ReligionId>
  onSelectDate: (d: Date) => void
}

export function UpcomingHolidays({ referenceDate, activeReligions, onSelectDate }: Props) {
  const upcoming = useMemo(() => {
    const ref = new Date(referenceDate)
    ref.setHours(0, 0, 0, 0)
    return HOLIDAYS.filter((h) => {
      if (!activeReligions.has(h.religion)) return false
      const d = parseIso(h.date)
      return d.getTime() >= ref.getTime()
    })
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 6)
  }, [referenceDate, activeReligions])

  return (
    <div className="space-y-3">
      <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        Próximas celebrações
      </h2>
      {upcoming.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Não há celebrações a seguir neste ano.
        </p>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {upcoming.map((h) => (
            <UpcomingItem key={h.id} h={h} onSelect={onSelectDate} />
          ))}
        </ul>
      )}
    </div>
  )
}

function UpcomingItem({
  h,
  onSelect,
}: {
  h: Holiday
  onSelect: (d: Date) => void
}) {
  const d = parseIso(h.date)
  const r = RELIGION_BY_ID[h.religion]
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(d)}
        className="flex w-full items-center gap-3 py-3 text-left group"
      >
        <div className="flex flex-col items-center justify-center w-10 shrink-0 rounded-md bg-muted/50 py-1.5">
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
            {MONTHS_PT[d.getMonth()].slice(0, 3)}
          </span>
          <span className="font-serif text-lg leading-none tabular-nums">
            {d.getDate()}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span
              className="size-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: r.colorVar }}
              aria-hidden
            />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              {r.name}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-foreground truncate group-hover:underline underline-offset-4">
            {h.namePt}
          </p>
          <p className="text-[11px] text-muted-foreground truncate italic">
            {h.nameOriginal}
          </p>
        </div>
      </button>
    </li>
  )
}
