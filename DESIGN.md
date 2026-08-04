# OLTE App — Design System

Wartości bazowe wyekstrahowane bezpośrednio z `OLTE-App.fig` (fig-kiwi v101, 2206 węzłów, 2 strony).
Wszystko w sekcjach 1–7 to odczyty z pliku, nie interpretacje. Sekcje 9–13 dokumentują zmiany
architektury informacji, per-pokojową strukturę ekranów i audyt DS wdrożony po starcie projektu.

**Produkt:** aplikacja mobilna/B2B do monitorowania systemu grzewczego OLTE w budynku — bilans
budynku, temperatura i wilgotność per pomieszczenie, historia dobowa, porównanie sezonów,
jednostka centralna, harmonogram bazowy z nadpisaniem per pomieszczenie oraz własne tryby
budynku z konfiguracją temperatury, zakresu pomieszczeń, CWU i rekuperacji.
**Kanwa:** iPhone 393 × 852 px. Język interfejsu: polski.
**Źródło prawdy w kodzie:** `assets/olte.css` — poza blokiem `:root` i jego nadpisaniem dla
trybu ciemnego nie występuje w arkuszu żaden surowy hex.

---

## 1. Kolory

### Zmienne brandowe (kolekcja `Colors`, biblioteka zewnętrzna)

| Zmienna | Hex | Rola w aplikacji |
|---|---|---|
| `brand/ZIELEN` | `#478675` | akcent podstawowy — stan poprawny, aktywna zakładka |
| `brand/CEGLANY` | `#c55339` | sezon grzewczy, słupki bieżącego sezonu |
| `brand/BLEKIT` | `#6790d0` | informacja, wilgotność |
| `brand/KOSC` | `#f5f5f5` | tło neutralne |
| `brand/uzupelniajace/APP 1` | `#eb684b` | alert / temperatura (linia wykresu) |
| `brand/uzupelniajace/APP 1a` | `#eb7f67` | poprzedni sezon (słupki porównawcze) |
| `brand/uzupelniajace/APP 2` | `#f4c45f` | ostrzeżenie / nasłonecznienie |
| `brand/uzupelniajace/APP 4` | `#689c8c` | środek gradientu tarczy |
| `brand/uzupelniajace/APP 4a` | `#7ab1a0` | początek gradientu tarczy; akcent w trybie ciemnym |
| `brand/uzupelniajace/APP 5a` | `#88b1f3` | akcent chłodzenia |

### Styl wypełnienia — skala neutralna

| Styl | Hex | Użycie |
|---|---|---|
| `Neutral/0` | `#ffffff` | tło ekranu, powierzchnia kart |
| `Neutral/100` | `#e4e9e6` | obrysy kart, dzielniki (najczęstszy — 83 użycia) |
| `Neutral/200` | `#d3dad6` | chevrony, ikony nieaktywne |
| `Neutral/500` | `#737e79` | wartość źródłowa, kontrast 4,2:1 — od poz. 12 tylko elementy nietekstowe |
| `Neutral/550` | `#6b756f` | tekst drugorzędny, kontrast 4,8:1 (token `--muted`) |
| `Neutral/700` | `#3d4744` | tekst opisowy w blokach informacyjnych |
| `Neutral/900` | `#101614` | tekst podstawowy, aktywny dzień kalendarza |
| `obrysy` | `rgba(0,0,0,.30)` | obrys pomocniczy |

### Styl wypełnienia — akcent

`Primary/50` `#dceee4` · `Primary/100` `#e2f1ea` · `Primary/300` `#7ab1a0` · `Primary/500` `#478675`

Jedna zieleń w roli „wartość pozytywna" — `#478675`. Wariant `#1c7a41` z pliku został usunięty (poz. 4).

Dwa tokeny wypełnienia pod białym tekstem (poz. 13, wyszło przy kontroli kontrastu):

| Token | Hex | Kontrast z białym | Użycie |
|---|---|---|---|
| `--accent-strong` | `#42806f` | 4,6:1 | tło przycisku podstawowego |
| `--danger-strong` | `#c25036` | 4,7:1 | tło przycisku niszczącego, toast błędu |
| `--on-solid` | `#ffffff` | — | tekst na wypełnieniu barwnym, nie zmienia się z motywem |

Brandowe `#478675` z białym daje 4,26:1, a `#c55339` — 4,50:1; oba poniżej AA dla etykiety
14 px. Same barwy brandowe zostały nietknięte dla obrysów, tarcz, ikon i tekstu na białym.

### Styl wypełnienia — status

| Styl | Hex |
|---|---|
| `Status/High` | `#478675` |
| `Status/Mid` | `#f4c45f` |
| `Status/Low` | `#eb684b` |
| `Status/Info` | `#6790d0` |
| `Status/Off` | `#b6b4b4` |

### Styl wypełnienia — skala tarczy (Gauge)

`Gauge/Excellent` `#45a8a3` → `Gauge/High` `#41a083` → `Gauge/Good` `#88c588` →
`Gauge/Rising` `#d0eb8f` → `Gauge/Low` `#f39978` → `Gauge/Danger` `#ed6760`
`Gauge/Info-Light` `#79a1e0` · `Gauge/Info-Dark` `#5c7eed`

### Powierzchnie sygnalizacyjne — `Surface/*` (poz. 3)

Dziewięć tł, które w pliku działały jak system bez nazw, ma teraz nazwy i parę tekstową
o kontraście co najmniej 4,5:1.

| Styl | Tło | Obrys | Tekst `On/*` |
|---|---|---|---|
| `Surface/Success` | `#e6f4ec` | `#cde9d8` | `#2f6b58` |
| `Surface/Error` | `#fdf2f2` | `#fde2e2` | `#a3352a` |
| `Surface/Warning` | `#fefbf0` | `#fef3c7` | `#8a6410` |
| `Surface/Info` | `#f0f6ff` | `#dbeafe` | `#2560c0` |
| `Surface/Temp` | `#fce9e5` | — | `#b23a2e` |
| `Surface/Humidity` | `#e7f0fe` | — | `#2560c0` |
| `Surface/Solar` | `#fbefd8` | — | `Neutral/700` |
| `Surface/Offline` | `#eef0ef` | — | `Neutral/550` |
| `Surface/Track` | `#eef2f0` / `#f0f3f1` | — | — |

Reguła `On/*` obowiązuje wszystkie elementy tekstowe na powierzchniach sygnalizacyjnych —
nie tylko treść, ale też ikony i linki wewnątrz `.notif`, `.tagpill`, `.rr-sched`, `.rr-temp`
i analogicznych komponentów. Token barwy tonu (`--app-1`, `--app-2`) zostaje wyłącznie na
elementach nietekstowych (tła pigułek, kropki statusu, wypełnienia pod białym tekstem).

### Gradienty

| Nazwa | Definicja |
|---|---|
| Card Hero — stan dobry | `linear-gradient(180deg, #eaf6ef 0%, #ffffff 72%)` |
| Card Hero — stan średni | `linear-gradient(180deg, #fff7e6 0%, #ffffff 72%)` |
| Card Hero — stan zły | `linear-gradient(180deg, #ffebe0 0%, #ffffff 72%)` |
| Tarcza — dobry | `#7ab1a0` → `#689c8c` 55% → `#478675` |
| Tarcza — średni | `#ffeabd` → `#f4c45f` 55% → `#f4c45f` |
| Tarcza — zły | `#ffe2b7` → `#f3a847` 55% → `#eb684b` |
| Wypełnienie wykresu temperatury | `rgba(234,91,76,.28)` → `transparent` (do góry) |
| Wypełnienie wykresu wilgotności | `rgba(60,130,240,.26)` → `transparent` (do góry) |

### Kolory pomieszczeń — zamknięty zbiór dziesięciu tożsamości

Kolor pomieszczenia jest **etykietą, nie statusem**. Nie mówi nic o temperaturze, jakości
odczytu ani o poprawności czegokolwiek — służy wyłącznie rozpoznaniu pomieszczenia. Dlatego
nie wchodzi w miejsca zajęte przez skalę `Gauge/*` i `Status/*`.

Każda pozycja wywodzi się z tokenu już obecnego w palecie i przechodzi **3:1 na powierzchni
karty w obu motywach** (minimum 3,12:1 jasny, 3,92:1 ciemny), więc może nieść 27-punktową
kreskę tarczy i 22-punktowy glif bez korekty per motyw — tryb ciemny nie ma tu ani jednego
nadpisania.

Cztery pozycje są **przygaszone wobec swojego źródła**, każda z innego powodu. Indygo i Koral,
bo ich źródła (`--gauge-info-dark`, `--app-1`) mają rolę sygnałową i w pełnym nasyceniu
kolidowały znaczeniem. Amber i Ceglany, bo jako jedyne ciepłe pozycje palety ciążyły całemu
ekranowi pomieszczenia — kreska tarczy ma 27 px, a te dziesięć kolorów jest kalibrowane pod
glif 22 px. Przy obu ciepłych korekta idzie przez **nasycenie, nie przez hue**: to ta sama
barwa o mniejszym natężeniu. Hue Ceglanego zostało celowo nietknięte, żeby po stonowaniu nie
zbliżył się do Ambru (dystans Oklab 0,071; do Koralu 0,064 — powyżej najsłabszej pary palety,
którą jest Szmaragd–Morski z 0,036).

