"use client"

import { useState } from "react"
import { DayCard } from "@/components/day-card"
import { DayNavigation } from "@/components/day-navigation"
import { TipsSection } from "@/components/tips-section"
import {
  Hotel,
  Phone,
  CreditCard,
  Smartphone,
  Map,
  TrainFront,
  Footprints,
  Banknote,
  Wifi,
} from "lucide-react"
import { MapsButton } from "@/components/maps-button"

const itinerary = [
  {
    day: 1,
    title: "Palaces & Culture",
    legs: [
      {
        from: "Hotel",
        to: "Deoksugung Palace",
        details: "The palace is right outside the hotel door. Walk straight out and you will see it!",
        tags: [{ type: "walk" as const, label: "Walk", time: "5 min" }],
        image: "https://lh3.googleusercontent.com/place-photos/AL8-SNG4g3e8WVSHQoZ1bZS4vHdo2X_TQTWC21XmwedJAsVTecufoWOmbB45PCC93SQk-PdlKRaDr8aAIEss3_7Lb8I7pe5dWSPdmm4CEnYifYa80j2jvbYrZsL4XUhDd4AyiQ4hZybPZ7kPc8CbuA=s800-w800-h600",
        description: "A tranquil royal palace at the heart of the city, where traditional Joseon architecture meets a leafy stone-walled path. Catch the Changing of the Guard for a vivid slice of Korean history.",
        tips: [
          { type: "walkIn" as const, text: "No booking needed — just walk in, no reservations required." },
          { type: "closed" as const, text: "Closed Mondays — plan accordingly." },
        ],
      },
      {
        from: "Deoksugung Palace",
        to: "Insadong Culture Street",
        details: "A flat, pleasant walk heading northeast. Lots to see on the way.",
        tags: [{ type: "walk" as const, label: "Walk", time: "15 min" }],
        image: "https://lh3.googleusercontent.com/place-photos/AL8-SNEoEOiRbiiUHO7L4usqb-kAEoYtLB7mveEm2WgBpOZTxO6dF-wtXlbk1-CvIpglmUSHQ0lyofKPZEMJCec4do7FbVEqMZOZbLJ6W3Bq1rB7MUJDZDOYhXWuX3B9sQMS8C0Vb6f_7h2n1uUtOQ=s800-w800-h600",
        description: "A charming pedestrian street lined with tea houses, pottery shops, art galleries, and handmade crafts. The best place in Seoul to find authentic Korean souvenirs in a calm, unhurried setting.",
        tips: [
          { type: "walkIn" as const, text: "No booking needed — just walk in, no reservations required." },
          { type: "timing" as const, text: "Weekday afternoons are the calmest. Weekends get noticeably busier." },
        ],
      },
      {
        from: "Insadong",
        to: "Yeji Sikdang (Lunch)",
        details: "Walk south toward Myeongdong. The restaurant is tucked in a small alley. Important: This restaurant is CASH ONLY — bring Korean won!",
        tags: [{ type: "walk" as const, label: "Walk", time: "10 min" }],
        mapsDestination: "Yeji Sikdang, Myeongdong, Seoul",
        image: "https://lh3.googleusercontent.com/place-photos/AL8-SNHWEtRVO1VbV9-7VLr4UoF5mSux7tuI-CWNHSniavPCM5PJBxbCvEzKd2mVVBDO7e4nIeVargobJsN9OKGJ4JFrI3ICM9703v9EsxqKy1sxqR-MXddJ7kqDO1ugnmNf1_FWkH85OWJDgzIKoYekPI-h=s800-w800-h600",
        description: "A beloved family-run hole-in-the-wall hidden down a Myeongdong alley, known for generous banchan, silky bibimbap, and old-school Korean warmth. Cash only.",
      },
      {
        from: "Yeji Sikdang",
        to: "Jogyesa Temple",
        details: "Short walk back north into the Insadong area. The temple is large and easy to find.",
        tags: [{ type: "walk" as const, label: "Walk", time: "5 min" }],
        mapsDestination: "Jogyesa Temple, Seoul",
        image: "https://lh3.googleusercontent.com/place-photos/AL8-SNFEhDMtv1uG9WKhxmfPSMRxQ4ZALu-4Ld8HbaEMIjJck4UUW7V7RiU55YgBzz4VnR9tgOH1L4r4BIIlieDq84PSa_wTK-StruyIcsYtSHv39sLWzkPQKMiWi2md8wM3viGK_mcold4L0quNNdM=s800-w800-h600",
        description: "Seoul's most important Buddhist temple, tucked quietly behind the city bustle. Ancient trees, colorful lanterns, and a golden main hall create an unexpectedly peaceful escape.",
        tips: [
          { type: "walkIn" as const, text: "No booking needed — just walk in, no reservations required." },
          { type: "timing" as const, text: "Early morning is magical and nearly empty. Avoid if there's a Buddhist holiday — it gets very crowded." },
        ],
      },
      {
        from: "Jogyesa Temple",
        to: "Sinsa Dongindong (Dinner)",
        details: "Both are in the same Insadong area. Very close — just around the corner.",
        tags: [{ type: "walk" as const, label: "Walk", time: "2 min" }],
        mapsDestination: "Sinsa Dongindong, Insadong, Seoul",
        image: "https://lh3.googleusercontent.com/places/ANXAkqExuMwaK3joTD-bKkFoisKE0KNXuQjcYOvxLG1PUjQp82a4EKX2NaAs5nfoluy4nRC98w3h3zls--zuQ5hEghu3MdfjUKFcHL4=s800-w800-h600",
        description: "A cozy, sit-down Korean restaurant in the heart of Insadong, celebrated for its braised ribs, savory beef pancakes, and generous side dishes. No BBQ — just refined, traditional Korean cooking.",
      },
      {
        from: "Sinsa Dongindong",
        to: "Hotel (Courtyard Marriott)",
        details: "Walk southwest back toward Namdaemun. Well-lit and safe at night. If you are tired, take a taxi — it's very cheap!",
        tags: [
          { type: "walk" as const, label: "Walk", time: "15 min" },
          { type: "taxi" as const, label: "Taxi", time: "5 min — under 5,000 won" },
        ],
        mapsDestination: "Courtyard by Marriott Seoul Namdaemun",
      },
    ],
  },
  {
    day: 2,
    title: "Grand Palace & Hanok",
    legs: [
      {
        from: "Hotel",
        to: "Gyeongbokgung Palace",
        details: "Walk to City Hall Station (5 min) → Take the orange Line 3 → Get off at Gyeongbokgung Station, Exit 5 → Walk 3 minutes to the palace gates. TIP: A taxi in the morning is easy and comfortable!",
        tags: [
          { type: "subway" as const, label: "Subway", time: "20 min total" },
          { type: "taxi" as const, label: "Taxi", time: "12 min — about 8,000 won" },
        ],
        mapsDestination: "Gyeongbokgung Palace, Seoul",
        image: "https://lh3.googleusercontent.com/place-photos/AL8-SNGvGAXHWL-kvhnWLojv4KmGxH05KhYRfTinQQCagXmWDD_qERExt_qdNuOEoscHm6bPsEsJAxGSSDBJKoNp0cPbJG-DfKn3konpUVH58sQ9t0mx4HKcPUk0YrNOYvFJ9NiWA6P28p8JeUtASrM=s800-w800-h600",
        description: "Seoul's grandest and most iconic palace, built in 1395 during the Joseon Dynasty. Sweeping gates, reflective pavilion ponds, and mountain backdrop make it unmissable.",
        tips: [
          { type: "booking" as const, text: "Tickets can be bought at the gate, but booking online at ticket.interpark.com avoids lines." },
          { type: "timing" as const, text: "Arrive at 9am opening. Gets very crowded by 11am, especially on weekends." },
          { type: "closed" as const, text: "Closed Tuesdays — plan accordingly." },
        ],
      },
      {
        from: "Gyeongbokgung Palace",
        to: "Bukchon Hanok Village",
        details: "Head east out of the palace gates. A beautiful walk through traditional Korean houses. Slightly uphill but very scenic.",
        tags: [{ type: "walk" as const, label: "Walk", time: "15 min" }],
        mapsDestination: "Bukchon Hanok Village, Seoul",
        image: "https://lh3.googleusercontent.com/place-photos/AL8-SNEs-WeNZE9ynq88P6wlewettR3BWEVCw1ugGGY-TvzDuvg41PmAF8AGaJ4P20GYS2BDK3qCLsi0f0A3_2E_MQDqVE0pvMnoyFbHZ83jdi5V9_CkeZ6iEA_l2TkgEhYd6bHPF4PbTpANLhGRsPs=s800-w800-h600",
        description: "A living neighborhood of 600-year-old traditional Korean homes (hanok) perched on a hillside between two palaces. Wander slowly — people still live here.",
        tips: [
          { type: "walkIn" as const, text: "No booking needed — just walk in, no reservations required." },
          { type: "timing" as const, text: "Early morning only (before 10am) for quiet. By midday it's packed with tour groups — navigating crowds on cobblestones can be tough." },
        ],
      },
      {
        from: "Bukchon Hanok Village",
        to: "EOE Seoul Café",
        details: "The café is tucked right inside the Bukchon alleys. Great coffee with amazing views of the old houses!",
        tags: [{ type: "walk" as const, label: "Walk", time: "5 min" }],
        mapsDestination: "EOE Seoul Cafe, Bukchon, Seoul",
        image: "https://lh3.googleusercontent.com/place-photos/AL8-SNESoAKFKRy3fqHPXlYS9mtPm0XnwowfYJFsxD0s-0fl-N5Ek5I4CWkADLVoPae_dUjZgjc53cZNXRMxTGSs1FiX1z3QT1zUCnwtde45OjuyP5f7Z3XlzuDA3_7TGC7CAcvgXX_KegAIYl_J4JRWnqjf0w=s800-w800-h600",
        description: "A serene modern hanok café known for its earthy matcha lattes, black sesame parfait, and beautifully minimal interior. One of the most photogenic spots in Bukchon.",
      },
      {
        from: "EOE Seoul Café",
        to: "Jungdamun Bukchon (Dinner)",
        details: "Both are in the same Bukchon area. Very close — just a short stroll.",
        tags: [{ type: "walk" as const, label: "Walk", time: "3 min" }],
        mapsDestination: "Jungdamun Bukchon, Seoul",
        image: "https://lh3.googleusercontent.com/place-photos/AL8-SNE3oHji0iGTu0WN-f7KG4jIx1oJAnyfBPUEn6EKKM-5b6Y80J0DqlcFV3GSuoDWcfaiTLgzrpGHRzEvFUMbyxjrCz6EDcmkMQ28CtBDy6CB474vg3Yjv3n6jaeb3W5GiOtzHejNWZi5wBFD33uPF8F0=s800-w800-h600",
        description: "A refined, quiet Korean restaurant tucked inside Bukchon, beloved for its bossam (tender boiled pork with kimchi) and crispy seafood pajeon. Reserve ahead.",
        tips: [
          { type: "restaurant" as const, text: "Gets busy at lunch — worth calling ahead or arriving right at 11am opening." },
        ],
      },
      {
        from: "Jungdamun Bukchon",
        to: "Hotel (Courtyard Marriott)",
        details: "Walk to Anguk Station (Line 3, 10 min) then ride to City Hall, then short walk to hotel. RECOMMENDED: Take a taxi after dinner — it is easy and not expensive!",
        tags: [
          { type: "subway" as const, label: "Subway", time: "20 min" },
          { type: "taxi" as const, label: "Taxi", time: "12 min — 7,000–9,000 won" },
        ],
        mapsDestination: "Courtyard by Marriott Seoul Namdaemun",
      },
    ],
  },
  {
    day: 3,
    title: "Secret Garden & Tea",
    legs: [
      {
        from: "Hotel",
        to: "Changdeokgung Secret Garden",
        details: "Take Line 3 from City Hall → Get off at Anguk Station, Exit 3 → Walk 10 minutes. TIP: Take a taxi for a relaxing morning start — about 6,000–8,000 won.",
        tags: [
          { type: "subway" as const, label: "Subway", time: "20 min" },
          { type: "taxi" as const, label: "Taxi", time: "10 min — 6,000–8,000 won" },
        ],
        mapsDestination: "Changdeokgung Secret Garden, Seoul",
        image: "https://lh3.googleusercontent.com/place-photos/AL8-SNEwXAvKYASSWKz-BGeBdNGBmqQS_4kMUtzH98CF-fZTxezwvC0fnBD9FZkomDJef9CZLZn-A4pn4yENq-Y3hGAUeqNp24nukojfEBQHH0jN8BEbjKw9xdvItWXaNrsNm9gPM0UfL15b1JjfKbM=s800-w800-h600",
        description: "A hidden royal garden behind Changdeokgung Palace, once reserved exclusively for the king. Guided tours wind through ancient pavilions, lotus ponds, and forested hillside paths.",
        tips: [
          { type: "booking" as const, text: "Book ahead at cdg.go.kr. Guided tours fill up fast, especially weekends. English tours run a few times daily — limited spots." },
          { type: "timing" as const, text: "The 10am English tour is ideal before the heat of the day." },
          { type: "closed" as const, text: "Closed Mondays — plan accordingly." },
        ],
      },
      {
        from: "Secret Garden",
        to: "Chatteul Teahouse",
        details: "Walk southwest into the Bukchon lanes. A peaceful and beautiful traditional teahouse — perfect for a rest.",
        tags: [{ type: "walk" as const, label: "Walk", time: "10 min" }],
        mapsDestination: "Chatteul Teahouse, Bukchon, Seoul",
        image: "https://lh3.googleusercontent.com/places/ANXAkqG2hN1EViDZs4v79jGDbYRXqH0q3qPypfpn5F3R98z6sf9vJq6nu3c1uv4lesmirz1r8cJ7gW1EpHDlbJLgLepOEaZUmKmVHVo=s800-w800-h600",
        description: "A traditional Korean teahouse perched in the Bukchon village with views over the rooftops. Staff walk you through the tea steeping ritual — try the rice cakes and honey biscuits.",
      },
      {
        from: "Chatteul Teahouse",
        to: "Mansuui Jeongwon (Lunch)",
        details: "Both are in the Bukchon area — very close to each other!",
        tags: [{ type: "walk" as const, label: "Walk", time: "5 min" }],
        mapsDestination: "Mansuui Jeongwon, Seoul",
        image: "https://lh3.googleusercontent.com/place-photos/AL8-SNFuKjXUglG-49DZx1rWwHUPKLIb4IaD50YWwQihAvJcwm-OuVZnn7uUNcAUfvXfvIYCFm9K8OCVV8Y2ZPz4hpaO97a9x2t5cOY1s96hCZ53RK0Zuw3H-W2KjxCenhWyXMYDwxhyzFn3u2OhqI2QDgz4Cg=s800-w800-h600",
        description: "A warm, homestyle Korean gem near Bukchon serving comforting bowls of bulgogi, kimchi jjigae, and haemul pajeon. Feels like eating at a Korean grandmother's house.",
      },
      {
        from: "Mansuui Jeongwon",
        to: "Insadong Culture Street",
        details: "Walk southwest toward Insadong for a final afternoon of shopping, souvenirs, and exploring at your own pace.",
        tags: [{ type: "walk" as const, label: "Walk", time: "10 min" }],
        mapsDestination: "Insadong, Seoul",
      },
      {
        from: "Insadong",
        to: "Hotel (Courtyard Marriott)",
        details: "Walk south through the city center back to Namdaemun — or take a taxi to celebrate the end of a wonderful trip!",
        tags: [
          { type: "walk" as const, label: "Walk", time: "15 min" },
          { type: "taxi" as const, label: "Taxi", time: "5 min — under 5,000 won" },
        ],
        mapsDestination: "Courtyard by Marriott Seoul Namdaemun",
      },
    ],
  },
]

