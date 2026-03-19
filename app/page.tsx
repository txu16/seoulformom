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
  Receipt,
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
        naverMapsDestination: "덕수궁",
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
        naverMapsDestination: "인사동",
        image: "https://lh3.googleusercontent.com/place-photos/AL8-SNEoEOiRbiiUHO7L4usqb-kAEoYtLB7mveEm2WgBpOZTxO6dF-wtXlbk1-CvIpglmUSHQ0lyofKPZEMJCec4do7FbVEqMZOZbLJ6W3Bq1rB7MUJDZDOYhXWuX3B9sQMS8C0Vb6f_7h2n1uUtOQ=s800-w800-h600",
        description: "A charming pedestrian street lined with tea houses, pottery shops, art galleries, and handmade crafts. The best place in Seoul to find authentic Korean souvenirs in a calm, unhurried setting.",
        tips: [
          { type: "walkIn" as const, text: "No booking needed — just walk in, no reservations required." },
          { type: "timing" as const, text: "Weekday afternoons are the calmest. Weekends get noticeably busier." },
        ],
      },
      {
        from: "Insadong",
        to: "Ssamziegil",
        details: "Ssamziegil is right inside the Insadong street — look for the open archway entrance. Step inside and follow the gentle spiral walkway lined with shops. Completely flat and easy to walk. Grab a snack from one of the stalls and sit in the open courtyard.",
        tags: [{ type: "walk" as const, label: "Walk", time: "2 min" }],
        mapsDestination: "Ssamziegil, Insadong, Seoul",
        naverMapsDestination: "쌈지길",
        description: "A charming open-air courtyard market nestled inside Insadong, with independent stalls selling handmade ceramics, art prints, fabric goods, and quirky gifts along a gentle spiral walkway. All flat, all in one loop — easy on the feet. Perfect for a relaxed browse and a snack.",
      },
      {
        from: "Ssamziegil",
        to: "Yeji Sikdang (Lunch)",
        details: "Walk south toward Myeongdong. The restaurant is tucked in a small alley. Important: This restaurant is CASH ONLY — bring Korean won!",
        tags: [{ type: "walk" as const, label: "Walk", time: "10 min" }],
        mapsDestination: "Yeji Sikdang, Myeongdong, Seoul",
        naverMapsDestination: "예지식당 명동",
        image: "https://lh3.googleusercontent.com/place-photos/AL8-SNHWEtRVO1VbV9-7VLr4UoF5mSux7tuI-CWNHSniavPCM5PJBxbCvEzKd2mVVBDO7e4nIeVargobJsN9OKGJ4JFrI3ICM9703v9EsxqKy1sxqR-MXddJ7kqDO1ugnmNf1_FWkH85OWJDgzIKoYekPI-h=s800-w800-h600",
        description: "A beloved family-run hole-in-the-wall hidden down a Myeongdong alley, known for generous banchan, silky bibimbap, and old-school Korean warmth. Cash only.",
        alternative: {
          to: "Myeongdong Kyoja (Lunch)",
          details: "Head to the main Myeongdong street — the restaurant is clearly marked and easy to find. Cards accepted. Expect a short wait but the line moves fast.",
          description: "One of Seoul's most iconic local lunch spots, beloved for silky knife-cut noodle soup (kalguksu) and pan-fried kimchi dumplings. Quick, clean, and completely unpretentious.",
          mapsDestination: "Myeongdong Kyoja, Seoul",
          naverMapsDestination: "명동교자",
        },
      },
      {
        from: "Yeji Sikdang",
        to: "Jogyesa Temple",
        details: "Short walk back north into the Insadong area. The temple is large and easy to find.",
        tags: [{ type: "walk" as const, label: "Walk", time: "5 min" }],
        mapsDestination: "Jogyesa Temple, Seoul",
        naverMapsDestination: "조계사",
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
        naverMapsDestination: "신사동인동 인사동",
        image: "https://lh3.googleusercontent.com/places/ANXAkqExuMwaK3joTD-bKkFoisKE0KNXuQjcYOvxLG1PUjQp82a4EKX2NaAs5nfoluy4nRC98w3h3zls--zuQ5hEghu3MdfjUKFcHL4=s800-w800-h600",
        description: "A cozy, sit-down Korean restaurant in the heart of Insadong, celebrated for its braised ribs, savory beef pancakes, and generous side dishes. No BBQ — just refined, traditional Korean cooking.",
        alternative: {
          to: "Sanchon (Dinner)",
          details: "A few steps into the Insadong alleys — look for the traditional wooden entrance. Book ahead as they serve a fixed-time set menu. Very calm and easy dining.",
          description: "A serene Insadong institution serving Buddhist temple cuisine — a set menu of 20+ seasonal vegetarian small dishes in a beautifully restored traditional Korean house. A truly special and peaceful evening.",
          mapsDestination: "Sanchon Restaurant, Insadong, Seoul",
          naverMapsDestination: "산촌 인사동",
          tips: [
            { type: "booking" as const, text: "Reservations strongly recommended — call ahead or book online. They serve set dinner seatings." },
          ],
        },
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
        naverMapsDestination: "코트야드바이메리어트서울남대문",
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
        naverMapsDestination: "경복궁",
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
        naverMapsDestination: "북촌한옥마을",
        image: "https://lh3.googleusercontent.com/place-photos/AL8-SNEs-WeNZE9ynq88P6wlewettR3BWEVCw1ugGGY-TvzDuvg41PmAF8AGaJ4P20GYS2BDK3qCLsi0f0A3_2E_MQDqVE0pvMnoyFbHZ83jdi5V9_CkeZ6iEA_l2TkgEhYd6bHPF4PbTpANLhGRsPs=s800-w800-h600",
        description: "A living neighborhood of 600-year-old traditional Korean homes (hanok) perched on a hillside between two palaces. Wander slowly — people still live here.",
        tips: [
          { type: "walkIn" as const, text: "No booking needed — just walk in, no reservations required." },
          { type: "timing" as const, text: "Early morning only (before 10am) for quiet. By midday it's packed with tour groups — navigating crowds on cobblestones can be tough." },
          { type: "timing" as const, text: "Aim to leave by 1:30pm — you have two lovely shops to visit this afternoon, and one closes at 5pm." },
        ],
      },
      {
        from: "Bukchon Hanok Village",
        to: "EOE Seoul Café",
        details: "The café is tucked right inside the Bukchon alleys. Great coffee with amazing views of the old houses!",
        tags: [{ type: "walk" as const, label: "Walk", time: "5 min" }],
        mapsDestination: "EOE Seoul Cafe, Bukchon, Seoul",
        naverMapsDestination: "EOE서울카페 북촌",
        image: "https://lh3.googleusercontent.com/place-photos/AL8-SNESoAKFKRy3fqHPXlYS9mtPm0XnwowfYJFsxD0s-0fl-N5Ek5I4CWkADLVoPae_dUjZgjc53cZNXRMxTGSs1FiX1z3QT1zUCnwtde45OjuyP5f7Z3XlzuDA3_7TGC7CAcvgXX_KegAIYl_J4JRWnqjf0w=s800-w800-h600",
        description: "A serene modern hanok café known for its earthy matcha lattes, black sesame parfait, and beautifully minimal interior. One of the most photogenic spots in Bukchon.",
      },
      {
        from: "EOE Seoul Café",
        to: "Zero Space",
        details: "Zero Space is literally steps away in the same Bukchon alleys — about a 1 minute walk. Allow 20–30 minutes to browse at your own pace. Note from Tiffany: she would love a cute souvenir from here! 🎁",
        tags: [{ type: "walk" as const, label: "Walk", time: "1 min" }],
        mapsDestination: "Zero Space Bukchon, Seoul",
        naverMapsDestination: "제로스페이스 북촌",
        description: "A beloved Bukchon shop packed with tiny handcrafted souvenirs — enamel keychains, pins, magnets, postcards, and passport cases. Everything is cute, lightweight, and perfect to carry home as gifts.",
        tips: [
          { type: "timing" as const, text: "Closes at 7pm — plenty of time this afternoon." },
        ],
      },
      {
        from: "Zero Space",
        to: "Kachi Seoul",
        details: "A 3–5 minute walk through the same Bukchon neighborhood. Browse handmade crafts inside a beautiful traditional hanok and grab a cold brew or traditional Korean drink while you shop.",
        tags: [{ type: "walk" as const, label: "Walk", time: "3 min" }],
        mapsDestination: "Kachi Seoul, Bukchon, Seoul",
        naverMapsDestination: "가치서울 북촌",
        description: "A souvenir and gift shop set inside a restored hanok courtyard, known for traditional Korean crafts, ceramics, fabric goods, and unique keepsakes. Order a cold brew or traditional sikhye drink and browse at a relaxed pace.",
        tips: [
          { type: "closed" as const, text: "Closes at 5pm — make sure to arrive by 4:30pm at the latest." },
        ],
      },
      {
        from: "Kachi Seoul",
        to: "Jungdamun Bukchon (Dinner)",
        details: "Both are in the same Bukchon area. Very close — just a short stroll.",
        tags: [{ type: "walk" as const, label: "Walk", time: "3 min" }],
        mapsDestination: "Jungdamun Bukchon, Seoul",
        naverMapsDestination: "중담원 북촌",
        image: "https://lh3.googleusercontent.com/place-photos/AL8-SNE3oHji0iGTu0WN-f7KG4jIx1oJAnyfBPUEn6EKKM-5b6Y80J0DqlcFV3GSuoDWcfaiTLgzrpGHRzEvFUMbyxjrCz6EDcmkMQ28CtBDy6CB474vg3Yjv3n6jaeb3W5GiOtzHejNWZi5wBFD33uPF8F0=s800-w800-h600",
        description: "A refined, quiet Korean restaurant tucked inside Bukchon, beloved for its bossam (tender boiled pork with kimchi) and crispy seafood pajeon. Reserve ahead.",
        tips: [
          { type: "restaurant" as const, text: "Gets busy at lunch — worth calling ahead or arriving right at 11am opening." },
        ],
        alternative: {
          to: "Tosokchon Samgyetang (Dinner)",
          details: "Take a short taxi from Bukchon — about 5 minutes and under 5,000 won. The restaurant is large and easy to find, right near Gyeongbokgung Palace.",
          description: "A legendary Seoul institution serving whole chicken stuffed with ginseng, glutinous rice, and jujube in a rich golden broth. Warming, nourishing, and deeply satisfying after a day of walking.",
          mapsDestination: "Tosokchon Samgyetang, Seoul",
          naverMapsDestination: "토속촌삼계탕",
          tips: [
            { type: "timing" as const, text: "Go early for dinner — it fills up fast. Arriving at 5:30–6pm avoids the peak crowd." },
          ],
        },
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
        naverMapsDestination: "코트야드바이메리어트서울남대문",
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
        naverMapsDestination: "창덕궁 후원",
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
        naverMapsDestination: "차뜰",
        image: "https://lh3.googleusercontent.com/places/ANXAkqG2hN1EViDZs4v79jGDbYRXqH0q3qPypfpn5F3R98z6sf9vJq6nu3c1uv4lesmirz1r8cJ7gW1EpHDlbJLgLepOEaZUmKmVHVo=s800-w800-h600",
        description: "A traditional Korean teahouse perched in the Bukchon village with views over the rooftops. Staff walk you through the tea steeping ritual — try the rice cakes and honey biscuits.",
      },
      {
        from: "Chatteul Teahouse",
        to: "Mansuui Jeongwon (Lunch)",
        details: "Both are in the Bukchon area — very close to each other!",
        tags: [{ type: "walk" as const, label: "Walk", time: "5 min" }],
        mapsDestination: "Mansuui Jeongwon, Seoul",
        naverMapsDestination: "만수의정원",
        image: "https://lh3.googleusercontent.com/place-photos/AL8-SNFuKjXUglG-49DZx1rWwHUPKLIb4IaD50YWwQihAvJcwm-OuVZnn7uUNcAUfvXfvIYCFm9K8OCVV8Y2ZPz4hpaO97a9x2t5cOY1s96hCZ53RK0Zuw3H-W2KjxCenhWyXMYDwxhyzFn3u2OhqI2QDgz4Cg=s800-w800-h600",
        description: "A warm, homestyle Korean gem near Bukchon serving comforting bowls of bulgogi, kimchi jjigae, and haemul pajeon. Feels like eating at a Korean grandmother's house.",
        alternative: {
          to: "Jaha Son Mandu (Lunch)",
          details: "A short walk downhill from the Changdeokgung area — follow the signs toward Buamdong. Small and quiet, easy to find.",
          description: "A quiet, beloved dumpling house tucked below Changdeokgung, known for delicate handmade mandu — steamed, pan-fried, or floating in a clear broth. Simple, deeply local, and very comforting.",
          mapsDestination: "Jaha Son Mandu, Seoul",
          naverMapsDestination: "자하손만두",
          tips: [
            { type: "timing" as const, text: "Arrives early for lunch — seats fill up quickly around noon on weekends." },
          ],
        },
      },
      {
        from: "Mansuui Jeongwon",
        to: "Insadong Culture Street",
        details: "Walk southwest toward Insadong for a final afternoon of shopping, souvenirs, and exploring at your own pace.",
        tags: [{ type: "walk" as const, label: "Walk", time: "10 min" }],
        mapsDestination: "Insadong, Seoul",
        naverMapsDestination: "인사동",
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
        naverMapsDestination: "코트야드바이메리어트서울남대문",
      },
    ],
  },
]

