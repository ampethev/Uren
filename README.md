# Urenberekenaar

Een lichte, installeerbare PWA voor iOS en Android. Geen login, database of servercode nodig.

## Publiceren via GitHub + Vercel

1. Open https://github.com/new en maak een **nieuwe repository** `urenberekenaar` aan. Kies *Private* als je de broncode privé wilt houden (de publieke app-URL blijft wel toegankelijk). Klik **Create repository**.
2. Open de repository en kies **Add file → Upload files**. Pak `urenberekenaar.zip` eerst uit op je computer en sleep **alle bestanden én de map `icons`** uit de uitgepakte map naar GitHub. Zorg dat `index.html` in de hoofdmap van de repository staat, **niet** in een extra submap. Kies **Commit changes**.
3. Ga naar https://vercel.com/new, meld je aan en kies **Import Git Repository**. Koppel GitHub indien gevraagd en selecteer `urenberekenaar`.
4. Framework Preset: **Other**. Root Directory: `./`. Er zijn **geen** environment variables, build commands of databank nodig. Klik **Deploy**.
5. Open de verkregen URL (zoals `https://urenberekenaar-....vercel.app`) op je telefoon.

## Toevoegen aan het beginscherm

**iPhone (Safari):** open de Vercel-URL in Safari → Deel-knop → **Zet op beginscherm** / **Voeg toe aan beginscherm** → Voeg toe.

**Android (Chrome):** open de Vercel-URL in Chrome → menu ⋮ → **App installeren** of **Toevoegen aan startscherm** → bevestigen.

## Gebruik

- Scroll bij start- en einduur om per kwartier een tijdstip te selecteren; tik op een tijd om direct te springen.
- Kies pauze via de knoppen of het menu Andere pauzeduur (0 tot 12 uur in stappen van 15 minuten).
- Het resultaat wordt meteen bijgewerkt.
- Tik op het zon/maan-icoon om te wisselen tussen **Automatisch → Licht → Donker**.
- De laatste starttijd, eindtijd, pauze en kleurmodus worden in de lokale opslag van de browser/app onthouden. Wis je die opslag, dan verdwijnen de voorkeuren.
- Een einduur dat vroeger is dan de starttijd wordt opgevat als **de volgende dag**. Een identiek begin- en einduur betekent **0 uur**, niet 24 uur.

## Technisch

HTML/CSS/JavaScript + webmanifest + service worker; statische hosting via HTTPS. Na een eerste online bezoek is offline gebruik mogelijk zodra de bestanden gecachet zijn. Deze tool bewaart geen historiek en verstuurt geen persoonlijke gegevens naar een databank.