| Token | Wartość | Źródło | Kontrast na białym |
|---|---|---|---|
| `--room-zielen` | `#478675` | `--accent` | 4,26:1 |
| `--room-szalwia` | `#689c8c` | `--app-4` | 3,12:1 |
| `--room-szmaragd` | `#41a083` | `--gauge-high` | 3,19:1 |
| `--room-morski` | `#3f9c97` | korekta `--gauge-excellent` (`#45a8a3` dawał 2,84:1) | 3,27:1 |
| `--room-blekit` | `#6790d0` | `--brand-blekit` | 3,24:1 |
| `--room-indygo` | `#667fc6` | `--gauge-info-dark` stonowany (`#5c7eed` — token sygnałowy, na kresce 27 px krzyczał i kolidował rolą) | 3,88:1 |
| `--room-grafit` | `#737e79` | `--n-500` | 4,21:1 |
| `--room-amber` | `#937949` | `--on-warning` (`#8a6410`) rozjaśniony o 0,06 L i wytrącony z nasycenia o 30 % — pełna ochra ciążyła całemu ekranowi pomieszczenia | 4,14:1 |
| `--room-koral` | `#cb705c` | `--app-1` stonowany (`#eb684b` zajmuje rolę akcentu temperatury) | 3,49:1 |
| `--room-ceglany` | `#ac6656` | `--brand-ceglany` (`#c55339`) wytrącony z nasycenia o 38 % przy tej samej jasności i tym samym hue | 4,38:1 |

Zbiór jest **skończony** i nie rozszerza się dowolnym hexem ani próbnikiem barw. Dziesięć
pozycji to granica, przy której lista pomieszczeń pozostaje czytelna; paleta świadomie skłania
się w stronę zieleni i błękitów, bo tyle hue ma marka, a kolor **nigdy nie jest jedynym
nośnikiem znaczenia** — zawsze towarzyszy mu ikona i nazwa.

**Rola bieżącego pomieszczenia.** `--room` ustawia się na `.screen` (ekran pomieszczenia,
formularz) albo na `.roomrow` (wiersz listy); bez przypisania sprowadza się do `var(--accent)`,
więc ekran bez koloru wygląda tak jak przed wprowadzeniem palety. Warianty **nie są tokenami**
— token rozwiązałby `var(--room)` raz na `:root` i przestał reagować na nadpisanie niżej
w drzewie. Zamiast tego każda rola jest liczona `color-mix()` w regule komponentu:

| Rola | Wyliczenie | Użycie | Minimum |
|---|---|---|---|
| tożsamość | `var(--room)` | próbka w wyborze, glif ikony | 3,12:1 na karcie |
| ink | `color-mix(in oklch, var(--room) 66%, var(--fg))` | glif ikony, nazwa przy hover | 5,99:1 na karcie |
| rampa tarczy | `color-mix(in oklch, var(--room-warm) f%, var(--room-cool))` | łuk nadanej temperatury: chłodny koniec przy 15 °C → ciepły przy 26 °C | 3,05:1 wobec `--track` |
| nadana temperatura w tarczy | `color-mix(in oklch, <ton rampy> 66%, var(--fg))` | wielka liczba w środku tarczy | 6,10:1 na karcie |
| tint | `color-mix(in oklch, var(--room) 14%, var(--surface))` | tło ikony pomieszczenia | glif na tincie 5,21:1 |

**Gdzie kolor się pojawia i gdzie nie.** Na liście: wyłącznie tło i glif ikony
(`.iconbox--room`) plus podświetlenie nazwy przy hover — bez kolorowego paska i bez obwódki
wiersza, bo wiersz nosi już cztery inne nośniki znaczenia. Na ekranie pomieszczenia: pasek
tożsamości i rampa tarczy. **Stan offline wygrywa z tożsamością** — Kotłownia
zachowuje przypisany kolor w danych, ale jej ikona zostaje wygaszona (`.iconbox--off`), bo
wiersz bez odczytu nie może wyglądać na aktywny.

| Pomieszczenie | Kolor | Nadana temperatura |
|---|---|---|
| Sypialnia AJ | Indygo | 20,5 °C |
| Sypialnia Ala | Błękit | 22,5 °C |
| Salon AJ | Amber | 23,0 °C |
| Kuchnia | Ceglany | 23,0 °C |
| Łazienka | Morski | 22,0 °C |
| Gabinet | Szmaragd | 19,0 °C (eco) |
| Kotłownia | Grafit (wygaszony — offline) | — |

Zieleń, Szałwia i Koral zostają nieprzypisane — są dostępne w wyborze dla nowych pomieszczeń.
Nowe pomieszczenie startuje na **Room/Zieleń**, czyli na tym samym kolorze, który przyjmuje
ekran bez przypisania.

**Rampa tarczy.** Kolorowy łuk (`.dial-arc-temp`) rośnie od początku skali do nadanej temperatury
na neutralnej podstawie (`.dial-arc-basis`, `--track`), a jego barwa to **ton z zakresu
pomieszczenia** dla bieżącej nadanej temperatury: `--room-cool` przy 15 °C, `--room-warm` przy 26 °C,
tożsamość w środku zakresu (ok. 20,5 °C). Przeciąganie kropki przeprowadza barwę przez ten
zakres płynnie i **percepcyjnie równo**, bo interpolacja idzie przez `color-mix(in oklch, …)`,
a nie przez sRGB, który przeszedłby przez odbarwiony środek.

Zakres obejmuje 48° hue, więc ruch prowadzi przez **jedną rodzinę barwną** — teal ↔ oliwka dla
zieleni, czysty niebieski ↔ fiołkowy dla błękitu — i nigdy nie wchodzi w cudzą rodzinę ani
w barwy sygnałowe `Gauge/*` / `Status/*`.

Rampa jest wyrażona wyłącznie jako `color-mix()` na tokenach zakresu — JS podstawia sam procent,
rozwiązywanie `var()` zostaje po stronie przeglądarki. To celowe: gdy kolory były liczone w JS
z `getComputedStyle().color`, silnik serializował wynik `color-mix()` jako `oklch()`, więc naiwny
odczyt trzech liczb dawał `rgb(1, 0, 275)` — jaskrawy niebieskofiolet identyczny w każdym
pomieszczeniu, niezależny od tożsamości.

Gradient łuku ma dwa przystanki: głowa na tonie nadanej temperatury, ogon o 35 punktów skali chłodniej.
Tyle wystarcza na sheen zdradzający kierunek ruchu; więcej robiłoby z łuku dwubarwny pasek.
Uchwyt zostaje biały (`--surface`) z pierścieniem o 22 % głębszym od łuku — wypełniony kolorem
łuku zlewałby się z nim.

**Zakres barwowy pomieszczenia.** Oba końce są wyprowadzone z tożsamości jedną regułą, nie
doborem na oko: hue obrócony o **24°** w stronę osi chłodnej (240°) i ciepłej (50°), kierunkiem
krótszego łuku — dzięki temu „chłodniej" znaczy to samo dla zieleni, błękitu i cegły. Jasność
±0,035, chroma ×0,92 na chłodnym i ×1,06 na ciepłym końcu (ciepło jest nieco gęstsze).

Jasność chłodnego końca jest dodatkowo ograniczona progiem 3,05:1 wobec podstawy `--track`,
więc sześć pozycji ma go niżej niż +0,035 — inaczej najjaśniejsze tożsamości gubiłyby krawędź
łuku na jasnym tle. Zmierzone na całym przebiegu, motyw jasny / ciemny: łuk wobec podstawy
min **3,05 / 3,12:1**, biały uchwyt wobec łuku **3,45 / 3,41:1**, pierścień uchwytu wobec
uchwytu **5,07 / 5,03:1**, wielka liczba nadanej temperatury wobec karty **6,35 / 6,10:1**. Dystans
percepcyjny między końcami zakresu to 0,051–0,106 Oklab.

| Kolor | Chłodny (15 °C) | Ciepły (26 °C) | Charakter zakresu |
|---|---|---|---|
| Zieleń | `#4f8f91` | `#4d7a57` | teal → oliwka |
| Szałwia | `#5f9394` | `#6a9070` | najwęższy (0,051) — L ograniczona progiem |
| Szmaragd | `#319897` | `#55935a` | |
| Morski | `#4694a6` | `#419274` | |
| Błękit | `#4c90be` | `#7c7bc6` | niebieski → fiołkowy |
| Indygo | `#4e8fc3` | `#7b6ab8` | najszerszy (0,106) |
| Grafit | `#718b8a` | `#677666` | chroma dociągnięta do 0,030, inaczej neutralna tożsamość nie miałaby zakresu |
| Amber | `#8d8a5a` | `#956744` | khaki → ochra |
| Koral | `#c77080` | `#be6935` | |
| Ceglany | `#b3707a` | `#9f5f38` | |

Zakresy sąsiednich tożsamości mogą na siebie zachodzić: chłodny Szmaragd leży 0,016 Oklab od
Morskiego, przy 0,036 dystansu między samymi tożsamościami. W produkcie to nie koliduje — zakres
pojawia się na jednej tarczy naraz, a tożsamość niesie ikona i nazwa.

**Przypisanie klasą.** Tam, gdzie jest tarcza nadanej temperatury, kolor przypisuje się klasą
`.room--<nazwa>`, która ustawia całą trójkę naraz (`--room`, `--room-cool`, `--room-warm`) —
więc nie da się przypisać ekranowi szmaragdowej ikony i morskiego łuku. Konteksty, które niosą
wyłącznie tożsamość (wiersz listy, próbka w wyborze koloru), ustawiają samo `--room` inline.

---

## 2. Typografia

Dwie rodziny, bez trzeciej: **Manrope** (nagłówki, wartości liczbowe) + **Instrument Sans**
(tekst interfejsowy, etykiety). `Inter` z ośmiu miejsc w pliku został zmapowany na jedną
z tych dwóch zgodnie z rolą (poz. 1).

Rozmiary pochodzą z jednej skali tokenów — szesnaście stopni, żadnego z przecinkiem (poz. 2):

```
--fs-10 --fs-11 --fs-12 --fs-13 --fs-14 --fs-15 --fs-16 --fs-17
--fs-18 --fs-19 --fs-20 --fs-23 --fs-26 --fs-42 --fs-45 --fs-56
```

