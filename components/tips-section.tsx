"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react"

interface Tip {
  title: string
  description: string
  icon: React.ReactNode
}

interface TipsSectionProps {
  tips: Tip[]
}

export function TipsSection({ tips }: TipsSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="mt-6">
      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        className="
          w-full flex items-center justify-between gap-4
          bg-accent text-accent-foreground
          rounded-2xl px-5 py-5
          font-sans font-bold text-xl
          focus:outline-none focus:ring-4 focus:ring-primary/30
          active:opacity-90
          min-h-[72px]
        "
      >
        <span className="flex items-center gap-3">
          <Lightbulb className="size-7 text-primary shrink-0" />
          <span>Tips for Mom</span>
        </span>
        {isExpanded
          ? <ChevronUp className="size-7 shrink-0" />
          : <ChevronDown className="size-7 shrink-0" />
        }
      </button>

      {/* Tips list */}
      {isExpanded && (
        <div className="mt-2 flex flex-col gap-3">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-accent text-accent-foreground rounded-2xl p-5 flex gap-4 items-start"
            >
              <div className="text-primary mt-0.5 shrink-0">
                {tip.icon}
              </div>
              <div className="flex flex-col gap-1.5">
                <strong className="text-lg font-sans font-bold text-primary">
                  {tip.title}
                </strong>
                <p className="text-base text-accent-foreground/80 leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
