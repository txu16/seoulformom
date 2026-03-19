import { useState } from "react"
import { cn } from "@/lib/utils"
import { MapsButton } from "./maps-button"
import { Footprints, TrainFront, Car, CalendarCheck, Clock, CalendarX, CheckCircle2, Utensils } from "lucide-react"

type TagType = "walk" | "subway" | "taxi"
type TipType = "booking" | "timing" | "closed" | "walkIn" | "restaurant"

interface Tag {
  type: TagType
  label: string
  time: string
}

interface Tip {
  type: TipType
  text: string
}

interface LegAlternative {
  to: string
  details: string
  tips?: Tip[]
  mapsDestination?: string
  image?: string
  description?: string
}

interface Leg {
  from: string
  to: string
  details: string
  tags: Tag[]
  tips?: Tip[]
  mapsDestination?: string
  image?: string
  description?: string
  alternative?: LegAlternative
}

interface DayCardProps {
  day: number
  title: string
  legs: Leg[]
  isActive: boolean
}

const tagConfig: Record<TagType, { icon: React.ReactNode; bg: string; text: string }> = {
  walk: {
    icon: <Footprints className="size-5" />,
    bg: "bg-emerald-100",
    text: "text-emerald-800",
  },
  subway: {
    icon: <TrainFront className="size-5" />,
    bg: "bg-blue-100",
    text: "text-blue-800",
  },
  taxi: {
    icon: <Car className="size-5" />,
    bg: "bg-orange-100",
    text: "text-orange-800",
  },
}

const tipConfig: Record<TipType, { icon: React.ReactNode; bg: string; iconColor: string; text: string; label: string }> = {
  booking: {
    icon: <CalendarCheck className="size-4" />,
    bg: "bg-violet-50 border border-violet-200",
    iconColor: "text-violet-600",
    text: "text-violet-900",
    label: "Book ahead",
  },
  timing: {
    icon: <Clock className="size-4" />,
    bg: "bg-amber-50 border border-amber-200",
    iconColor: "text-amber-600",
    text: "text-amber-900",
    label: "Best time",
  },
  closed: {
    icon: <CalendarX className="size-4" />,
    bg: "bg-red-50 border border-red-200",
    iconColor: "text-red-600",
    text: "text-red-900",
    label: "Closed day",
  },
  walkIn: {
    icon: <CheckCircle2 className="size-4" />,
    bg: "bg-emerald-50 border border-emerald-200",
    iconColor: "text-emerald-600",
    text: "text-emerald-900",
    label: "Walk-in",
  },
  restaurant: {
    icon: <Utensils className="size-4" />,
    bg: "bg-orange-50 border border-orange-200",
    iconColor: "text-orange-600",
    text: "text-orange-900",
    label: "Restaurant tip",
  },
}

function LegCard({ leg, index, total }: { leg: Leg; index: number; total: number }) {
  const [selectedOption, setSelectedOption] = useState(0)

  const display = selectedOption === 1 && leg.alternative
    ? {
        to: leg.alternative.to,
        details: leg.alternative.details,
        tips: leg.alternative.tips,
        mapsDestination: leg.alternative.mapsDestination ?? leg.alternative.to,
        image: leg.alternative.image,
        description: leg.alternative.description,
      }
    : {
        to: leg.to,
        details: leg.details,
        tips: leg.tips,
        mapsDestination: leg.mapsDestination ?? leg.to,
        image: leg.image,
        description: leg.description,
      }

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
      {/* Step number bar */}
      <div className="bg-secondary px-4 py-2.5 flex flex-wrap items-center gap-2">
        <span className="font-sans font-bold text-sm text-muted-foreground uppercase tracking-wider shrink-0">
          Stop {index + 1} of {total}
        </span>
        <div className="flex gap-2 flex-wrap ml-auto">
          {leg.tags.map((tag, i) => (
            <span
              key={i}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-sans font-semibold text-sm",
                tagConfig[tag.type].bg,
                tagConfig[tag.type].text
              )}
            >
              {tagConfig[tag.type].icon}
              {tag.time}
            </span>
          ))}
        </div>
      </div>

      {/* Option pills */}
      {leg.alternative && (
        <div className="px-4 pt-3 flex gap-2">
          <button
            onClick={() => setSelectedOption(0)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-sans font-bold transition-colors",
              selectedOption === 0
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground active:bg-secondary/70"
            )}
          >
            Option 1
          </button>
          <button
            onClick={() => setSelectedOption(1)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-sans font-bold transition-colors",
              selectedOption === 1
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground active:bg-secondary/70"
            )}
          >
            Option 2
          </button>
        </div>
      )}

      <div className="p-4 flex flex-col gap-4">
        {/* Photo + Description */}
        {display.image && display.description && (
          <div className="flex flex-col gap-3">
            <img
              src={display.image}
              alt={display.to}
              className="w-full h-44 rounded-xl object-cover"
            />
            <p className="text-base text-foreground leading-relaxed italic">
              {display.description}
            </p>
          </div>
        )}
        {!display.image && display.description && (
          <p className="text-base text-foreground leading-relaxed italic">
            {display.description}
          </p>
        )}

        {/* From → To */}
        <div>
          <p className="text-sm font-sans font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            Route
          </p>
          <p className="text-xl font-bold text-card-foreground leading-snug">
            {leg.from}
            <span className="text-primary mx-2">→</span>
            {display.to}
          </p>
        </div>

        {/* Details */}
        <p className="text-lg text-foreground leading-relaxed">
          {display.details}
        </p>

        {/* Tips */}
        {display.tips && display.tips.length > 0 && (
          <div className="flex flex-col gap-2">
            {display.tips.map((tip, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-2.5 rounded-xl px-3 py-3",
                  tipConfig[tip.type].bg
                )}
              >
                <span className={cn("shrink-0 mt-0.5", tipConfig[tip.type].iconColor)}>
                  {tipConfig[tip.type].icon}
                </span>
                <div>
                  <span className={cn("text-sm font-sans font-bold uppercase tracking-wide mr-1.5", tipConfig[tip.type].iconColor)}>
                    {tipConfig[tip.type].label}:
                  </span>
                  <span className={cn("text-base leading-relaxed", tipConfig[tip.type].text)}>
                    {tip.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Maps buttons */}
        <MapsButton destination={display.mapsDestination} />
      </div>
    </div>
  )
}

export function DayCard({ day, title, legs, isActive }: DayCardProps) {
  if (!isActive) return null

  return (
    <article>
      {/* Day heading */}
      <div className="flex items-center gap-3 mb-6">
        <span className="bg-primary text-primary-foreground font-sans font-black text-lg px-5 py-2 rounded-full shrink-0">
          Day {day}
        </span>
        <h2 className="text-2xl font-semibold text-card-foreground">{title}</h2>
      </div>

      <div className="flex flex-col gap-5">
        {legs.map((leg, index) => (
          <LegCard key={index} leg={leg} index={index} total={legs.length} />
        ))}
      </div>
    </article>
  )
}
