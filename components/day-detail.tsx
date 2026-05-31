"use client"

import { RELIGION_BY_ID, WEEKDAYS } from "@/lib/religions"
import type { Holiday } from "@/lib/holidays"
import { formatLongDatePt } from "@/lib/calendar-utils"

type Props = {
  date: Date
  holidays: Holiday[]
}

export function DayDetail({ date, holidays }: Props) {
  const dow = date.getDay()

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Dia selecionado
        </h2>
        <p className="mt-2 font-serif text-3xl leading-tight text-foreground text-balance">
          {formatLongDatePt(date)}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-muted-foreground">
          <span>
            <span className="text-foreground/80">{WEEKDAYS.gregorian[dow].original}</span>
            <span className="mx-1.5 text-muted-foreground/50">·</span>
            {WEEKDAYS.judaism[dow].original}
            <span className="mx-1.5 text-muted-foreground/50">·</span>
            {WEEKDAYS.islam[dow].original}
            <span className="mx-1.5 text-muted-foreground/50">·</span>
            {WEEKDAYS.hinduism[dow].original}
          </span>
        </div>
      </div>

      {holidays.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Nenhum feriado registrado nas tradições selecionadas.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {holidays.map((h) => {
            const r = RELIGION_BY_ID[h.religion]
            return (
              <li
                key={h.id}
                className="relative rounded-lg border border-border bg-card p-4"
              >
                <span
                  className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r"
                  style={{ backgroundColor: r.colorVar }}
                  aria-hidden
                />
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider"
                    style={{ color: r.colorVar }}
                  >
                    <span aria-hidden>{r.glyph}</span>
                    {r.name}
                  </span>
                  {h.major && (
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      · Principal
                    </span>
                  )}
                </div>
                <h3 className="mt-1.5 font-serif text-xl leading-tight text-foreground text-balance">
                  {h.namePt}
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground italic">
                  {h.nameOriginal}
                </p>
                <p className="mt-2 text-[13px] text-foreground/75 leading-relaxed text-pretty">
                  {h.description}
                </p>
                <p className="mt-3 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {h.nativeDate}
                </p>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