const tips = [
  {
    icon: <CreditCard className="size-6" />,
    title: "Get a T-money Card at the Airport",
    description: "Pick one up at Incheon Airport or any convenience store (GS25, CU, 7-Eleven). It costs 2,500 won. Load it with cash and tap it on every subway and bus — no need to buy tickets each time.",
  },
  {
    icon: <Smartphone className="size-6" />,
    title: "Use Uber for Taxis (or International Taxis)",
    description: "Download the Uber app before you go — it works just like at home, fully metered, no haggling. You can also ask your hotel concierge to call an International Taxi (black cab with English-speaking driver). The concierge can write your destination in Korean on a card to give the driver.",
  },
  {
    icon: <Map className="size-6" />,
    title: "Use Naver Maps — NOT Google Maps",
    description: "Google Maps does not work well in Seoul! Download Naver Maps — it has English directions and is what all locals use. The blue buttons in this app also open maps for you automatically.",
  },
  {
    icon: <TrainFront className="size-6" />,
    title: "The Subway is Safe and Easy",
    description: "Seoul's subway is very clean, safe, and all signs are in English. It runs from 5:30 AM until midnight. The pink seats near the doors are reserved for elderly — you can and should use them!",
  },
  {
    icon: <Footprints className="size-6" />,
    title: "Wear Your Most Comfortable Shoes",
    description: "Bukchon Hanok Village has cobblestone paths and gentle hills. You will walk 8,000–12,000 steps each day. Comfortable, flat shoes are very important.",
  },
  {
    icon: <Banknote className="size-6" />,
    title: "Carry Some Cash Each Day",
    description: "Most places accept credit cards, but the Yeji Sikdang restaurant on Day 1 is CASH ONLY. You can get Korean won from ATMs at subway stations and inside convenience stores.",
  },
  {
    icon: <Wifi className="size-6" />,
    title: "Get WiFi or a SIM Card at the Airport",
    description: "You need internet for maps and for Uber. Pre-order a pocket WiFi or SIM card online before you fly — pick it up at the airport on arrival. Korea has excellent signal everywhere.",
  },
]