| Styl tekstowy | Rodzina / grubość | Rozmiar / interlinia |
|---|---|---|
| `Heading 1` | Manrope Bold | 23 / 31 |
| `Heading 2` | Manrope Bold | 18 / 25 |
| `Label` | Manrope Bold | 14 / 19 |
| `Value` | Manrope SemiBold | 15 / 20 |
| `Body` | Instrument Sans Regular | 12 / 16 |
| `Link` | Instrument Sans SemiBold | 12 / 16 |
| `Small` | Instrument Sans Regular | 10 / 14 |
| `Caption` | Manrope SemiBold | 10 / 14 |

Stopnie wyświetlaczowe używane na ekranach:

- Tytuł paska nawigacji — Manrope Bold 20 / 27
- Nagłówek sekcji — Manrope ExtraBold 19 / 26
- Duża liczba (metryka karty, suma sezonu) — Manrope ExtraBold 26 / 35
- Wynik bilansu budynku (`92/100`) — Manrope ExtraBold 42 / 50
- Bardzo duża metryka (`80%`) — Manrope ExtraBold 56 / 64
- Odczyt tarczy pomieszczenia — Manrope Regular 45 / 56
- Etykieta zakładki nawigacji — Instrument Sans Medium 11 / 15
  (w pliku 11,5 / 15,5 — zaokrąglone)

---

## 3. Siatka i odstępy

- Kanwa: **393 × 852**
- Pasek statusu: 54 px (padding 30 / 26)
- Pasek nawigacji górny: 58 px (68 px przy tytule dwuwierszowym), padding 20 px
- Obszar treści: padding 20 px po bokach, odstęp między sekcjami **16 px**
  (ekran startowy: 16 px po bokach)
- Dolna nawigacja: 85 px (padding 10 / 24 / 30 / 24), trzy zakładki, cel dotyku 44 px
- Pasek akcji formularza: 12 / 20 / 26 px, przyciski dzielą szerokość równo
- Wnętrze karty: padding 18–20 px, wnętrze karty kompaktowej 14 / 16 px
- Odstępy wewnętrzne: 4 · 6 · 8 · 12 · 14 · 16 px
- Toast: 97 px nad dolną krawędzią — zawsze nad nawigacją

## 4. Promienie — pięć wartości (poz. 5)

| Token | Wartość | Zastosowanie |
|---|---|---|
| `--r-sm` | 10 | mała ikona, pasek dobowy |
| `--r-md` | 12 | kontener ikony, pole formularza, przycisk |
| `--r-lg` | 14 | kafel dnia, chip metryki, karta-link, kontener 44 px |
| `--r-xl` | 22 | karta główna, arkusz dolny, dialog, stepper |
| `--r-pill` | 999 | pigułki, paski postępu, kropki statusu, znaczniki legendy |

Wartości 1, 2, 3, 5, 8, 11, 13, 16, 50 px z pliku były jednorazowe i zostały podciągnięte
do najbliższego stopnia.

## 5. Cienie

```
--shadow-sm:    0 1px 2px rgba(16,22,20,.04)
--shadow-md:    0 1px 3px rgba(16,22,20,.12)
--shadow-lg:    0 8px 24px rgba(16,22,20,.05)
--shadow-raise: 0 1px 2px rgba(16,22,20,.18)     /* przycisk podstawowy */
--shadow-inset: inset 0 -2px 0 rgba(16,22,20,.14) /* krawędź dolna przycisku */
--shadow-over:  0 -12px 40px rgba(16,22,20,.22)   /* arkusz dolny */
```
Karty łączą `lg` z `sm` — miękkie podniesienie bez wyraźnego rzutu.

## 6. Komponenty

### Z pliku Figmy (66 symboli)

| Komponent | Warianty | Uwagi |
|---|---|---|
| **Card Hero** | `Status = High / Mid / Low` | tarcza bilansu budynku, 3 chipy metryk, blok podsumowania |
| **Chips row** | `Status = High / Mid / Low` | Oszczędność · Śr. w budynku · Komfort |
| **Notification** | `Type = Success / Info / Warning / Error` | ikona 38 px, tytuł, opis, link |
| **Status dot** | `State = OK / Active / Info / Alert / Off` | kropka 7 px + etykieta |
| **Room List Item** | — | ikona 44 px, nazwa, status, temperatura, wilgotność, chevron |
| **Room Icon** | 44 warianty | zestaw Lucide; w kodzie 11 wariantów pomieszczeń |
| **Week Calendar** | — | 7 kafli 45 × 56, aktywny na `Neutral/900` |
| **Metric toggle** | `Active = Temperatura / Wilgotność` | segment w pigułce |
| **Chart card** | `Type = Temperatura / Wilgotność` | wykres dobowy + legenda min/max |

### Dołożone w kodzie (poz. 6, 7, 9, 10)

| Komponent | Klasa | Stany / warianty |
|---|---|---|
| Przycisk | `.btn` | podstawowy · `--ghost` · `--quiet` · `--danger` · `--danger-quiet` · `--sm` · `--block`; hover, wciśnięcie, `disabled`, `:focus-visible` |
| Szkielet ładowania | `.skeleton` | linia · `--box` · `--tile` |
| Stan pusty | `.emptystate` | domyślny · `--error` · `--offline` |
| Pasek nieaktualnych danych | `.stalebar` | ostrzeżenie · `--error` · `--off` |
| Pole formularza | `.field` + `.input` / `.textarea` / `.select` | spoczynek, hover, fokus, `aria-invalid`, `disabled` |
| Przełącznik | `.switch` | wyłączony · włączony · `disabled` |
| Stepper | `.stepper` | krok 0,5 °C, przyciski 44 px, wygaszenie na granicy zakresu |
| Suwak | `.slider` | tor wypełniany zmienną `--fill` |
| Wybór ikony | `.iconpick` | siatka 6 lub 7 kolumn, `aria-pressed` |
| Wiersz ustawień | `.listrow` | etykieta, opis, wartość, chevron lub przełącznik |
| Wiersz bloku harmonogramu | `.slotrow` | aktywny · `is-off` |
| Pasek dobowy | `.daystrip` | segmenty proporcjonalne do czasu + oś godzin |
| Arkusz dolny | `.sheet` + `.scrim` | uchwyt, nagłówek, treść przewijalna, akcje |
| Dialog | `.dialog` | wyłącznie decyzje nieodwracalne |
| Toast | `.toast` | potwierdzenie · `--error`, znika po 2,6 s |

### Ikony — wyłącznie Lucide

Jedyne źródło ikon w projekcie to **Lucide**, pakiet `lucide-static@1.27.0`. Geometria w sprite
`assets/icons.js` jest wklejona z pakietu 1:1 — nic nie jest rysowane odręcznie ani domykane
„na oko", bo właśnie stąd brały się koślawe kształty w poprzedniej wersji. Sprite ma **73 symbole**.

| Zasada | Wartość |
|---|---|
| Nazewnictwo | `id` symbolu = dokładna nazwa ikony w Lucide → `#i-thermometer` to `thermometer` z biblioteki |
| Siatka | 24 × 24, `viewBox="0 0 24 24"` |
| Obrys | `stroke-width: 2`, zaokrąglone zakończenia i połączenia, stała grubość w każdym rozmiarze |
| Kolor | `currentColor` — ikona dziedziczy kolor tekstu, własnego hexa nie ma |
| Wypełnienie | `fill: none`; wariantów wypełnionych nie dorabiamy |
| Rozmiary | 17 px pasek statusu · 18 px przycisk i wiersz · 20 px nagłówek · 22 px w kontenerze 44 px · 38 px powiadomienie |
| Dodanie ikony | pobrać z Lucide i dopisać wpis do sprite'u — nigdy nowy rysunek, nigdy inny zestaw |

**Wyjątek od „wypełnienie: none":** ikona serca ulubionych (`i-heart`, 6× `room-<slug>-glowny.html`)
dostaje wypełnienie wyłącznie jako oznaczenie stanu włączonego — `svg.style.fill =
'currentColor'` w handlerze kliknięcia, zdjęte z powrotem na `'none'` po wyłączeniu. To jedyny
komponent w projekcie z wypełnioną ikoną; uzasadnienie: UX rozpoznawania „ulubione"/„nie
ulubione" na pierwszy rzut oka jest silniejszy niż konsekwencja reguły `fill: none`. Ten sam
handler przełącza `aria-pressed` i `aria-label` („Dodaj do ulubionych" / „Usuń z ulubionych"),
żeby czytnik ekranu ogłaszał aktualny stan, nie tylko domyślny.

Nazwy zaktualizowane do aktualnego katalogu Lucide: `alert-triangle` → `triangle-alert`,
`alert-circle` → `circle-alert`, `more-horizontal` → `ellipsis`, `sliders` → `sliders-vertical`.
Pasek statusu korzysta z `signal`, `wifi` i `battery-full` zamiast dawnych własnych rysunków `sb-*`.
Pełna galeria z nazwami: sekcja **Ikonografia** w `design-system.html`.

Ikony pomieszczeń mają nazwy Lucide, więc zestaw jest odtwarzalny w kodzie 1:1. Katalog liczy
19 pozycji: `bed`, `bed-double`, `baby`, `sofa`, `bath`, `shower-head`, `cooking-pot`, `utensils`,
`monitor`, `washing-machine`, `dumbbell`, `hammer`, `server`, `piano`, `flower-2`, `car`, `tv`,
`book-open`, `warehouse`. Picker (`07`, `12`) pokazuje 21 przycisków — te 19 plus `flame`
(kotłownia) i `door-open` (przedpokój) — w siatce 7 kolumn, czyli trzy pełne rzędy.
Nowa ikona zawsze pochodzi z pakietu Lucide pobranego 1:1; `piano` i `flower-2` są w zestawie,
bo pokój muzyczny i ogród zimowy to pomieszczenia wrażliwe na wilgotność.

## 7. Ekrany

### Przeniesione z pliku

Sześć ekranów odczytanych z `OLTE-App.fig`. Ich zawartość i struktura żyją teraz jako
komplet **Sypialni AJ** (`room-sypialnia-aj-*`, patrz §10) — oryginalne nazwy plików
(`02-pokoj-glowny`, `01-historia-temperatura`, `01-historia-wilgotnosc`,
`03-podsumowanie-pokoju`, `04-porownanie-sezonow`) zostały zastąpione przekierowaniami,
bo środowisko tego prototypu nie pozwala na usuwanie plików.

