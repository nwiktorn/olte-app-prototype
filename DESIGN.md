# OLTE App — Design System

Wartości bazowe wyekstrahowane bezpośrednio z `OLTE-App.fig` (fig-kiwi v101, 2206 węzłów, 2 strony).
Wszystko w sekcjach 1–7 to odczyty z pliku, nie interpretacje. Sekcje 9–13 dokumentują zmiany
architektury informacji, per-pokojową strukturę ekranów i audyt DS wdrożony po starcie projektu.

**Produkt:** aplikacja mobilna/B2B do monitorowania systemu grzewczego OLTE w budynku — bilans
budynku, temperatura i wilgotność per pomieszczenie, historia dobowa, porównanie sezonów,
jednostka centralna, harmonogram bazowy z nadpisaniem per pomieszczenie.
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
| `06-centralny` | 8 | jednostka grzewcza: COP, sprężarka, zasilanie i powrót, trzy obiegi, tryby pracy, rozdział ciepła |
| `07-edycja-pomieszczenia` | 9, 10 | nazwa, wybór ikony, stepper i suwak temperatury, przełączniki, dialog usunięcia |
| `08-harmonogram` | 9, 10 | cztery bloki dobowe, arkusz edycji bloku, kopiowanie na inne dni |
| `09-stany-danych` | 7 | diagnostyka czujników: ładowanie → błąd → dane, czujnik offline, pusta lista zgłoszeń |
| `10-zgloszenie-usterki` | — | formularz serwisowy: `select`, `textarea`, `notif--info`, dialog potwierdzenia — jedyne miejsce w prototypie, gdzie te komponenty DS są użyte |
| `11-pomieszczenia` | — | hub drugiej zakładki: centrum powiadomień (`notif--error/--warning`), rozpiska wszystkich pomieszczeń, przejście do formularza dodania |
| `12-dodaj-pomieszczenie` | — | formularz dodania: nazwa, wybór ikony, kondygnacja, stepper/suwak temperatury, przełączniki zachowania — „Zapisz” aktywuje się po wpisaniu nazwy |
| `room-<slug>-*` | — | komplet pięciu ekranów per pomieszczenie (siedem pomieszczeń) — patrz §10 |

---

## 9. Zmiana architektury informacji — Pokoje → Pomieszczenia (poz. 14)

Zatwierdzona zmiana po przeglądzie: druga zakładka nawigacji zmieniła nazwę z „Pokoje" na
„Pomieszczenia" i przestała być aliasem jednego przykładowego pokoju (`02-pokoj-glowny`).
Dostała własny ekran-hub.

- **`11-pomieszczenia`** — nowy ekran pod drugą zakładką. Centrum powiadomień na górze
  (`notif--error` dla czujnika offline, `notif--warning` dla wartości poza normą, oba linkują
  do konkretnego pomieszczenia lub do diagnostyki), pod nim pełna `.roomlist` wszystkich
  siedmiu pomieszczeń, CTA „Dodaj pomieszczenie" (`.btn--ghost.btn--block`) na dole i drugi
  wjazd do tego samego przepływu w `appbar` (`i-plus`). Formularz dodania pomieszczenia nie
  istnieje jeszcze jako ekran — obie akcje sygnalizują to toastem.
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
odwiedzany przez wszystkie siedem wierszy huba, został zastąpiony **odrębnym kompletem pięciu
plików dla każdego pomieszczenia**. Powód: appbar, historia i podsumowanie muszą zgadzać się
z pomieszczeniem, z którego przyszedł użytkownik — jeden wspólny plik to gwarantowana
niekonsekwencja przy siedmiu wierszach linkujących do tego samego miejsca.

### Nazewnictwo

```
screens/room-<slug>-glowny.html          tarcza temperatury, pigułki, arkusz opcji
screens/room-<slug>-podsumowanie.html    metryka zgodności z harmonogramem, wnioski
screens/room-<slug>-historia-temp.html   wykres dobowy — temperatura
screens/room-<slug>-historia-wilg.html   wykres dobowy — wilgotność
screens/room-<slug>-sezony.html          porównanie sezonu grzewczego/chłodniczego
```

`<slug>`: `sypialnia-aj`, `salon-aj`, `lazienka`, `kuchnia`, `gabinet`, `sypialnia-ala`.
**Kotłownia** ma jeden plik (`room-kotlownia-glowny.html`) — patrz niżej.

### Tarcza pomieszczenia = wynik 0–100, nie temperatura (audyt 2026-07-27)

Łuk tarczy koduje **wynik pomieszczenia 0–100** — ten sam wynik, który widać na ekranie
Podsumowania jako „% zgodnie z harmonogramem". Kolor łuku i pill tarczy pochodzą z jednej
tabeli progów; to ta sama konwencja co tarcza bilansu budynku na ekranie startowym (92/100).
Temperatura w środku tarczy (`.dial-value`) jest odczytem informacyjnym, niezależnym od
koloru łuku — kolor `.dial-value` podąża za tonem wyniku, nie za samą wartością temperatury.

| Wynik | Ton | Token łuku | Pill (tagpill) |
|---|---|---|---|
| 90–100 | Idealny | `--gauge-excellent` | solid: bg `--accent`, tekst `--n-0` |
| 75–89 | Dobry | `--gauge-high` | solid: bg `--app-4`, tekst `--n-0` |
| 50–74 | Podwyższony | `--gauge-low` | solid: bg `--app-2`, tekst `--n-0` |
| 25–49 | Wymaga uwagi | `--gauge-danger` | `.tagpill--warning` |
| 0–24 | Alarm | `--gauge-danger` | `.tagpill--error` |

