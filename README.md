# Ordliste Norsk ↔️ Engelsk

En webapp med ordliste for engelsk–norsk og norsk–engelsk. Den kjøres fra GitHub Pages og virker i moderne nettlesere på mobil, nettbrett og datamaskin. Den kan installeres som en app (PWA) og brukes helt uten nett.

**Åpne appen:** https://skalltje.github.io/ordliste/

Ordlisten er basert på *Pedersen K. Ordliste*, med rundt 1000 ordpar. Mange av dem er kristne og bibelske uttrykk, som *nåde → grace*, *Hellig Ånd → Holy Ghost* og *vekkelse → movement*.

## Funksjoner

- **Søk mens du skriver.** Søket skiller ikke mellom store og små bokstaver, og æ, ø og å behandles som egne bokstaver.
- **Begge retninger:** Engelsk → Norsk og Norsk → Engelsk.
- **Treff sortert etter relevans:** eksakte treff først, så ord som starter med søket, så resten.
- **Detaljvisning** med alle betydninger og merknader som «gammelt ord». Et trykk på en oversettelse slår den opp i motsatt retning.
- **Favoritter** (☆) og **siste søk**, lagret på enheten.
- **Offline:** Etter første besøk kan appen brukes uten nett, også i flymodus.
- **Samme utseende som [Læstadiansk prekensøk](https://skalltje.github.io/prekensok/):** mørkt blågrått tema med salviegrønn aksent.

## Bruk og installering

Appen kan brukes rett i nettleseren på https://skalltje.github.io/ordliste/, uten installering. Vil du ha den som en egen app med ikon, gjør du slik:

| Enhet | Slik installerer du |
|---|---|
| **iPhone / iPad** | Åpne adressen i Safari, trykk **Del** (firkant med pil opp) og velg **Legg til på Hjem-skjerm** |
| **Android** | Åpne adressen i Chrome, åpne menyen **⋮** og velg **Installer app** eller **Legg til på startsiden** |
| **Mac / Windows / Linux** | Åpne adressen i Chrome eller Edge og klikk installer-ikonet i adressefeltet. I Safari på Mac: **Fil → Legg til i Dock** |

Åpne appen én gang mens du har nett. Etter det virker den offline, både installert og i nettleseren.

Når en ny versjon er publisert, viser appen *«En ny versjon av ordlisten er klar»* neste gang den åpnes med nett. Trykk **Oppdater**.

## Skrifttype

Appen bruker [Source Sans 3](https://github.com/adobe-fonts/source-sans), © 2010–2024 Adobe, med Reserved Font Name «Source». Skrifttypen er lisensiert under [SIL Open Font License 1.1](https://openfontlicense.org). Den er bygd inn i `index.html`, slik at den også virker offline.

## Personvern

Appen har ingen sporing, ingen informasjonskapsler og ingen server-del. GitHub Pages leverer bare de statiske filene. Favoritter og søkehistorikk lagres bare i nettleserens `localStorage` på din egen enhet, og hver nettleser og installert app har sin egen kopi. Avinstallerer du appen eller tømmer nettstedsdata, forsvinner de.

## Innhold i repoet

Repoet inneholder den ferdigbygde webappen som GitHub Pages publiserer fra grenen `main`:

| Fil | Beskrivelse |
|---|---|
| `index.html` | Hele appen: HTML, CSS, JavaScript, skrifttype og ordlisten (JSON) i én fil, uten eksterne avhengigheter |
| `sw.js` | Service worker som lagrer filene for offline-bruk |
| `manifest.webmanifest` | PWA-manifest med navn, farger og ikoner |
| `icon-*.png` | App-ikoner: 180 px for iOS, 192/512 px for Android og datamaskin, og et maskerbart ikon |
| `.nojekyll` | Får GitHub Pages til å vise filene uendret |

> **Ikke rediger disse filene direkte.** De genereres av et byggescript. Endringer gjort her blir overskrevet ved neste bygg.

## Bygge og publisere

Kildedataene (Excel) og byggescriptet ligger i et eget, privat prosjekt med denne strukturen:

```
ordliste-app/
├── data/      Excel-filene (engelsk-norsk og norsk-engelsk), endres aldri av scriptet
├── scripts/   build.py, template.html, sw.js
└── dist/      byggeresultatet = dette repoet
```

Slik publiserer du en ny versjon etter at ordlistene er oppdatert:

```bash
pip3 install openpyxl          # bare første gang
python3 scripts/build.py
cd dist && git add -A && git commit -m "Oppdatert ordliste" && git push
```

`build.py` gjør dette:

- leser begge Excel-filene og advarer hvis de ikke lenger er speilvendte versjoner av hverandre
- rydder i teksten (mellomrom, Unicode) og slår sammen duplikater
- sorterer etter norsk alfabet
- lager app-ikonene
- setter en ny versjon i service workeren når innholdet er endret, slik at installerte apper blir oppdatert

GitHub Pages publiserer automatisk fra grenen `main` i løpet av et par minutter.