| Plik źródłowy (z Figmy) | Wymiary w Figmie | Zastąpiony przez |
|---|---|---|
| `05-ekran-startowy` | 393 × 1203 | — (bez zmian nazwy, treść zaktualizowana w §9) |
| `02-pokoj-glowny` | 393 × 852 | `room-sypialnia-aj-glowny.html` |
| `03-podsumowanie-pokoju` | 393 × 852 | `room-sypialnia-aj-podsumowanie.html` |
| `01-historia-temperatura` | 393 × 852 | `room-sypialnia-aj-historia-temp.html` |
| `01-historia-wilgotnosc` | 393 × 852 | `room-sypialnia-aj-historia-wilg.html` |
| `04-porownanie-sezonow` | 393 × 1349 | `room-sypialnia-aj-sezony.html` |

### Dołożone w prototypie

Odczyty na tych ekranach są przykładowe — nie pochodzą z pliku Figmy.

| Plik | Domyka pozycję | Zawartość |
|---|---|---|
| `06-centralny` | 8 | konsola budynku: tryb budynku, korekta globalna, harmonogram bazowy inline, przełączniki grzania dla 7 pomieszczeń, temperatury obiegów, telemetria jednostki zwinięta — patrz §12a |
| `room-<slug>-edycja` (×7) | 9, 10 | nazwa, wybór ikony, stepper i suwak temperatury, przełączniki, dialog usunięcia |
| `08-harmonogram` | 9, 10 | cztery bloki dobowe, arkusz edycji bloku, kopiowanie na inne dni |
| `09-stany-danych` | 7 | diagnostyka czujników: ładowanie → błąd → dane, czujnik offline, pusta lista zgłoszeń |
| `10-zgloszenie-usterki` | — | formularz serwisowy: `select`, `textarea`, `notif--info`, dialog potwierdzenia — jedyne miejsce w prototypie, gdzie te komponenty DS są użyte |
| `11-pomieszczenia` | — | hub drugiej zakładki: centrum powiadomień (`notif--error/--warning`), rozpiska wszystkich pomieszczeń, przejście do formularza dodania |
| `12-dodaj-pomieszczenie` | — | formularz dodania: nazwa, wybór ikony, kondygnacja, stepper/suwak temperatury, przełączniki zachowania — „Zapisz” aktywuje się po wpisaniu nazwy |
| `13-dodaj-tryb` | — | formularz trybu własnego budynku: nazwa, ikona, zachowanie temperatur, zakres pomieszczeń, CWU, rekuperacja, zakończenie, podsumowanie live — patrz §12a |
| `tryb-goscie-edycja` | — | ten sam formularz wypełniony trybem Goście + usuwanie trybu; wejście ołówkiem z karty trybu w `06` |
| `room-<slug>-*` | — | komplet siedmiu ekranów per pomieszczenie (sześć pomieszczeń ogrzewanych) + dwa ekrany Kotłowni — patrz §10 |

---

## 9. Zmiana architektury informacji — Pokoje → Pomieszczenia (poz. 14)

Zatwierdzona zmiana po przeglądzie: druga zakładka nawigacji zmieniła nazwę z „Pokoje" na
„Pomieszczenia" i przestała być aliasem jednego przykładowego pokoju (`02-pokoj-glowny`).
Dostała własny ekran-hub.

- **`11-pomieszczenia`** — nowy ekran pod drugą zakładką. Centrum powiadomień na górze
  (`notif--error` dla czujnika offline, `notif--warning` dla wartości poza normą, oba linkują
  do konkretnego pomieszczenia lub do diagnostyki), pod nim pełna `.roomlist` wszystkich
  siedmiu pomieszczeń, CTA „Dodaj pomieszczenie" (`.btn--ghost.btn--block`) na dole i drugi
  wjazd do tego samego przepływu w `appbar` (`i-plus`). Formularz dodania pomieszczenia jest
  osobnym ekranem `12-dodaj-pomieszczenie.html`.
- **`05-ekran-startowy`** — sekcja „Twoje pokoje" (nagłówek, przycisk „Rozwiń", siedem
  wierszy `.roomlist`) usunięta w całości; ekran startowy kończy się teraz na powiadomieniu
  systemowym plus jedną karcianą kartą-linkiem do huba (`Wszystkie pomieszczenia`), żeby nie
  urywać się bez wejścia do zakładki.
- **Tabbar** — we wszystkich ośmiu ekranach, które go mają, druga zakładka wskazuje teraz
  `11-pomieszczenia.html` z etykietą „Pomieszczenia" (ikona `i-door-open` bez zmian). Na
  czterech ekranach (`01-historia-temperatura`, `01-historia-wilgotnosc`, `03-podsumowanie-pokoju`,
  `04-porownanie-sezonow`) usunięto błędny `aria-current="page"`, który wcześniej podświetlał
  zakładkę Pokoje mimo że te ekrany nie są tym hubem; `02-pokoj-glowny` zachował
  `aria-current`, bo detal pokoju semantycznie należy do kategorii Pomieszczenia.
- **Linki wewnętrzne do `02-pokoj-glowny.html`** poza tabbarem (przyciski „Wstecz"/„Zamknij"
  w `01`, `03`, `04`, `07`, wiersze diagnostyki w `09`) zostały sprawdzone i pozostały bez
  zmian: żaden nie reprezentuje „listy pokoi” semantycznie, wszystkie wracają do konkretnego
  pokoju (Sypialnia) w kontekście edycji lub podglądu czujnika.
- **Dług tolerowany:** `data-od-id="harmonogram-pokoju"` w 6× `room-<slug>-harmonogram.html`
  zachowuje starą nazwę „pokój" — to identyfikator maszynowy (celownik dla trybu komentarzy),
  nie tekst widoczny użytkownikowi, więc rebranding widocznej treści na „pomieszczenie” nie
  wymaga jego zmiany. Zmiana `data-od-id` po fakcie mogłaby zerwać istniejące odniesienia do
  tego identyfikatora poza tym plikiem; pozostaje bez zmian do wspólnej decyzji o rebrandingu
  identyfikatorów maszynowych w całym projekcie.

---

## 10. Siedem pomieszczeń — architektura per-pokój (poz. 15)

Zatwierdzona zmiana: jeden „uniwersalny" komplet ekranów pokoju (`02`/`01`×2/`03`/`04`),
odwiedzany przez wszystkie siedem wierszy huba, został zastąpiony **odrębnym kompletem siedmiu
plików dla każdego pomieszczenia**. Powód: appbar, historia i podsumowanie muszą zgadzać się
z pomieszczeniem, z którego przyszedł użytkownik — jeden wspólny plik to gwarantowana
niekonsekwencja przy siedmiu wierszach linkujących do tego samego miejsca.

### Nazewnictwo

```
screens/room-<slug>-glowny.html          tarcza temperatury, pigułki, arkusz opcji
screens/room-<slug>-edycja.html          nazwa, ikona, kolor, harmonogram, usunięcie
screens/room-<slug>-podsumowanie.html    metryka zgodności z harmonogramem, wnioski
screens/room-<slug>-historia-temp.html   wykres dobowy — temperatura
screens/room-<slug>-historia-wilg.html   wykres dobowy — wilgotność
screens/room-<slug>-sezony.html          porównanie sezonu grzewczego/chłodniczego
```

`<slug>`: `sypialnia-aj`, `salon-aj`, `lazienka`, `kuchnia`, `gabinet`, `sypialnia-ala`.
**Kotłownia** ma dwa pliki: `room-kotlownia-glowny.html` (patrz niżej) i
`room-kotlownia-edycja.html` — wariant okrojony bez harmonogramu/temperatury docelowej
(czujnik offline, nie bierze udziału w sterowaniu), tylko nazwa/ikona/kolor/czujnik/
kondygnacja/usunięcie.

### Tarcza pomieszczenia = nadana temperatura; wynik 0–100 zostaje przy budynku

Historycznie łuk tarczy pomieszczenia kodował **wynik pomieszczenia 0–100** w barwach
`Gauge/*`, a nadawanie temperatury przeciąganiem kropki przełączało go w drugi rejestr
kolorystyczny — kolor pomieszczenia. Ta zmiana barwy przy pierwszym dotknięciu czytała się
jak błąd, nie jak informacja, więc tarcza pomieszczenia ma dziś **jeden rejestr**: od
pierwszej klatki pokazuje nadaną temperaturę na neutralnej podstawie `--track`, w kolorze pomieszczenia.

Wynik pomieszczenia nadal istnieje i nadal jest wyliczany z tej samej tabeli progów poniżej —
komunikują go plakietka stanu, karta „Podsumowanie pomieszczenia" i opis `sr-only` tarczy.
Tarcza w konwencji wyniku zostaje na **tarczy bilansu budynku** (`05-ekran-startowy.html`,
92/100) i w specimenach `Gauge/*` w Design Systemie.

### Środek tarczy = nadana temperatura nad odczytami

W środku tarczy stoi **nadana temperatura**: podpis „Nadana temperatura" (`.t-eyebrow`) i wielka liczba
(`.dial-value .t-dial`, 45 px). Pod nią dwa opisane odczyty — zmierzona temperatura
(`.dial-now` + `.dial-now-cap`, 15 px) i wilgotność (`.dial-hum` + `.dial-hum-cap`, 13 px).

Zasada rozdziału: **wielka liczba to wartość, którą użytkownik ustawia** — zmienia się przy
przeciąganiu kropki. Odczyty pod nią stoją nieruchomo jako punkt odniesienia, więc dystans
„nadane vs. rzeczywiste" widać w jednym rzucie oka. Count-up wejścia jest blokowany
(`dataset.locked`) w momencie pierwszej interakcji, żeby animacja nie nadpisywała nadanej temperatury.
Konsekwencja: pigułki odczytów z górnego wiersza (`pill--temp` / `pill--hum`) zostały
z ekranów pomieszczeń usunięte — te dane są teraz w centrum, a zwolniony wiersz nosi pasek
tożsamości (ikona w kolorze pomieszczenia + kondygnacja + identyfikator czujnika).

