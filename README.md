# Ordliste Norsk ↔️ Engelsk

En liten ordliste-app for engelsk–norsk og norsk–engelsk, laget for iPhone. Den virker helt uten nett når den er installert.

**Åpne appen:** https://skalltje.github.io/ordliste/

Ordlisten er basert på *Pedersen K. Ordliste*, med rundt 1000 ordpar. Mange av dem er kristne og bibelske uttrykk, som *nåde → grace*, *Hellig Ånd → Holy Ghost* og *vekkelse → movement*.

## Funksjoner

- **Søk mens du skriver.** Søket skiller ikke mellom store og små bokstaver, og æ, ø og å behandles som egne bokstaver.
- **Begge retninger:** Engelsk → Norsk og Norsk → Engelsk.
- **Treff sortert etter relevans:** eksakte treff først, så ord som starter med søket, så resten.
- **Detaljvisning** med alle betydninger og merknader som «gammelt ord». Et trykk på en oversettelse slår den opp i motsatt retning.
- **Favoritter** (☆) og **siste søk**, lagret på enheten.
- **Offline:** Etter første besøk kan appen brukes uten nett, også i flymodus.
- **Mørk og lys modus** etter systeminnstillingen.

## Installere på iPhone

1. Åpne https://skalltje.github.io/ordliste/ i **Safari**.
2. Trykk **Del** (firkant med pil opp) og velg **Legg til på Hjem-skjerm**.
3. Åpne appen fra Hjem-skjermen én gang mens du har nett. Etter det virker den offline.

Når en ny versjon er publisert, viser appen *«En ny versjon av ordlisten er klar»* neste gang den åpnes med nett. Trykk **Oppdater**.

Appen virker også i Android Chrome og nettlesere på datamaskin. I Chrome kan den installeres fra adressefeltet eller menyen.

## Personvern

Appen har ingen sporing, ingen informasjonskapsler og ingen server-del. Favoritter og søkehistorikk lagres bare i nettleserens `localStorage` på din egen enhet. Sletter du appen fra Hjem-skjermen, forsvinner de.

## Innhold i repoet

Repoet inneholder den ferdigbygde appen som GitHub Pages viser:

| Fil | Beskrivelse |
|---|---|
| `index.html` | Hele appen: HTML, CSS, JavaScript og ordlisten (JSON) i én fil, uten eksterne avhengigheter |
| `sw.js` | Service worker som lagrer filene for offline-bruk |
| `manifest.webmanifest` | PWA-manifest med navn, farger og ikoner |
| `icon-*.png` | App-ikoner, inkludert maskerbart ikon for Android |
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