const tips = [
  {
    icon: <CreditCard className="size-6" />,
    title: "T-money Card — Only If You Take the Subway or Bus",
    description: "If you plan to ride the subway or bus, pick up a T-money card at Incheon Airport or any convenience store (GS25, CU, 7-Eleven) — it costs 2,500 won. Load it with cash and tap it to pay. If you are only taking taxis, you do not need it at all.",
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
  {
    icon: <Receipt className="size-6" />,
    title: "Keep Receipts for a Tax Refund at the Airport",
    description: "Korea has a tourist VAT refund system. If you spend 30,000 won or more at a participating store (look for the 'Tax Free' sign in the window), keep the receipt. Before you fly home, visit the tax refund desk at Incheon Airport to get about 10% back. Free money!",
  },
]

export default function SeoulItinerary() {
  const [activeDay, setActiveDay] = useState(1)

  return (
    <>
      {/* Main scrollable content */}
      <div
        className="min-h-screen bg-background"
        style={{ paddingBottom: "calc(80px + env(safe-area-inset-bottom))" }}
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

          {/* Day itinerary content */}
          {itinerary.map((day) => (
            <DayCard
              key={day.day}
              day={day.day}
              title={day.title}
              legs={day.legs}
              isActive={activeDay === day.day}
            />
          ))}

          {/* Info tab: Hotel + Tips */}
          {activeDay === 0 && (
            <>
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
                    naverDestination="코트야드바이메리어트서울남대문"
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

              {/* Tips */}
              <TipsSection tips={tips} />

              <footer className="text-center py-6 flex flex-col gap-2">
                <p className="text-xl font-bold text-card-foreground font-sans">
                  Have so much fun mom!
                </p>
                <p className="text-lg text-muted-foreground font-sans">
                  We love you! 🇰🇷
                </p>
              </footer>
            </>
          )}
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