Dwa rejestry koloru: **kolor = to, co ustawiasz, neutralny = to, co zmierzone.** Nadana temperatura bierze
**kolor pomieszczenia** pogłębiony w stronę `--fg` (66 % / 34 %, minimum 5,64:1 dla najsłabszej
pozycji palety) — sama tożsamość nie przechodzi 4,5:1 wymaganego dla tekstu. Odczyty zostają
na `--n-700`, a ich podpisy na `--muted`.

### Rampa łuku nadanej temperatury = zakres barwowy koloru pomieszczenia

Łuk nadanej temperatury trzyma się rodziny `--room` i ma się tak czytać **w każdym stanie — w spoczynku
i w trakcie przeciągania**. Jego barwa to ton z **zakresu** pomieszczenia dla bieżącej nadanej temperatury:
`--room-cool` przy 15 °C, `--room-warm` przy 26 °C, tożsamość w środku zakresu. Pełna definicja
końców, tabela dziesięciu zakresów i pomiary kontrastu są w sekcji 1 („Zakres barwowy
pomieszczenia").

Interpolacja idzie przez `color-mix(in oklch, …)`, więc przejście jest percepcyjnie równe i nie
przechodzi przez odbarwiony środek, jak zrobiłaby to interpolacja w sRGB. Zakres obejmuje 48° hue
— jedna rodzina barwna, nigdy cudza i nigdy barwa sygnałowa.

Rampa jest wyrażona **wyłącznie jako `color-mix()` na tokenach zakresu** — JS podstawia tylko
procent, nigdy gotowy `rgb()`. To wynik konkretnej awarii: gdy kolory były liczone w JS przez
sondę `getComputedStyle().color`, silnik serializował wynik `color-mix()` jako `oklch(…)`,
a naiwny odczyt trzech liczb dawał `rgb(1, 0, 275)` — jaskrawy niebieskofiolet identyczny
w każdym pomieszczeniu, niezależnie od jego tożsamości. Rozwiązywanie `var()` i `color-mix()`
zostaje po stronie przeglądarki.

Gradient łuku ma dwa przystanki: głowa na tonie nadanej temperatury, ogon o 35 punktów skali chłodniej —
sheen zdradzający kierunek ruchu, nie druga barwa. Uchwyt zostaje biały z pierścieniem o 22 %
głębszym od łuku. Kontrasty na całym przebiegu (najsłabsza pozycja palety, jasny / ciemny):
łuk wobec podstawy `--track` 3,05 / 3,12:1, biały uchwyt wobec łuku 3,45 / 3,41:1, pierścień
wobec uchwytu 5,07 / 5,03:1. Dystans percepcyjny między końcami zakresu to 0,051–0,106 w Oklab.

| Wynik | Ton | Token łuku | Pill (tagpill) |
|---|---|---|---|
| 90–100 | Idealny | `--gauge-excellent` | solid: bg `--accent`, tekst `--n-0` |
| 75–89 | Dobry | `--gauge-high` | solid: bg `--app-4`, tekst `--n-0` |
| 50–74 | Podwyższony | `--gauge-low` | solid: bg `--app-2`, tekst `--n-0` |
| 25–49 | Wymaga uwagi | `--gauge-danger` | `.tagpill--warning` |
| 0–24 | Alarm | `--gauge-danger` | `.tagpill--error` |

Geometria łuku jest wspólna dla obu konwencji: `--dial-offset` = `744 × (1 − ułamek)`, pozycja
kropki końcowej: kąt = `106° + ułamek × 328°`, `cx = 160 + 130·cos(θ)`, `cy = 160 + 130·sin(θ)`
(stopnie → radiany). Na tarczy bilansu budynku i w specimenach `Gauge/*` ułamek to
`wynik / 100`; na tarczy pomieszczenia to `(nadana temperatura − 15) / 11`. Przeliczone wartości:
Sypialnia AJ 20,5 °C → offset 372,0 · kropka 160,0/30,0; Sypialnia Ala 22,5 → 236,7 ·
272,2/94,3; Salon AJ i Kuchnia 23,0 → 202,9 · 285,3/125,4; Łazienka 22,0 → 270,5 ·
251,5/67,6; Gabinet 19,0 → 473,5 · 68,5/67,6. Wcześniej kropka stała w pozycji **wyniku**,
a nie nadanej temperatury — na Gabinecie przy nadanej temperaturze 19 °C leżała w punkcie 40/100, czyli nie zgadzała
się z liczbą w środku tarczy.

### Stany zaprojektowane per pomieszczenie

| Pomieszczenie | Wynik | Ton tarczy | Temperatura | Podsumowanie | Sezony |
|---|---|---|---|---|---|
| Sypialnia AJ | 80 | Dobry (`--gauge-high`) | 20,4 °C | 80 % — działa dobrze | 300 SD / −16% |
| Salon AJ | 95 | Idealny (`--gauge-excellent`) | 23,4 °C | 95 % — działa dobrze | 340 SD / −12% |
| Łazienka | 58 | Podwyższony (`--gauge-low`) | 24,2 °C | 58 % — `tagpill--warning` | 410 SD / **+4%** |
| Kuchnia | 88 | Dobry (`--gauge-high`) | 22,6 °C | 88 % — działa dobrze | 265 SD / −12% |
| Gabinet | 40 | Wymaga uwagi (`--gauge-danger`, eco) | 20,8 °C | 40 % — `tagpill--error` | 190 SD / −27% |
| Sypialnia Ala | 91 | Idealny (`--gauge-excellent`) | 22,9 °C | 91 % — działa dobrze | 280 SD / −10% |
| Kotłownia | — (offline) | — | — | — | — |

Łazienka i Gabinet demonstrują warianty tarczy poza stanem dobrym: obie ścieżki łuku
(`stroke`) i pigułka temperatury są przekolorowane inline na `--gauge-low` / `--gauge-danger`
— żadna nowa klasa CSS, tylko podmiana zmiennej tokenu w atrybucie `style`, zgodnie z
istniejącym wzorcem inline-override używanym w `04-porownanie-sezonow`. Łazienka jako jedyna
ma sezonowy `tagpill` z `i-trending-up` (+4%, pogorszenie), reszta zachowuje `i-trending-down`.

### Semantyka „tryb eco" — informacja, nie usprawiedliwienie (audyt 2026-07-27)

„Tryb eco" (pisownia: **eco**, nie „eko") jest tagiem informacyjnym niezależnym od oceny
komfortu — mówi, że pomieszczenie działa w trybie oszczędnym, nic więcej. Ocena komfortu
(kolor kropki statusu, ton tarczy, pill) wynika wyłącznie z wyniku 0–100 opisanego wyżej.
Gabinet w trybie eco i z niskim wynikiem (40, Wymaga uwagi) pokazuje to wprost w obu
miejscach, w których się pojawia — hub `11-pomieszczenia.html` i ekran pomieszczenia —
zamiast łagodzić wygląd huba, bo tag „eco" brzmi pozytywnie. Wiersz huba: `.dot--low`
(czerwono-pomarańczowy, zgodny z tonem wyniku) + „Tryb eco · poza strefą komfortu" — dot
i treść identyczne w produkcji i w specimenie `komponent-rr-sched`. Wariant odrzucony:
eco jako stan docelowy, obojętny na wynik — zdjąłby ostrzegawczy kolor z huba i osłabiłby
pokaz tonów tarczy.

Historia dobowa każdego pomieszczenia ma własny zestaw danych w `assets/history.js`
(`ROOM_SERIES`, kluczowany przez `window.OLTE_ROOM`) — kształty krzywych, zakresy min/max
i karty dnia różnią się rzeczywiście (np. Łazienka ma szpilkę wilgotności do 86% po
prysznicu, Gabinet ma płaską, niską krzywą z niewielkim garbem od ciepła sprzętu).

### Kotłownia — stan specjalny, nie generyczna piąta

Kotłownia nie ma tarczy, historii ani podsumowania, bo czujnik jest offline od 3 godzin —
pokazanie żywej tarczy czy wykresu dobowego dla urządzenia bez odczytu byłoby nieuczciwe
wobec danych. Zamiast tego `room-kotlownia-glowny.html` łączy `.stalebar` (ten sam komponent
co w `09-stany-danych`) z `.emptystate` w miejscu tarczy, ostatnim znanym odczytem w pigułkach
`.pill--off`, i kartą-linkiem prowadzącą **do diagnostyki** (`09-stany-danych.html`), nie do
fikcyjnej historii tego pomieszczenia.

### Formularz dodania pomieszczenia

`12-dodaj-pomieszczenie.html` — ten sam zestaw komponentów co `room-<slug>-edycja.html`
(`.field`, `.iconpick`, `.stepper`, `.slider`, `.formbar`), ale w stanie pustym/domyślnym:
brak nazwy, brak wybranej ikony, temperatura docelowa 21 °C. „Zapisz” w pasku akcji jest
zablokowany do wpisania nazwy. Zapis otwiera dialog potwierdzenia i wraca do huba — bez
realnej persystencji, zgodnie z charakterem prototypu (żaden inny ekran też nie zapisuje
stanu między sesjami).

### Pliki zastąpione przekierowaniem

Środowisko tego projektu nie pozwala na usuwanie plików z dysku. Pięć oryginalnych plików
z Figmy (`02-pokoj-glowny`, `01-historia-temperatura`, `01-historia-wilgotnosc`,
`03-podsumowanie-pokoju`, `04-porownanie-sezonow`) zostało zredukowanych do jednowierszowych
przekierowań (`<meta http-equiv="refresh">`) na odpowiadający plik `room-sypialnia-aj-*`, żeby
w projekcie nie zostały nieaktualne duplikaty treści dostępne pod starym adresem.