export default function SeoulItinerary() {
  const [activeDay, setActiveDay] = useState(1)

  return (
    <>
      {/* Main scrollable content */}
      <div
        className="min-h-screen bg-background"
        style={{ paddingBottom: "calc(88px + env(safe-area-inset-bottom))" }}
      >
        {/* Header */}
        <header className="bg-card border-b border-border px-4 pt-8 pb-6 text-center">
          <h1 className="text-3xl font-bold text-card-foreground mb-1">
            Seoul Travel Guide
          </h1>
          <p className="text-lg text-muted-foreground font-sans">
            3-Day Trip — Just for Mom
          </p>
        </header>

        <main className="px-4 py-6 flex flex-col gap-6 max-w-lg mx-auto">

          {/* Active day content */}
          {itinerary.map((day) => (
            <DayCard
              key={day.day}
              day={day.day}
              title={day.title}
              legs={day.legs}
              isActive={activeDay === day.day}
            />
          ))}

          {/* Tips */}
          <TipsSection tips={tips} />

          {/* Hotel card */}
          <section className="bg-card rounded-2xl border-2 border-primary overflow-hidden">
            <div className="bg-primary px-5 py-4 flex items-center gap-3">
              <Hotel className="size-6 text-primary-foreground" />
              <h2 className="text-xl font-bold text-primary-foreground font-sans">
                Your Hotel
              </h2>
            </div>
            <div className="p-5 flex flex-col gap-4">
              <div>
                <p className="text-xl font-bold text-card-foreground leading-snug">
                  Courtyard by Marriott Seoul Namdaemun
                </p>
                <p className="text-base text-muted-foreground mt-1">
                  15 Toegye-ro 20-gil, Jung-gu, Seoul
                </p>
              </div>

              {/* Call hotel button */}
              <a
                href="tel:+82222118000"
                className="
                  w-full flex items-center justify-center gap-3
                  bg-emerald-600 active:bg-emerald-800
                  text-white font-sans font-bold
                  rounded-2xl py-5 px-4 text-xl
                  shadow-md min-h-[64px]
                  focus:outline-none focus:ring-4 focus:ring-emerald-300
                "
              >
                <Phone className="size-6 shrink-0" />
                Call the Hotel
              </a>

              {/* Maps button for hotel */}
              <MapsButton
                destination="Courtyard by Marriott Seoul Namdaemun"
              />

              {/* Emergency numbers */}
              <div className="bg-secondary rounded-xl px-4 py-4">
                <p className="font-sans font-bold text-base text-card-foreground mb-2">
                  Korean Emergency Numbers
                </p>
                <p className="text-lg font-bold text-foreground">
                  112 — Police
                </p>
                <p className="text-lg font-bold text-foreground">
                  119 — Ambulance
                </p>
              </div>
            </div>
          </section>

          <footer className="text-center py-4 text-base text-muted-foreground font-sans">
            Have a wonderful trip to Seoul!
          </footer>
        </main>
      </div>

      {/* Sticky bottom day navigation */}
      <DayNavigation
        days={itinerary.map(({ day, title }) => ({ day, title }))}
        activeDay={activeDay}
        onDayChange={(day) => {
          setActiveDay(day)
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
      />
    </>
  )
}
