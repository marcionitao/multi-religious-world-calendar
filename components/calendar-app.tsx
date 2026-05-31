"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import { ReligionFilter } from "@/components/religion-filter"
import { CalendarGrid } from "@/components/calendar-grid"
import { DayDetail } from "@/components/day-detail"
import { UpcomingHolidays } from "@/components/upcoming-holidays"
import {
  HOLIDAYS,
  holidaysByDate,
  holidaysInMonth,
} from "@/lib/holidays"
import { RELIGIONS, type ReligionId } from "@/lib/religions"
import { MONTHS_PT, toIsoDate } from "@/lib/calendar-utils"

const INITIAL_DATE = new Date(2026, 0, 6) // Epiphany — something meaningful on mount

const ALL_IDS = new Set<ReligionId>(RELIGIONS.map((r) => r.id))

type CalendarView = "gregorian" | ReligionId

export function CalendarApp() {
  const [viewDate, setViewDate] = useState<Date>(INITIAL_DATE)
  const [selectedDate, setSelectedDate] = useState<Date>(INITIAL_DATE)
  const [active, setActive] = useState<Set<ReligionId>>(new Set(ALL_IDS))
  const [calendarView, setCalendarView] = useState<CalendarView>("gregorian")

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const monthHolidays = useMemo(
    () => holidaysInMonth(year, month),
    [year, month],
  )

  const visibleMonthHolidays = useMemo(
    () => monthHolidays.filter((h) => active.has(h.religion)),
    [monthHolidays, active],
  )

  const selectedHolidays = useMemo(() => {
    return holidaysByDate(toIsoDate(selectedDate)).filter((h) =>
      active.has(h.religion),
    )
  }, [selectedDate, active])

  const toggleReligion = (id: ReligionId) => {
    setActive((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))
  const goToday = () => {
    const today = new Date()
    setViewDate(new Date(today.getFullYear(), today.getMonth(), 1))
    setSelectedDate(today)
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="flex size-8 items-center justify-center rounded-full bg-foreground text-background"
              aria-hidden
            >
              <Sparkles className="size-4" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="font-serif text-lg truncate">
                Calendário Sagrado
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground truncate">
                Tradições do Mundo
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={calendarView}
              onValueChange={(v) => setCalendarView(v as CalendarView)}
            >
              <SelectTrigger className="w-[190px] hidden sm:flex">
                <SelectValue placeholder="Calendário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gregorian">Calendário Gregoriano</SelectItem>
                {RELIGIONS.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.calendar}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_340px] gap-8 lg:gap-10">
          {/* Left: Filters */}
          <aside className="space-y-8 lg:sticky lg:top-6 lg:self-start">
            <ReligionFilter
              active={active}
              onToggle={toggleReligion}
              onSelectAll={() => setActive(new Set(ALL_IDS))}
              onClear={() => setActive(new Set())}
            />

            <div className="hidden lg:block space-y-3">
              <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Sobre
              </h2>
              <p className="text-[12px] leading-relaxed text-muted-foreground text-pretty">
                Um calendário multirreligioso que reúne as principais datas
                sagradas do ano em um único lugar — respeitosamente apresentadas
                em seu idioma original com tradução para o português.
              </p>
            </div>
          </aside>

          {/* Center: Calendar */}
          <section className="min-w-0 space-y-5">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {year}
                </p>
                <h1 className="font-serif text-5xl sm:text-6xl leading-[0.95] tracking-tight text-balance">
                  {MONTHS_PT[month]}
                </h1>
              </div>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToday}
                  className="text-[11px] uppercase tracking-wider"
                >
                  Hoje
                </Button>
                <div className="flex items-center rounded-full border border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevMonth}
                    aria-label="Mês anterior"
                    className="rounded-l-full rounded-r-none size-9"
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <div className="h-5 w-px bg-border" aria-hidden />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextMonth}
                    aria-label="Próximo mês"
                    className="rounded-r-full rounded-l-none size-9"
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            </div>

            <CalendarGrid
              year={year}
              month={month}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              holidaysInView={monthHolidays}
              activeReligions={active}
              calendarView={calendarView}
            />

            {visibleMonthHolidays.length === 0 && (
              <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                Nenhuma celebração no mês para as tradições selecionadas.
              </div>
            )}

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
              {RELIGIONS.filter((r) => active.has(r.id)).map((r) => (
                <div key={r.id} className="flex items-center gap-2">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: r.colorVar }}
                    aria-hidden
                  />
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {r.name}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Right: Day detail + upcoming */}
          <aside className="space-y-10">
            <DayDetail date={selectedDate} holidays={selectedHolidays} />
            <UpcomingHolidays
              referenceDate={selectedDate}
              activeReligions={active}
              onSelectDate={(d) => {
                setSelectedDate(d)
                setViewDate(new Date(d.getFullYear(), d.getMonth(), 1))
              }}
            />
          </aside>
        </div>

        <footer className="mt-16 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span>
            {HOLIDAYS.length} celebrações · 6 tradições · Ano {year}
          </span>
          <span>Desenhado com respeito às tradições do mundo</span>
        </footer>
      </main>
    </div>
  )
}