---

## 11. Pliki

```
index.html                  przegląd ekranów w kadrach telefonu + przełącznik motywu
design-system.html          dokumentacja z żywymi komponentami i statusem pozycji 1–13
DESIGN.md                   ten dokument
assets/olte.css             tokeny i komponenty — jedno źródło prawdy
assets/theme.js             motyw jasny/ciemny, localStorage + postMessage
assets/icons.js             sprite ikon (86 symboli, nazwy Lucide)
assets/history.js           renderer wykresu dobowego + ROOM_SERIES (dane per pomieszczenie)
screens/05…10                sześć ekranów współdzielonych (startowy, centralny, edycja,
                             harmonogram, diagnostyka, zgłoszenie usterki)
screens/11-pomieszczenia     hub drugiej zakładki
screens/12-dodaj-pomieszczenie  formularz dodania pomieszczenia
screens/13-dodaj-tryb        formularz nowego trybu budynku (§12a)
screens/tryb-<slug>-edycja   edycja trybu własnego — jeden plik per tryb (§12a)
screens/room-<slug>-*        pięć ekranów na pomieszczenie × sześć pomieszczeń (§10) +
                             jeden specjalny dla Kotłowni (offline)
screens/room-<slug>-harmonogram  harmonogram własny — jeden plik per ogrzewane pomieszczenie
                             (§12), nadpisuje harmonogram bazowy tylko dla tego pomieszczenia
```

---

## 12. Harmonogram — hierarchia budynek → pomieszczenie

Produkt jest B2B, skierowany na budynki (biura, obiekty komercyjne, wielorodzinne), nie na
pojedyncze domy jednorodzinne — stąd terminologia w całym prototypie używa „budynek/budynkowy”
tam, gdzie wcześniej było „dom/domowy” (m.in. Card Hero na `05-ekran-startowy`, podtytuł
`08-harmonogram`, wartość harmonogramu w `room-<slug>-edycja.html`).

### Model trzech poziomów

1. **Harmonogram bazowy** (`08-harmonogram.html`) — cztery bloki dobowe, typ dnia
   (roboczy/weekend/nieobecność). To **domyślny** harmonogram dla każdego nowego pomieszczenia;
   pomieszczenie go dziedziczy automatycznie, bez żadnej konfiguracji.
2. **Nadpisanie per pomieszczenie** — wybierane w `room-<slug>-edycja.html` segmentem
   trzyopcyjnym `Harmonogram bazowy / Stała temperatura / Własny harmonogram`
   (zastąpił dotychczasowy binarny przełącznik „Steruj harmonogramem”):
   - **Stała temperatura** — harmonogram jest ignorowany, obowiązuje jedna temperatura
     docelowa ze steppera/slidera (komponent bez zmian, tylko teraz widoczny warunkowo).
   - **Własny harmonogram** — pomieszczenie ma kopię harmonogramu bazowego jako punkt
     startowy, edytowalną niezależnie na osobnym ekranie `room-<slug>-harmonogram.html`
     (ten sam układ co `08`, ale bez wpływu na inne pomieszczenia — wraca do edycji
     pomieszczenia, nie do jednostki centralnej).
3. **Wskaźnik stanu** — każde ogrzewane pomieszczenie pokazuje swój aktualny tryb jako
   mały `.tagpill`/`.rr-sched` z ikoną `#i-calendar-clock`:
   - `Harmonogram bazowy` (`.tagpill--info` / `.rr-sched`, niebieski) — stan domyślny.
   - `Własny harmonogram` (`.tagpill--warning` / `.rr-sched--own`, żółty) — świadome
     odejście od domyślnego.
   - `Stała temperatura` (`.rr-sched--off`, wyciszony) — harmonogram nieaktywny (Kotłownia).
   - `Ustawiono ręcznie` (`.tagpill--manual` / `.rr-sched--manual`, tło `--track` / tekst
     `--n-700`, ikona `#i-sliders-vertical`) — użytkownik przeciągnął kropkę na tarczy
     temperatury (patrz punkt 5); zastępuje dowolny z trzech stanów wyżej, dopóki
     nadpisanie nie wygaśnie albo nie wróci do harmonogramu ręcznie (patrz punkt 5).

   Widoczny w dwóch miejscach: pod tarczą temperatury na każdym `room-<slug>-glowny.html`
   (`data-od-id="stan-harmonogramu"`) i w liście `11-pomieszczenia.html`
   (`.rr-sched` pod `.rr-status` każdego wiersza, z sufiksem „· do &lt;godzina&gt;” w stanie
   `--manual`) — użytkownik z siedmioma pomieszczeniami widzi od razu, które odbiegają od
   bazowego bez wchodzenia w edycję każdego z nich.
   Na ekranie pomieszczenia plakietka ma obok siebie `.iconbtn` z ikoną `settings`
   (`data-od-id="btn-ustawienia-harmonogramu"`) prowadzący prosto do
   `room-<slug>-edycja.html#segment-tryb-harmonogramu` — przełączenie na własny
   harmonogram lub stałą temperaturę bez przechodzenia przez pełną edycję. Plakietka
   pozostaje statusem, zębatka jest jedynym elementem klikalnym w tym wierszu.
   Specimen: `komponent-stan-harmonogramu`.
4. **Kierunek regulacji** — czwarta mikro-linia wiersza listy (`.rr-climate`, pod
   `.rr-sched`) odpowiada na pytanie „w którą stronę idzie teraz temperatura”, niezależne
   od tego, *który* harmonogram pomieszczenie stosuje:
   - `Dogrzewanie` (`.rr-climate--heat`, `#i-flame`, `--on-temp`) — regulacja w górę.
   - `Wychładzanie` (`.rr-climate--cool`, `#i-trending-down`, `--on-hum`) — temperatura
     schodzi, bo grzanie jest wstrzymane. **Nie** „Chłodzenie”: budynek nie ma funkcji
     chłodzenia, więc nazwa i ikona opisują kierunek zmiany, nie działanie urządzenia
     (patrz decyzja D-4 w sekcji „Konsola budynku”).
   - `Utrzymanie` (klasa bazowa bez modyfikatora, `#i-minus`, `--muted`) — brak regulacji,
     temperatura w zadanym punkcie.
   - `Wstrzymane` (`.rr-climate--paused`, `#i-grid-2x2`, `--status-info`) — grzanie zatrzymane
     automatycznie przez wykrycie otwartego okna; wraca samo, bez akcji użytkownika (M-06).
   - `Brak danych` (`.rr-climate--none`, `--status-off`) — czujnik nieaktywny; kierunku
     nigdy nie zgadujemy bez odczytu (Kotłownia).

   Kolor nie jest jedynym nośnikiem informacji: każdy stan ma własną ikonę Lucide, własną
   etykietę tekstową i pełne zdanie w `title` (np. „Temperatura regulowana w dół — grzanie
   wstrzymane do 22,0°”). Specimen: `komponent-rr-climate` w `design-system.html`.
   Wdrożone w `11-pomieszczenia.html` (7/7 wierszy); ekrany `room-<slug>-glowny.html`
   jeszcze tego wskaźnika nie mają — otwarty punkt spójności.
4a. **Okno otwarte — mechanika, nie tylko przełącznik (M-06)** — „Wykrywanie otwartego
   okna” istniało jako toggle w `room-*-edycja.html`/`12-dodaj-pomieszczenie.html`, ale nie
   miało żadnego widocznego efektu. Referencyjne wdrożenie: Łazienka.
   - `notif--info` na panelu pomieszczenia, nad tarczą: „Okno otwarte od 4 min — grzanie
     wstrzymane automatycznie. Wróci samo, gdy czujnik wykryje zamknięcie.”
   - `.rr-climate--paused` na liście pomieszczeń (patrz punkt 4) plus `.rr-status`
     zmienione na „Okno otwarte · grzanie wstrzymane”.
   - Centrum powiadomień na `11-pomieszczenia.html` odzwierciedla ten sam stan (`notif--info`,
     ikona `grid-2x2`), zamiast duplikować starą treść „temperatura powyżej normy”.
   - Wykres dobowy (`assets/history.js`) rysuje pasmo zdarzenia analogicznie do pasma
     nasłonecznienia: prostokąt `var(--muted)` z przerywaną obwódką i podpisem pod osią
     godzin. Pole opcjonalne w danych serii — `windowEvent: { fromH, toH, label }` — więc
     pozostałe 11 serii bez tego pola renderują się bez zmian.
   - Nie dotyczy Kotłowni (brak dialu/harmonogramu, offline) ani pomieszczeń bez
     otwieranych okien w scenariuszu prototypu — to jest demonstracja mechaniki na jednym
     pomieszczeniu, nie stan wdrożony wszędzie.
5. **Tarcza jako kontrolka — przeciąganie ustawia temperaturę** — kropka na tarczy
   (`.dial-arc-dot`, ukryty hit-target `.dial-hit` r=24px, `role="slider"`) jest przeciągalna
   wskaźnikiem, dotykiem i klawiaturą (strzałki ±0,5 °C, `PageUp`/`PageDown` ±2 °C,
   `Home`/`End` = 15/26 °C). Tarcza od pierwszej klatki pokazuje nadaną temperaturę
   na zakresie `15–26 °C` krokiem `0,5 °C`, a łuk korzysta z zakresu barwowego danego pomieszczenia:
   - Łuk i kropka pokazują pozycję nadanej temperatury; neutralna podstawa pokazuje cały zakres.
   - Kolor łuku, uchwytu i wielkiej liczby pochodzi z `--room-cool` → `--room-warm`, więc nie
     zmienia się na inną paletę przy pierwszym dotknięciu ani między spoczynkiem a przeciąganiem.
   - Odczyty temperatury i wilgotności pozostają neutralne i są pokazane pod wielką liczbą.
   - Po ręcznej zmianie plakietka stanu przechodzi na `.tagpill--manual` „Ustawiono ręcznie”,
     wiersz „najbliższa zmiana” się chowa, a pod plakietką pojawia się limit: „Do <godzina>,
     potem wróć do harmonogramu”. Link `#btn-wroc-harmonogram` przywraca stan sprzed zmiany.

   Geometria łuku (`CX=160, CY=160, R=130`, `START_DEG=106°`, `SWEEP_DEG=328°`, `ARC_LEN=744`)
   jest wspólna dla 6/6 `room-<slug>-glowny.html`; zmienia się tylko ułamek `(temp−15)/11`.
   Kotłownia nie ma tarczy, bo jest offline. Specimen: `komponent-tarcza-interaktywna`
   w `design-system.html`.