`--dial-offset` = `744 × (1 − wynik/100)`; pozycja kropki końcowej: kąt = `106° +
(wynik/100) × 328°`, `cx = 160 + 130·cos(θ)`, `cy = 160 + 130·sin(θ)` (stopnie → radiany).
Przed audytem łuk koduł losowo dobraną wartość bez związku z żadną metryką (komentarz
o „40% zakresu 15–24 °C" w Gabinecie był matematycznie fałszywy — realnie 64%); teraz każdy
z sześciu `room-<slug>-glowny.html` ma offset i pozycję kropki przeliczone z wyniku
faktycznie wyświetlanego na jego stronie podsumowania.

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
komfortu — mówi, że pomieszczenie działa w reżimie oszczędnym, nic więcej. Ocena komfortu
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

`12-dodaj-pomieszczenie.html` — ten sam zestaw komponentów co `07-edycja-pomieszczenia`
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
assets/icons.js             sprite ikon (73 symbole, nazwy Lucide)
assets/history.js           renderer wykresu dobowego + ROOM_SERIES (dane per pomieszczenie)
screens/05…10                sześć ekranów współdzielonych (startowy, centralny, edycja,
                             harmonogram, diagnostyka, zgłoszenie usterki)
screens/11-pomieszczenia     hub drugiej zakładki
screens/12-dodaj-pomieszczenie  formularz dodania pomieszczenia
screens/room-<slug>-*        pięć ekranów na pomieszczenie × sześć pomieszczeń (§10) +
                             jeden specjalny dla Kotłowni (offline)
screens/room-<slug>-harmonogram  harmonogram własny — jeden plik per ogrzewane pomieszczenie
                             (§12), nadpisuje harmonogram bazowy tylko dla tego pomieszczenia
screens/01…04                pięć plików-przekierowań na miejsce oryginalnych ekranów z Figmy
OLTE-App.fig                plik źródłowy
```

---

## 12. Harmonogram — hierarchia budynek → pomieszczenie

Produkt jest B2B, skierowany na budynki (biura, obiekty komercyjne, wielorodzinne), nie na
pojedyncze domy jednorodzinne — stąd terminologia w całym prototypie używa „budynek/budynkowy”
tam, gdzie wcześniej było „dom/domowy” (m.in. Card Hero na `05-ekran-startowy`, podtytuł
`08-harmonogram`, wartość harmonogramu w `07-edycja-pomieszczenia`).

### Model trzech poziomów

1. **Harmonogram bazowy** (`08-harmonogram.html`) — cztery bloki dobowe, typ dnia
   (roboczy/weekend/nieobecność). To **domyślny** harmonogram dla każdego nowego pomieszczenia;
   pomieszczenie go dziedziczy automatycznie, bez żadnej konfiguracji.
2. **Nadpisanie per pomieszczenie** — wybierane w `07-edycja-pomieszczenia.html` segmentem
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

   Widoczny w dwóch miejscach: pod tarczą temperatury na każdym `room-<slug>-glowny.html`
   (`data-od-id="stan-harmonogramu"`) i w liście `11-pomieszczenia.html`
   (`.rr-sched` pod `.rr-status` każdego wiersza) — użytkownik z siedmioma pomieszczeniami
   widzi od razu, które odbiegają od bazowego bez wchodzenia w edycję każdego z nich.
   Na ekranie pomieszczenia plakietka ma obok siebie `.iconbtn` z ikoną `settings`
   (`data-od-id="btn-ustawienia-harmonogramu"`) prowadzący prosto do
   `07-edycja-pomieszczenia.html#segment-tryb-harmonogramu` — przełączenie na własny
   harmonogram lub stałą temperaturę bez przechodzenia przez pełną edycję. Plakietka
   pozostaje statusem, zębatka jest jedynym elementem klikalnym w tym wierszu.
   Specimen: `komponent-stan-harmonogramu`.
4. **Kierunek regulacji** — czwarta mikro-linia wiersza listy (`.rr-climate`, pod
   `.rr-sched`) odpowiada na pytanie „w którą stronę idzie teraz temperatura”, niezależne
   od tego, *który* harmonogram pomieszczenie stosuje:
   - `Dogrzewanie` (`.rr-climate--heat`, `#i-flame`, `--on-temp`) — regulacja w górę.
   - `Chłodzenie` (`.rr-climate--cool`, `#i-snowflake`, `--on-hum`) — regulacja w dół
     (grzanie wstrzymane, pomieszczenie schodzi do zadanej wartości).
   - `Utrzymanie` (klasa bazowa bez modyfikatora, `#i-minus`, `--muted`) — brak regulacji,
     temperatura w zadanym punkcie.
   - `Brak danych` (`.rr-climate--none`, `--status-off`) — czujnik nieaktywny; kierunku
     nigdy nie zgadujemy bez odczytu (Kotłownia).

   Kolor nie jest jedynym nośnikiem informacji: każdy stan ma własną ikonę Lucide, własną
   etykietę tekstową i pełne zdanie w `title` (np. „Temperatura regulowana w dół — grzanie
   wstrzymane do 22,0°”). Specimen: `komponent-rr-climate` w `design-system.html`.
   Wdrożone w `11-pomieszczenia.html` (7/7 wierszy); ekrany `room-<slug>-glowny.html`
   jeszcze tego wskaźnika nie mają — otwarty punkt spójności.

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
