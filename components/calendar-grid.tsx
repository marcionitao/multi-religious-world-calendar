"use client"

import { cn } from "@/lib/utils"
import type { Holiday } from "@/lib/holidays"
import { isSameDay, monthGridDays, toIsoDate } from "@/lib/calendar-utils"
import { RELIGION_BY_ID, WEEKDAYS, type ReligionId } from "@/lib/religions"
import { useMemo } from "react"

type Props = {
  year: number
  month: number // 0-indexed
  selectedDate: Date
  onSelectDate: (d: Date) => void
  holidaysInView: Holiday[]
  activeReligions: Set<ReligionId>
  calendarView: "gregorian" | ReligionId
}

export function CalendarGrid({
  year,
  month,
  selectedDate,
  onSelectDate,
  holidaysInView,
  activeReligions,
  calendarView,
}: Props) {
  const days = useMemo(() => monthGridDays(year, month), [year, month])
  const today = new Date()

  const byDate = useMemo(() => {
    const map = new Map<string, Holiday[]>()
    for (const h of holidaysInView) {
      if (!activeReligions.has(h.religion)) continue
      const list = map.get(h.date) ?? []
      list.push(h)
      map.set(h.date, list)
    }
    return map
  }, [holidaysInView, activeReligions])

  const weekdays = WEEKDAYS[calendarView] ?? WEEKDAYS.gregorian

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Weekday header */}
      <div className="grid grid-cols-7 border-b border-border bg-muted/30">
        {weekdays.map((w, i) => (
          <div
            key={i}
            className="px-2 py-3 text-center border-r last:border-r-0 border-border"
          >
            <div className="text-[13px] font-medium text-foreground">
              {w.original}
            </div>
            {calendarView !== "gregorian" && (
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                {w.pt}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {days.map((d, idx) => {
          const iso = toIsoDate(d)
          const isCurrentMonth = d.getMonth() === month
          const isToday = isSameDay(d, today)
          const isSelected = isSameDay(d, selectedDate)
          const dayHolidays = byDate.get(iso) ?? []
          const hasMajor = dayHolidays.some((h) => h.major)

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectDate(d)}
              className={cn(
                "group relative flex flex-col items-start gap-1.5 min-h-[92px] p-2 text-left",
                "border-r border-b border-border last:border-r-0",
                (idx + 1) % 7 === 0 && "border-r-0",
                idx >= 35 && "border-b-0",
                "transition-colors hover:bg-muted/40",
                !isCurrentMonth && "bg-muted/10 text-muted-foreground/60",
                isSelected && "bg-muted/70 ring-1 ring-inset ring-foreground/20",
              )}
              aria-label={`${d.getDate()} — ${dayHolidays.length} feriados`}
            >
              <div className="flex w-full items-start justify-between">
                <span
                  className={cn(
                    "inline-flex size-6 items-center justify-center rounded-full text-[13px] tabular-nums",
                    isToday &&
                      "bg-foreground text-background font-medium",
                    !isToday && isSelected && "font-medium",
                    !isCurrentMonth && "opacity-60",
                  )}
                >
                  {d.getDate()}
                </span>
                {hasMajor && (
                  <span
                    className="mt-1 size-1 rounded-full bg-foreground/40"
                    aria-hidden
                  />
                )}
              </div>

              {/* Holiday stack */}
              <div className="flex flex-col gap-0.5 w-full min-h-0">
                {dayHolidays.slice(0, 2).map((h) => {
                  const r = RELIGION_BY_ID[h.religion]
                  return (
                    <div
                      key={h.id}
                      className="flex items-center gap-1.5 min-w-0"
                      title={h.namePt}
                    >
                      <span
                        className="size-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: r.colorVar }}
                        aria-hidden
                      />
                      <span className="truncate text-[11px] leading-tight text-foreground/85">
                        {h.namePt}
                      </span>
                    </div>
                  )
                })}
                {dayHolidays.length > 2 && (
                  <span className="text-[10px] text-muted-foreground pl-3">
                    +{dayHolidays.length - 2}
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