### Które pomieszczenia mają co (stan demonstracyjny)

| Pomieszczenie | Tryb | Uzasadnienie |
|---|---|---|
| Sypialnia AJ | Harmonogram bazowy | Brak potrzeby odchylenia — rytm standardowy |
| Salon AJ | Harmonogram bazowy | Duży pokój, ale rytm dobowy zgodny z budynkiem |
| Łazienka | **Własny harmonogram** | Poranny skok od prysznica cieplejszy niż bazowy domyślny |
| Kuchnia | Harmonogram bazowy | Wahania od gotowania nie wymagają odrębnego rytmu dobowego |
| Gabinet | **Własny harmonogram** | Używany w godzinach pracy — bazowy blok dzienny zakłada nieobecność, gabinet potrzebuje odwrotnie |
| Sypialnia Ala | Harmonogram bazowy | Bez agresywnego obniżenia nocnego w bazowym domyślnym |
| Kotłownia | Stała temperatura | Czujnik offline — harmonogram nieaktywny, nie dotyczy |

Każdy z sześciu plików `room-<slug>-harmonogram.html` jest w pełni samodzielny (te same
nakładki, JS, klasy co `08-harmonogram.html`), różni się tylko blokami dobowymi, podtytułem
i notatką w stopce — zgodnie z wzorcem ustanowionym dla `room-<slug>-glowny.html` (§10):
kopiowanie struktury, nie budowanie od zera.


---

## 12a. Konsola budynku — przeprojektowanie ekranu Centralny (pochłania M-03)

### Dlaczego

