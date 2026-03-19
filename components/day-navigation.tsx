"use client"

import { cn } from "@/lib/utils"
import { Info } from "lucide-react"

interface DayNavigationProps {
  days: { day: number; title: string }[]
  activeDay: number  // 0 = info tab
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
              "flex-1 flex flex-col items-center justify-center gap-0.5",
              "py-3 font-sans transition-colors",
              "focus:outline-none focus:ring-4 focus:ring-inset focus:ring-primary/30",
              "min-h-[64px]",
              activeDay === day
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground active:bg-secondary"
            )}
          >
            <span className="text-xs font-bold uppercase tracking-widest">Day {day}</span>
            <span className={cn(
              "text-xs",
              activeDay === day ? "text-primary-foreground/80" : "text-muted-foreground"
            )}>
              {title.split(" ")[0]}
            </span>
          </button>
        ))}

        {/* Info / Hotel tab */}
        <button
          onClick={() => onDayChange(0)}
          aria-pressed={activeDay === 0}
          className={cn(
            "flex-1 flex flex-col items-center justify-center gap-0.5",
            "py-3 font-sans transition-colors",
            "focus:outline-none focus:ring-4 focus:ring-inset focus:ring-primary/30",
            "min-h-[64px]",
            activeDay === 0
              ? "bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground active:bg-secondary"
          )}
        >
          <Info className="size-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Info</span>
        </button>
      </div>
    </nav>
  )
}
