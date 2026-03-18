"use client"

import { cn } from "@/lib/utils"

interface DayNavigationProps {
  days: { day: number; title: string }[]
  activeDay: number
  onDayChange: (day: number) => void
}

export function DayNavigation({ days, activeDay, onDayChange }: DayNavigationProps) {
  return (
    <nav
      aria-label="Select day"
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t-2 border-border"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex">
        {days.map(({ day, title }) => (
          <button
            key={day}
            onClick={() => onDayChange(day)}
            aria-pressed={activeDay === day}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1",
              "py-4 font-sans transition-colors",
              "focus:outline-none focus:ring-4 focus:ring-inset focus:ring-primary/30",
              "min-h-[72px]",
              activeDay === day
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground active:bg-secondary"
            )}
          >
            <span className="text-sm font-bold uppercase tracking-widest">Day {day}</span>
            <span className={cn(
              "text-xs",
              activeDay === day ? "text-primary-foreground/80" : "text-muted-foreground"
            )}>
              {title.split(" ")[0]}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}