Ekran nazywał się „Centralny", a miał **jedną kontrolkę i osiem bloków odczytów**. Klikalny
był tylko segment „Auto / Komfort / Eko / Postój". Trzy realne kontrolki — żądanie bufora,
cel CWU, bieg rekuperacji — były narysowane jako `.bar` bez interakcji. Lista „Kto teraz
pobiera ciepło" dublowała zakładkę Pomieszczenia i wymieniała pomieszczenia, których
w prototypie nie ma („hall i pokój gościnny" — R-09). Harmonogram bazowy, czyli najważniejsze
narzędzie sterowania budynkiem, był tam tylko odsyłaczem, i to dwa razy.

### Przeramowanie

Centralny odpowiada na trzy pytania zarządcy, w tej kolejności:

1. **Jaki tryb obowiązuje teraz w całym budynku?** → tryb budynku
2. **Jak zmienić coś wszędzie naraz, bez wchodzenia w siedem pomieszczeń?** → korekta
   globalna, harmonogram bazowy inline, przełączniki grzania, temperatury obiegów
3. **Co wymaga mojej decyzji?** → sekcja „Wymaga uwagi" (alerty instalacji)

Podział pracy z zakładką Pomieszczenia: **tam przeglądanie i szczegóły pojedynczego
pomieszczenia, tu operacje masowe.** Dlatego wiersz w konsoli nie jest klikalny jako link —
klikalny jest tylko przełącznik. Gdyby wiersz linkował, konsola dublowałaby hub.

### Architektura, od góry

| Blok | Rola | Komponent | Specimen |
|---|---|---|---|
| Tryb budynku | Praca / Ograniczony / Urlop (z datą powrotu) / Postój + tryby własne + kafel dodawania | `.moderow`, `.mr-custom`, `.mr-add` | `komponent-moderow` |
| Korekta globalna | przesunięcie −3,0 … +3,0 °C na wszystkie temperatury | `.stepper` | `komponent-korekta-globalna` |
| Harmonogram bazowy | doba widoczna od razu, edycja bloków dalej na `08` | `.daystrip` | (istniejący) |
| Grzanie w pomieszczeniach | 7 wierszy, jeden przełącznik na pomieszczenie | `.listrow` + `.switch` | `komponent-wiersz-sterowania` |
| Obiegi | CWU: nadana temperatura celu 45–60 °C + dogrzanie na żądanie; rekuperacja: bieg 1–4; bufor: odczyt | `.stepper`, `.segment`, `.bar` | (istniejące) |
| Telemetria jednostki | zwinięta, nagłówek niesie wniosek („Jednostka pracuje · COP 4,3") | `.foldcard` | `komponent-foldcard` |
| Wymaga uwagi | alerty instalacji (filtr, serwis) | `.notif--warning` | (istniejący) |

Proporcja odwróciła się z **1 kontrolki na 8 odczytów** na **6 kontrolek i 2 odczyty**.

Usunięte z ekranu: lista „Kto teraz pobiera ciepło" (zastąpiona listą sterowania), hero
z COP jako pierwszy blok (schodzi do `.foldcard`), stopka „Odczyt z jednostki 12 s temu"
(wchodzi do podpisu zwiniętego nagłówka), martwy link „Zamów filtr" (`href="#"` → `09`).

### Cztery decyzje

**D-1. Tryb budynku zastąpił dawny wybór charakteru pracy jednostki — nie stoi obok niego.**
Dawny segment mieszał dwie osie na jednym przełączniku: charakter pracy pompy (Auto /
Komfort / Eko — jak agresywnie grzać) i stan budynku (Postój — nikogo nie ma). Dwa
przełączniki na jednym ekranie, oba wpływające na temperaturę, to pewna pomyłka
użytkownika. Zostaje **jeden wybór**, z którego wynika zachowanie pompy. Postój przeszedł
z osi „charakter pracy" na oś „stan budynku", gdzie od początku należał.

**D-2. Jedno centrum powiadomień na warstwę, nie trzy na projekt.**
Były trzy: `05` („System działa prawidłowo"), `06` („Filtr do wymiany", martwy link),
`11` („Wymaga uwagi", dwa alerty). Podział docelowy:

- `11-pomieszczenia.html` — alerty **pomieszczeń** (czujnik offline, okno otwarte)
- `06-centralny.html` — alerty **instalacji** (filtr, sprężarka, serwis)
- `05-ekran-startowy.html` — **bez własnego centrum**; dawne powiadomienie mówiło tylko
  „nie wykryto nieprawidłowości", czyli nie nosiło żadnej informacji, a jego link nie miał
  celu. W jego miejsce weszła druga karta przejścia — do konsoli budynku, żeby ekran
  startowy prowadził do obu hubów, nie tylko do pomieszczeń.

**D-3. Wyłączenie pomieszczenia to nowy, piąty stan harmonogramu — widoczny na trzech
powierzchniach.**
Bez tego ktoś wyłączyłby Kuchnię w konsoli i nie zrozumiał, dlaczego jej tarcza nic nie
robi. Stan pojawia się:

- w konsoli: `.listrow.is-off`, wygaszona ikona i nazwa, podpis „Wyłączone z ogrzewania",
  a oryginalny podpis przechowany w `data-sub`, żeby wrócił po włączeniu;
- na liście pomieszczeń: `.roomrow.is-heat-off` + `.rr-sched--offroom` (`--muted`, ikona
  `power`, „Poza harmonogramem");
- w panelu pomieszczenia: `notif--info` nad tarczą z linkiem do `06` oraz plakietka
  `tagpill--off`; wiersz „najbliższa zmiana" jest schowany, bo ta zmiana nie nastąpi.

`--offroom` różni się od `--off` **intencją**: `--off` to brak odczytu (usterka czujnika),
`--offroom` to decyzja użytkownika — odczyty są aktualne, stan odwracalny jednym
przełącznikiem. Referencyjne pomieszczenie: **Sypialnia Ala**.

Wyjątek: **Kotłownia ma przełącznik `disabled`.** To ona chroni instalację przed
zamarznięciem, więc jej wyłączenie nie jest decyzją, którą interfejs powinien oferować.
Powód jest w podpisie wiersza, nie tylko w atrybucie.

**D-4. Budynek grzeje i nie chłodzi — nazwy stanów muszą to odzwierciedlać.**
Lista pomieszczeń pokazywała stan „Chłodzenie" (`.rr-climate--cool`, ikona `snowflake`),
choć Centralny nie ma i nie będzie miał funkcji chłodzenia. Stan przeformułowany na
**„Wychładzanie"** z ikoną `trending-down`: temperatura schodzi, bo grzanie jest wstrzymane,
a nie bo instalacja chłodzi. Nazwa klasy `--cool` zostaje (jest udokumentowana i używana),
zmienia się jej znaczenie i prezentacja. Tryby budynku mówią wyłącznie o grzaniu —
Postój utrzymuje 8 °C jako ochronę przeciwzamarzaniową, nie jako nadaną temperaturę komfortu.

### Tryby — co robi każdy

| Tryb | Ikona | Efekt | Data powrotu |
|---|---|---|---|
| Praca | `house` | Harmonogramy działają bez zmian | — |
| Ograniczony | `trending-down` | Wszystkie temperatury −2 °C, harmonogramy działają dalej | — |
| Urlop | `calendar` | Temperatury −4 °C do dnia powrotu, CWU raz na dobę | **tak** |
| Postój | `power` | Harmonogramy wstrzymane, 8 °C antyzamarzaniowe, CWU wyłączona | — |

Urlop i Postój pokazują `notif--info` mówiące wprost, że nadane temperatury pomieszczeń są zapisane,
ale nie obowiązują. Bez tego nadana temperatura na tarczy w panelu pomieszczenia kłamałaby.

Wybór trybu nigdy nie polega na samym kolorze: karta zaznaczona dostaje obramowanie
`--accent`, pogrubioną nazwę i `aria-pressed="true"`, a plakietka w nagłówku sekcji
powtarza nazwę trybu tekstem.

### Tryby własne — dodawanie i edycja

Cztery tryby powyżej są **wbudowane i nieusuwalne**. Za nimi w siatce idą tryby własne,
a na końcu kafel dodawania:

| Element | Klasa | Rola |
|---|---|---|
| Tryb wbudowany | `.moderow button` | wybór, bez edycji |
| Tryb własny | `.moderow .mr-custom` (wrapper) + `.mr-edit` | wybór **i** wejście w edycję |
| Kafel dodawania | `.mr-add` | akcja, prowadzi na `13-dodaj-tryb.html` |

**Ołówek `square-pen` jest jedynym wyróżnikiem trybu własnego.** Tryby świadomie **nie mają
koloru tożsamości**, choć pomieszczenia go mają: kolor na karcie trybu znaczy „wybrany",
więc drugie znaczenie zniosłoby pierwsze. Rozpoznanie niesie ikona i nazwa.

Konstrukcja: ikona edycji to osobny link, a linku nie da się zagnieździć w przycisku wyboru
(przycisk w przycisku). Dlatego pole siatki przejmuje wrapper `.mr-custom`: przycisk
wypełnia je w całości i dostaje `padding-right: 44px`, żeby nazwa nigdy nie weszła pod
ikonę, a ołówek leży nad nim w prawym górnym rogu. Grafika ma 32 px, ale `::after`
z `inset: -6px` rozciąga pole dotyku do 44 × 44 px. Kafel dodawania ma krawędź kreskowaną,
bo jest **akcją, nie wyborem** — nie przyjmuje `aria-pressed`.

Referencyjny tryb własny w prototypie: **Goście** (`bed-double`, +1,5 °C w trzech
pomieszczeniach, CWU 55 °C, rekuperacja bieg 3, do 10.08).

### Formularz trybu — siedem pól

`13-dodaj-tryb.html` (tworzenie) i `tryb-goscie-edycja.html` (edycja) to **ten sam zestaw
pól**; różnią się wypełnieniem, przyciskiem usuwania w pasku górnym i warunkiem aktywacji
zapisu (przy tworzeniu wystarczy nazwa, przy edycji potrzebna jest zmiana).

| Pole | Kontrolka | Zakres |
|---|---|---|
| Nazwa | `.input` | do 20 znaków, wymagana |
| Ikona | `.iconpick` (7 kolumn × 2) | 14 ikon trybów ze sprite'u |
| Zachowanie temperatur | `.segment--block` | korekta −5,0 … +3,0 °C · stała 10 … 26 °C · bez zmian |
| Zakres pomieszczeń | `.switch` + lista `.listrow` | wszystkie albo wybrane z 6 |
| Ciepła woda | `.select` | bez zmian · 55 °C · 40 °C · raz na dobę · wyłączona |
| Rekuperacja | `.select` | bez zmian · bieg 1–4 |
| Zakończenie | `.segment--block` | ręcznie · po czasie 1–72 h · do daty |

Trzy zasady, które ten formularz ustala dla całego projektu:

1. **Etykiety segmentów są krótkie celowo.** Trzy pełne opisy nie zmieściłyby się w jednym
   wierszu na 393 px — wyjaśnienie niesie `.f-hint` pod kontrolką, tak samo jak w segmencie
   harmonogramu pomieszczenia. To ta sama lekcja, co przy `#segment-tryb-harmonogramu`.
2. **Podsumowanie w `.notebox` jest częścią kontraktu formularza, nie ozdobą.** Pola opisują
   *ustawienia*, a podsumowanie *skutek*, i przelicza się przy każdej zmianie. Ono też
   niesie błędy zamiast osobnego komunikatu — przy pustym zakresie mówi wprost, dlaczego
   `Zapisz` jest zablokowany.
3. **Kotłownia jest w liście zakresu, ale `disabled`** — spójnie z D-3. Dlatego zakres liczy
   się do 6, nie do 7, a powód stoi w podpisie wiersza, nie tylko w atrybucie.

Zakres korekty trybu (−5,0 … +3,0 °C) jest szerszy w dół niż korekta globalna (−3,0 … +3,0 °C),
bo tryb może zastępować całą dobę. Głębsze obniżenia zostają przy Urlopie i Postoju, które
mają własną ochronę przeciwzamarzaniową. Tryby **nie sumują się** — obowiązuje jeden naraz —
ale korekta globalna działa dalej i **dodaje się** do korekty trybu; ekran edycji mówi to
wprost w `notif--info`, bo to jedyne miejsce, gdzie dwie korekty się spotykają.


---

## 13. Audyt DS — specimeny dopisane po realnym wdrożeniu

Kolejne tury sesji dodawały komponenty i mechanizmy prosto na ekranach (bo to tam było
potrzebne od razu), a `design-system.html` nie był aktualizowany równolegle w czterech
przypadkach — mimo że kod jest od dawna w produkcji. Ten przegląd domyka rozjazd:

| Co było zaimplementowane, ale niedokumentowane | Gdzie żyje w kodzie | Nowy specimen w DS |
|---|---|---|
| `.rr-sched` — pill stanu harmonogramu (3 warianty) | `11-pomieszczenia.html`, `room-<slug>-glowny.html` | `komponent-rr-sched` |
| Tony tarczy `--gauge-high/low/danger` jako żywy komponent | `room-<slug>-glowny.html` (Sypialnia AJ/Łazienka/Gabinet) | `komponent-tarcza-tony` |
| Animacja wejścia tarczy `[data-enter]` (`dial-fill`/`dial-pop`/`dial-value-in`) | `05-ekran-startowy.html` + 6× `room-<slug>-glowny.html` | `komponent-tarcza-tony` (sekcja notatki) |
| Interaktywny wykres dobowy (hover/tap/klawiatura, `aria-live`) | `assets/history.js`, 12 ekranów historii | `stany-wykres-dobowy` |

Żaden z czterech nie wymagał nowego CSS w `assets/olte.css` — to wyłącznie dokumentacja
tego, co już istniało. `komponent-rr-sched` i `komponent-tarcza-tony` używają fragmentów
markupu skopiowanych 1:1 z żywych ekranów (współrzędne `--dial-offset`/kropki końcowej
wzięte z Sypialni AJ, Łazienki i Gabinetu), żeby specimen nigdy nie rozjechał się z tym,
co faktycznie renderuje aplikacja. Wykres dobowy nie ma własnej repliki SVG w DS (byłaby
nadmiarowa przy współdzielonym `history.js`) — specimen opisuje mechanizm i linkuje do
żywego ekranu, tak jak dotychczasowe specimeny nakładek linkują do `08-harmonogram.html`.

Kontrola po edycji: 3 unikalne nowe `data-od-id` (`komponent-rr-sched`, `komponent-tarcza-tony`,
`stany-wykres-dobowy`), zero nowych surowych hexów (wyłącznie `var(--gauge-*)`), wszystkie
użyte ikony (`calendar-clock`, `flame`, `monitor`, `sofa`, `bed`) potwierdzone w `icons.js`,
wszystkie linkowane pliki (`room-salon-aj-glowny`, `room-gabinet-glowny`, `room-kotlownia-glowny`,
`room-sypialnia-aj-historia-temp`, `05-ekran-startowy`, `11-pomieszczenia`) istnieją.

### Audyt napraw DS (2026-07-27) — status: Fazy 1–4 zrobione, 5–7 w toku

Przegląd całego DS względem realnych ekranów wykrył cztery problemy P0, opisane i
naprawione w `plan-napraw-ds.md` (ten plik jest dziennikiem wykonania — status odhaczeń
jest tam bieżący). W tej sesji domknięto:

1. **Klasa-widmo `.iconbox--error`** — używana w Gabinecie, nieistniejąca w CSS; dopisana.
2. **Kontrast AA stanów ciepłych jako tekst** — `--app-1`/`--app-2` na tekstach i ikonach
   (notyfikacje, tagpille, karty dnia, chipy w DS) zamienione na pary `On/*`
   (`--on-warning`, `--on-error`, `--on-temp`) już istniejące w tokenach, patrz §1.
3. **Tarcza pomieszczenia koduje realne dane** — łuk i pill = wynik 0–100 pomieszczenia
   (ten sam wynik co ekran podsumowania), nie losowa temperatura; tabela progów i
   przeliczenia geometrii w §10 wyżej.
4. **Jedna semantyka „tryb eco"** — informacja niezależna od oceny komfortu, spójna w
   hubie, ekranie pomieszczenia i DS; §10 wyżej.

**Odłożone do decyzji właściciela (nie naprawione, świadomie):** `.dial-value` (wielka
liczba na tarczy) koloruje się tokenem `Gauge/*`, który jest skalibrowany do użycia
graficznego (próg AA 3:1) i spada poniżej 4,5:1 jako kolor tekstu na białym tle w każdym
z 6 pokoi. Fazy 2–3 tego nie naprawiały, bo Faza 3 explicite każe kolorować `.dial-value`
tokenem tabeli — trzymaliśmy się zatwierdzonego planu literalnie. Do rozstrzygnięcia:
zaakceptować jako wyjątek dla wielkiego tekstu, albo przełączyć na odpowiadający `On/*`.

**Nie zaczęte w tej sesji — Fazy 5 (mechaniczne P1), 6 (P2 dokumentacyjne) i 7 (strażnik
`_check-ds.mjs` + kontrola końcowa + ten wpis odhaczony jako zamknięty)**. Pełna lista
zadań: `plan-napraw-ds.md`, sekcja „Do zrobienia następną sesją". Świadomie poza zakresem
całego audytu (nienaprawiane): Week Calendar bez przerysowania wykresu per dzień, ARIA
wykresu/segmentu (`role="listbox"`, `tablist`→`radiogroup`) — do odnotowania przy handoffie
inżynierskim.
