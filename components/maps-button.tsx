"use client"

import { MapPin } from "lucide-react"

interface MapsButtonProps {
  destination: string
  naverDestination?: string
}

export function MapsButton({ destination, naverDestination }: MapsButtonProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`
  const naverMapsUrl = `https://map.naver.com/p/search/${encodeURIComponent(naverDestination ?? destination)}`

  return (
    <div className="flex gap-2">
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${destination} in Google Maps`}
        className="
          flex-1 flex items-center justify-center gap-2
          bg-blue-600 active:bg-blue-800
          text-white font-sans font-bold
          rounded-2xl py-4 px-3 text-base
          shadow-md active:shadow-sm
          transition-all
          focus:outline-none focus:ring-4 focus:ring-blue-300
          min-h-[56px]
        "
      >
        <MapPin className="size-5 shrink-0" />
        <span>Google Maps</span>
      </a>

      <a
        href={naverMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${destination} in Naver Maps`}
        className="
          flex-1 flex items-center justify-center gap-2
          bg-emerald-600 active:bg-emerald-800
          text-white font-sans font-bold
          rounded-2xl py-4 px-3 text-base
          shadow-md active:shadow-sm
          transition-all
          focus:outline-none focus:ring-4 focus:ring-emerald-300
          min-h-[56px]
        "
      >
        <MapPin className="size-5 shrink-0" />
        <span>Naver Maps</span>
      </a>
    </div>
  )
}
