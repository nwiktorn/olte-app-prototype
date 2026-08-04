> Plan poprawek i nowych mechanik prototypu OLTE. Powstał z audytu logicznego,
> wizualnego i technicznego całego projektu oraz z benchmarku konkurencji (Nest, ecobee,
> tado, Danfoss Ally, Shelly, Aqara, Siemens Desigo CC, Schneider EcoStruxure Building
> Operation).
>
> **Rewizja 2026-08-04:** plan przestawiony na optykę prototypu (patrz §0.1). Poprzednia
> wersja traktowała rozjazdy liczb jako defekty P0 i stawiała wspólne źródło danych jako
> warunek wszystkiego — to było założenie projektu aplikacji, nie prototypu. Identyfikatory
> `D-xx` / `M-xx` / `T-xx` / `R-xx` zostają bez zmian, żeby dało się je cytować między
> sesjami; zmieniły się ich priorytety i kolejność faz.
>
> Każdy defekt ma dowód `plik:linia` odczytany z realnych plików. Dziennik napraw Design
> Systemu (`plan-napraw-ds.md`) zostaje osobnym plikiem — ten plan go **nie zastępuje**,
> tylko przejmuje jego niedokończone pozycje w Fazie P6.

# Plan rozwoju prototypu OLTE

## 0. Stan faktyczny (zweryfikowany 2026-08-04)

| Warstwa | Stan |
|---|---|
| Ekrany | **53** pliki w `screens/` — 9 systemowych (`05`–`13`) + 44 per pomieszczenie/tryb |
| Pomieszczenia | 7: Sypialnia AJ, Salon AJ, Łazienka, Kuchnia, Gabinet, Sypialnia Ala, Kotłownia |
| Komplet per pomieszczenie | 7 plików dla 6 pomieszczeń ogrzewanych (`glowny`, `edycja`, `podsumowanie`, `historia-temp`, `historia-wilg`, `sezony`, `harmonogram`); Kotłownia ma 2 pliki |
| Nawigacja | 3 zakładki: Główny · Pomieszczenia · Centralny |
| Design System | `design-system.html` (115 KB) + `DESIGN.md` (13 sekcji, §8 usunięta) + `assets/olte.css` (52 KB) |
| Wspólny kod | `assets/olte.css`, `theme.js`, `icons.js` (86 ikon Lucide), `history.js` (`ROOM_SERIES`) |
| Launcher | `index.html` — kadry telefonu ze wszystkimi 53 ekranami |
| Pozycjonowanie produktu | **B2B — budynki** (biura, obiekty komercyjne, wielorodzinne), nie dom jednorodzinny (`DESIGN.md` §9) |

Kontekst B2B jest decydujący dla doboru mechanik: nie kopiujemy 1:1 wzorców konsumenckich
(geofencing per telefon domownika), tylko bierzemy z aplikacji konsumenckich **jakość
interakcji**, a z systemów budynkowych (Desigo CC, EcoStruxure) **model odpowiedzialności**:
role, potwierdzanie alarmów, raporty, kondygnacje, ślad zmian.

### 0.1 Zakres: to jest prototyp

Deliverable to **prototyp i design system**, nie implementacja aplikacji. Z tego wynika
reguła, która przeporządkowuje cały rejestr defektów:

**Liczby mogą się różnić między ekranami — stany, logika, nawigacja i design system nie.**

| Klasa | Traktowanie | Przykład |
|---|---|---|
| Rozjazd wartości liczbowej | **poza zakresem** — dane są demonstracyjne | Sypialnia AJ: 23,0° na liście, 20,4° w panelu (D-01) |
| Sprzeczność stanu | **defekt** — stan to właśnie to, co prototyp pokazuje | Kotłownia: czujnik nieaktywny, a panel podaje 61 % wilgotności (D-03) |
| Nieprawdopodobieństwo w demo | **defekt tani** — widz zauważy przy przejściu | „Najbliższa zmiana o 08:44" przy zegarze 09:41 (D-05) |
| Ślepy link / zła tożsamość ekranu | **defekt P0** — prototyp musi być klikalny w całości | Edycja z Gabinetu pokazuje Sypialnię AJ (D-10) |
| Mechanika bez widoku | **defekt P0** — brak funkcji do pokazania | „Wykrywanie otwartego okna" bez stanu „okno otwarte" (D-21) |
| Komponent na ekranie bez specimenu w DS | **defekt P1** — DS jest deliverable równorzędnym | patrz Faza P6 |
| Duplikacja kodu w 45 plikach | **nie defekt, tylko koszt iteracji** | chrome w 45 plikach (D-25) |

Trzy konsekwencje dla planu:

1. **T-01 (jedno źródło danych) spada z P0 do opcjonalnego akceleratora.** Nie naprawiamy
   liczb — nie budujemy też pod nie infrastruktury.
2. **Priorytet przechodzi na funkcjonalność i kompletność ścieżek.** Prototyp ma pokazać,
   *co aplikacja robi*; dziś nie da się w nim zmienić temperatury.
3. **Design System awansuje z „higieny" na deliverable.** Każdy nowy komponent z każdej fazy
   dostaje specimen w tej samej turze, w której powstaje — nie na końcu.

---

## 1. Co mówi benchmark — luki funkcjonalne wobec rynku

Zestawienie funkcji, które w tej kategorii są standardem, wobec stanu prototypu. To jest
teraz najważniejsza tabela w dokumencie: prototyp ocenia się po tym, czy pokazuje mechaniki.

| Funkcja | Kto to ma | OLTE dziś |
|---|---|---|
| Zmiana temperatury „na teraz" z ekranu pomieszczenia | wszyscy (Nest, ecobee, tado, Ally) | **brak** — stepper istnieje tylko w edycji i tylko w trybie „Stała temperatura" |
| Boost / dogrzej na X minut | tado, Ally, Shelly | brak |
| Tryb nieobecności / wakacje na poziomie budynku | wszyscy | częściowo — jest typ dnia „Nieobecność" w harmonogramie, bez trybu w aplikacji |
| Wykrywanie otwartego okna **ze stanem w UI** | tado, ecobee, Ally | toggle jest (`07:141`), stanu „okno otwarte" nie ma na żadnym ekranie |
| Energia i koszty (kWh, zł, podział, rok do roku) | Nest Energy History, ecobee Energy IQ, tado Energy IQ | brak ekranu; są tylko chipy w `06` i `09` |
| CWU jako sterowalny obieg | wszyscy z pompą ciepła | wiersz informacyjny w `06`, bez ekranu |
| Centrum powiadomień z historią i potwierdzaniem | Desigo CC, EcoStruxure (acknowledge), tado Care & Protect | sekcja „Wymaga uwagi" w `11`, bez historii i bez potwierdzania |
| Przeglądy / serwis / zgłoszenia z historią | Care & Protect, work orders (Building X) | `10-zgloszenie-usterki` + przycisk „Historia" **bez celu** |
| Krzywa grzewcza / kompensacja pogodowa | Danfoss, Viessmann, Desigo | `06` pokazuje zasilanie/powrót, krzywej nie da się zobaczyć ani zmienić |
| Role i uprawnienia | Desigo CC, EcoStruxure | brak |
| Raporty / eksport | Nest Home Report, Desigo CC, EBO | „Udostępnij raport" kończy się toastem |
| Grupowanie po kondygnacjach | systemy budynkowe (drzewo obiektu) | `07` obiecuje „wpływa na grupowanie na ekranie głównym", `05` nie grupuje niczego |
| Parowanie czujnika / onboarding | wszyscy | `12` mówi „czujnik sparujesz po zapisaniu" — tego ekranu nie ma |
| Uczący się harmonogram / sugestie | Nest Auto-Schedule, ecobee Schedule Assistant | brak (do decyzji, R-07) |

Wniosek: prototyp jest mocny w **prezentacji stanu** (tarcze, historia, sezony,
podsumowania słowne) i słaby w **działaniu**. Trzy z czternastu pozycji to obietnice
złamane w samym prototypie: parowanie czujnika, grupowanie po kondygnacji i „Historia"
zgłoszeń są zapowiedziane w tekście UI i nie mają ekranu.

---

## 2. Rejestr defektów (priorytety wg §0.1)

**P0** psuje ścieżkę w prototypie lub obiecuje funkcję, której nie ma · **P1** widoczna
sprzeczność stanu, logiki albo braku pokrycia w DS · **P2** dług jakościowy · **—** poza
zakresem prototypu, odnotowane dla handoffu.

### 2.1 Nawigacja i tożsamość ekranu — rdzeń klikalności

| Id | P | Defekt | Dowód |
|---|---|---|---|
| D-10 | ✅ P0 | ~~`07-edycja-pomieszczenia.html` jest **na sztywno Sypialnią AJ**, a wchodzi się do niego z 6 pomieszczeń i 12 ekranów historii.~~ **Naprawione.** Sparametryzowane na 7 osobnych plików `room-<slug>-edycja.html` (6 pomieszczeń ogrzewanych + wariant okrojony dla Kotłowni bez harmonogramu/temperatury) — każdy z własną nazwą, ikoną, kolorem, ID czujnika i dialogiem usuwania | `screens/room-*-edycja.html` (7 plików) |
| D-11 | ✅ P0 | ~~Ten sam plik przy trybie „Własny harmonogram" prowadzi zawsze do `room-sypialnia-aj-harmonogram.html`.~~ **Naprawione.** Każdy `room-<slug>-edycja.html` ustawia (statycznie i w JS trybu „wlasny") href na swój własny plik harmonogramu | `room-gabinet-edycja.html:326` → `room-gabinet-harmonogram.html`, analogicznie dla 5 innych |
| D-12 | ✅ P0 | ~~4 z 6 własnych harmonogramów są nieosiągalne z prototypu.~~ **Naprawione częściowo jako efekt uboczny.** Wszystkie 6 `room-*-edycja.html` linkują teraz do swojego harmonogramu przy trybie „wlasny"; ekran nadal domyślnie startuje w trybie „budynkowy" dla 4 pomieszczeń, więc dostęp wymaga przełączenia segmentu — pełne odblokowanie (link zawsze widoczny) zostaje jako otwarty punkt | grep `room-*-harmonogram.html` w `screens/` po naprawie |
| D-13 | ✅ P1 | ~~Powrót z własnego harmonogramu idzie do `07-edycja-pomieszczenia.html` (Sypialni AJ) — pętla przez zły ekran w 6 plikach.~~ **Naprawione.** Każdy `room-*-harmonogram.html` (back arrow + „Wróć") wraca teraz do swojego `room-<slug>-edycja.html` | `room-*-harmonogram.html:28,149/150` |
| D-14 | ✅ P1 | „Wszystkie" nad rozdziałem ciepła prowadzi na ekran startowy, nie do listy pomieszczeń — **naprawione, link → `11-pomieszczenia.html`** | `06-centralny.html:144` |
| D-15 | P1 | Wiersz czujnika „Garaż" prowadzi do listy pomieszczeń, bo nie ma docelowego ekranu (patrz R-09) | `09-stany-danych.html:102` |
| D-16 | ✅ | `room-*-sezony.html` linkuje do harmonogramu **bazowego** także dla pomieszczeń z własnym (Gabinet, Łazienka) — naprawione: obie kierują teraz do `room-<slug>-harmonogram.html` | `room-gabinet-sezony.html:199` · `room-lazienka-sezony.html:182` |
| D-17 | P1 | „Historia" w pustym stanie zgłoszeń to `<button>` bez akcji; „Udostępnij raport" kończy się toastem — dwie obietnice bez ekranu | `09-stany-danych.html:203` · `room-*-glowny.html` arkusz opcji |

### 2.2 Logika i stany — to, co prototyp faktycznie demonstruje

| Id | P | Defekt | Dowód |
|---|---|---|---|
| D-21 | ✅ P0 | „Wykrywanie otwartego okna" jest domyślnie włączone w edycji i w dodawaniu — **naprawione, mechanika ma widok na Łazience (referencja)**: `notif--info` na panelu, `.rr-climate--paused` na liście, pasmo na wykresie historii | `room-*-edycja.html:141` · `12-dodaj-pomieszczenie.html:143` |
| D-22 | ✅ P0 | ~~Typ dnia „Nieobecność" nie ma odpowiednika w aplikacji — nie da się nieobecności włączyć ani zobaczyć.~~ **Naprawione przez tryb budynku (M-03).** Nieobecność jest teraz stanem budynku, nie tylko wariantem rytmu dobowego: `Ograniczony` (−2 °C, kilka godzin), `Urlop` (−4 °C z datą powrotu), `Postój` (8 °C antyzamarzaniowe). Typ dnia „Nieobecność" w `08` zostaje jako osobny rytm harmonogramu — to inna warstwa. Blok „Wietrzenie · wyłączone na sezon" wciąż bez widoku efektu | `06-centralny.html` sekcja `tryb-budynku` |
| D-18 | ✅ P1 | ~~Tarcza mówiła dwie rzeczy naraz: łuk kodował wynik 0–100, a środek temperaturę.~~ **Naprawione.** Tarcza pomieszczenia od pierwszej klatki pokazuje nadaną temperaturę 15–26 °C w kolorze pomieszczenia; wynik 0–100 pozostaje przy podsumowaniu i tarczy bilansu budynku | `room-*-glowny.html` · `DESIGN.md` §10 |
| D-19 | ✅ P1 | ~~„Chłodzenie" jako kierunek regulacji (`.rr-climate--cool`) w budynku z zerową funkcją chłodzenia.~~ **Naprawione (decyzja D-4, §12a DESIGN.md).** Stan przeformułowany na `Wychładzanie` z ikoną `trending-down` — opisuje kierunek zmiany, nie działanie urządzenia. Tryby budynku mówią wyłącznie o grzaniu; Postój utrzymuje 8 °C jako ochronę przeciwzamarzaniową | `design-system.html` specimen `komponent-rr-climate` · `DESIGN.md` §12 pkt 4 |
| D-03 | P1 | Kotłownia: lista pokazuje `—` (czujnik nieaktywny), a jej panel podaje **61 % wilgotności** — sprzeczność stanu „brak danych", który jest osobno demonstrowany w `09` | `11-pomieszczenia.html` wiersz `pomieszczenie-kotlownia` · `room-kotlownia-glowny.html:67` |
| D-05 | P1 | „Najbliższa zmiana" wypada w przeszłości: Sypialnia AJ „Zmiana o 08:44", Łazienka „09:00", przy zegarze **09:41** w każdym statusbarze | `room-sypialnia-aj-glowny.html:74` · `room-lazienka-glowny.html:74` |
| D-06 | ✅ P1 | ~~Harmonogram bazowy „obowiązuje w 6 pomieszczeniach" — realnie w 4.~~ **Naprawione.** Nowa karta harmonogramu w konsoli mówi „Obowiązuje w 4 pomieszczeniach. Gabinet i Łazienka mają własny harmonogram, Kotłownia stałą temperaturę"; podtytuł `08` zmieniony na „Bazowy · 4 pomieszczenia" | `06-centralny.html` sekcja `harmonogram-bazowy` · `08-harmonogram.html:30` |
| D-20 | P1 | Etykieta stanu nie zgadza się z progami wyniku: Sypialnia AJ (80/100 = Dobry) i Kuchnia (88/100 = Dobry) mają na liście „Komfort idealny"; próg „Idealny" to 90–100. To reguła DS, nie wartość danych | `11-pomieszczenia.html:80,137` · `room-sypialnia-aj-glowny.html:67` |
| D-09 | ✅ P1 | ~~Nazwy niespójne z modelem: `06` mówi „Salon", „Sypialnia", „Łazienka".~~ **Naprawione.** Lista sterowania w konsoli używa pełnych nazw z modelu — „Sypialnia AJ", „Sypialnia Ala", „Salon AJ", „Kuchnia", „Gabinet", „Łazienka", „Kotłownia" — więc przy dwóch sypialniach wiersz jest rozstrzygalny | `06-centralny.html` sekcja `sterowanie-pomieszczeniami` |
| D-32 | P1 | **Zakres komfortu różni się per pomieszczenie bez dokumentacji i bez widoku:** Kuchnia 18–24 °C, cztery pokoje 15–24 °C, Łazienka i Gabinet nie podają go wcale; powiadomienie Łazienki („0,7° nad górną granicą") implikuje 23,5 °C. Brakuje tu pola w UI, nie zgodności liczb | `room-kuchnia-glowny.html:67` · `room-sypialnia-aj-glowny.html:67` · `11-pomieszczenia.html:61` |
| D-23 | P2 | Kotłownia z nieaktywnym czujnikiem ma wciąż „Stałą temperaturę" jako tryb — semantyka trybu przy braku odczytu jest niedookreślona | `11-pomieszczenia.html` wiersz Kotłowni |
| D-07 | P2 | Diagnostyka mówi „6 czujników", listuje **4**, a pomieszczeń jest **7**; JS raportuje „5 z 6 zsynchronizowanych" | `09-stany-danych.html:32,276` |
| D-08 | ◐ P2 | ~~Pomieszczenia-widma: „hall i pokój gościnny" w `06`~~ — **usunięte z konsoli** razem z listą „Kto teraz pobiera ciepło"; lista sterowania wymienia dokładnie 7 realnych pomieszczeń. Zostaje „Garaż" jako czujnik i „pokój gościnny" w historii zgłoszeń w `09` — do rozstrzygnięcia razem z R-09 | `09-stany-danych.html:102-110,199` |

### 2.3 Dane liczbowe — poza zakresem prototypu

Odnotowane, żeby nie wracały jako „nowe znaleziska". Naprawiamy tylko wtedy, gdy zmiana
liczby jest darmowa przy okazji edycji tego samego wiersza.

| Id | P | Rzecz | Dowód |
|---|---|---|---|
| D-01 | — | Sypialnia AJ: lista 23,0° / 47 %, panel i diagnostyka 20,4° / 52 % | `11-pomieszczenia.html:76-93` · `room-sypialnia-aj-glowny.html:43,45` · `09-stany-danych.html:55-68` |
| D-02 | — | Salon AJ: lista i panel 23,4° / 47 %, diagnostyka 22,1° / 48 % (plus `.rr-temp--warm` tylko tam) | `room-salon-aj-glowny.html:43,45` · `09-stany-danych.html:70-83` |
| D-04 | — | Jedno zdarzenie, trzy czasy: „od 3 godzin", „od 2 h 14 min", „od 2 h" | `11-pomieszczenia.html:49` · `09-stany-danych.html:90` · `06-centralny.html:192` |

Uwaga do nowych ekranów: dane demo mogą się różnić **między** ekranami, ale muszą być
spójne **wewnątrz** jednego widoku — suma udziałów daje 100 %, słupki tygodnia sumują się
do wartości tygodniowej, ranking pomieszczeń nie przeczy własnym procentom. Inaczej wykres
przestaje pokazywać mechanikę, którą ma pokazać.

### 2.4 Technika, dostępność, dług

| Id | P | Defekt | Dowód |
|---|---|---|---|
| D-26 | P1 | Segmenty używają `role="tablist"`/`role="tab"` bez `tabpanel` — to wybór wartości, więc `radiogroup`/`radio`. Dotyczy 9 ekranów | `06-centralny.html:81` · `room-<slug>-edycja.html` · `08-harmonogram.html:43` · 6× `room-*-harmonogram.html:48` |
| D-27 | P1 | Kontrast `.dial-value`: `--gauge-*` jako kolor tekstu poniżej WCAG AA w 6/6 paneli (decyzja odłożona, R-05) | `room-*-glowny.html:65` (Gabinet `:67`) |
| D-33 | P1 | Metryka „+1,6 °C" jako tekst 20 px bold w `--app-2` (≈1,6:1 na białym) — poniżej 3:1 nawet dla dużego tekstu; pozostałe 5 ekranów historii używa `--app-1` | `room-kuchnia-historia-temp.html:117` |
| D-29 | P2 | Lista 21 ikon pomieszczeń zduplikowana w 7 ekranach edycji i `12` plus specimen DS — trzy kopie tej samej prawdy | `room-<slug>-edycja.html` · `12-dodaj-pomieszczenie.html` · `design-system.html` |
| D-28 | P2 | `data-od-id="wiersz-piętro"` — polska litera w identyfikatorze maszynowym | `room-<slug>-edycja.html` |
| D-30 | P2 | Kolor inline zamiast klasy: `style="color:var(--app-2)"` na odczycie Garażu | `09-stany-danych.html:110` |
| D-24 | P2 | Trzy różne konstrukcje zdania `sr-only` tarczy w 6 panelach | `room-sypialnia-aj-glowny.html:67` vs `room-lazienka-glowny.html:67` vs `room-gabinet-glowny.html:69` |
| D-25 | — | Chrome (statusbar, appbar, tabbar) i skrypty toastów/arkuszy skopiowane do 53 plików. W prototypie to nie defekt, tylko koszt: każda zmiana nawigacji to 53 edycje (patrz T-03 jako opcja) | wszystkie `screens/*.html` |
| D-31 | — | `viewport width=393` na sztywno w 53 plikach — to makiety telefonu, nie ekrany responsywne; do odnotowania przy handoffie | wszystkie `screens/*.html` |

---

## 3. Nowe mechaniki

Oznaczenia **M-xx** bez zmian względem poprzedniej wersji planu.

### M-01 · Sterowanie „teraz" na ekranie pomieszczenia — P0 ✅ zrobione

Najważniejsza brakująca rzecz w prototypie. Zrealizowane inaczej niż pierwotny szkic
zakładał: nie osobny stepper obok tarczy, tylko domknięcie mechaniki, która już tam była —
przeciągnięcie kropki na tarczy nadawało temperaturę od wcześniejszej tury, ale bez limitu
czasowego, statusu na liście i drogi powrotu. Te trzy elementy dochodzą teraz:

- **Limit czasowy.** Pod plakietką `.tagpill--manual` pojawia się podpis „Do &lt;godzina&gt;,
  potem wróć do harmonogramu” — godzina to ta sama wartość, którą właśnie schowany wiersz
  „najbliższa zmiana” pokazywał. Nadpisanie zawiesza jeden nadchodzący blok, nie wisi bez
  końca (`data-od-id="podpis-nadpisania"`).
- **Status na liście.** Nowy wariant `.rr-sched--manual` w `11-pomieszczenia.html`
  (`--n-700`, ikona `sliders-vertical`, sufiks „· do &lt;godzina&gt;”) — wdrożony na wierszu
  Sypialni AJ jako demonstracja stanu.
- **Powrót.** Link „wróć do harmonogramu” (`#btn-wroc-harmonogram`) przywraca plakietkę,
  wiersz „najbliższa zmiana” i nadaną temperaturę do stanu sprzed pierwszego dotknięcia tarczy.

Nie dodano `.nowctl`/`.nowctl--override` — osobny stepper byłby drugą kontrolką robiącą to
samo co przeciąganie tarczy, którego DS i ekrany już używają od dwóch tur. Specimeny
zaktualizowane: `komponent-stan-harmonogramu`, `komponent-tarcza-interaktywna`,
`komponent-rr-sched` (teraz z czwartym stanem) w `design-system.html`; opis w `DESIGN.md`
§1 punkty 3 i 5.

- Pliki: 6× `room-*-glowny.html`, `11-pomieszczenia.html`, `assets/olte.css`
  (`.rr-sched--manual`), `design-system.html`, `DESIGN.md`.

### M-02 · Boost i szybkie akcje — ⬜ P0 (wycofane po wdrożeniu — do przemyślenia)

Zaimplementowane na Gabinecie (`.btn--ghost.btn--sm` pod tarczą: `Dogrzej 30 min`,
`Wietrzenie 15 min`, `Wstrzymaj do jutra`), a następnie **usunięte całkowicie na prośbę
właściciela** — funkcjonalność wycofana z prototypu na razie, bez decyzji o dalszym
kierunku. Pozycja wraca na listę otwartych: brak Boost/szybkiej korekty „teraz" jest wciąż
realnym brakiem względem benchmarku (tado, Ally, Nest Quick Actions), ale wymaga innego
podejścia niż wiersz trzech przycisków pod tarczą.

- Wzorzec do ponownego rozważenia: tado Boost, Ally, Nest Quick Actions.
- Nie ruszone przy wycofaniu: mechanika tarczy (M-01) i okna otwartego (M-06) — obie
  niezależne od Boost, zostają bez zmian.

### M-06 · Stan „okno otwarte" — ✅ P0 (domyka D-21)

Zrobione, na Łazience jako referencji (jedno pomieszczenie demonstruje mechanikę, nie
wszystkie siedem — to prototyp, nie wdrożenie produkcyjne). Doszło: `notif--info` na
panelu pomieszczenia nad tarczą („Okno otwarte od 4 min — grzanie wstrzymane
automatycznie. Wróci samo, gdy czujnik wykryje zamknięcie”), `.rr-climate--paused` +
zmieniony `.rr-status` na liście pomieszczeń, zaktualizowane centrum powiadomień na
`11-pomieszczenia.html` (było nieaktualne „temperatura powyżej normy”), pasmo zdarzenia
na wykresie dobowym w `assets/history.js` (pole opcjonalne `windowEvent` w danych serii,
renderowane tylko gdy obecne — 11 innych serii nietknięte), zdanie w interpretacji
historii temperatury Łazienki.

- Wzorzec: tado Open Window Detection, ecobee.

### M-03 · ✅ Tryb budynku — P0 (domyka D-22, D-19, D-06, D-09; pochłonęło przeprojektowanie `06`)

**Zrobione, ale inaczej niż zakładał plan.** Zamiast osobnego ekranu `13-tryb-budynku.html`
tryb wszedł w `06-centralny` jako pierwszy blok, przy okazji pełnego przeprojektowania tej
zakładki na **konsolę budynku**. Powód: audyt pokazał, że Centralny miał jedną kontrolkę na
osiem bloków odczytów, więc dobudowanie do niego linku do kolejnego ekranu leczyłoby objaw.
Pełny opis architektury i czterech decyzji: **DESIGN.md §12a**.

Co weszło:

- **Tryb budynku** (`.moderow`, 4 karty): `Praca` / `Ograniczony` (−2 °C) / `Urlop`
  (−4 °C z datą powrotu) / `Postój` (8 °C antyzamarzaniowe). Zastąpił segment
  „Auto / Komfort / Eko / Postój", który mieszał charakter pracy pompy ze stanem budynku.
- **Korekta globalna** (`.stepper`, −3,0 … +3,0 °C, krok 0,5) — przesunięcie wszystkich
  nadanych temperatur naraz, z jawną informacją, kogo pomija.
- **Harmonogram bazowy inline** (`.daystrip`) — doba widoczna od razu, edycja bloków dalej
  na `08`.
- **Przełączniki grzania dla 7 pomieszczeń** (`.listrow` + `.switch`) — zastąpiły listę
  „Kto teraz pobiera ciepło" (odczyt → operacja), przy okazji usuwając pomieszczenia-widma
  (D-08) i poprawiając nazwy (D-09). Kotłownia ma przełącznik `disabled`.
- **Obiegi jako kontrolki**: CWU nadana temperatura celu 45–60 °C + „Dogrzej wodę teraz", rekuperacja
  bieg 1–4 (`.segment`); bufor zostaje odczytem, bo jest wynikiem, nie kontrolką.
- **Telemetria jednostki zwinięta** (`.foldcard`) — COP, sprężarka, zasilanie, powrót, pobór
  pod nagłówkiem niosącym wniosek.
- **Wskaźnik globalny** rozwiązany inaczej niż paskiem pod appbarem: `05` dostał kartę
  przejścia „Konsola budynku · Tryb Praca · 6 z 7 pomieszczeń grzeje", a tryby Urlop
  i Postój pokazują `notif--info` mówiące, że nadane temperatury pomieszczeń nie obowiązują.

Nie weszło: kalendarz nieobecności z wieloma zakresami i wyjątki per pomieszczenie —
zostają na później, jeśli tryb okaże się zbyt zgrubny.

Specimeny w DS: `komponent-moderow`, `komponent-korekta-globalna`,
`komponent-wiersz-sterowania`, `komponent-foldcard` (sekcja `konsola-budynku`).

### M-11 · ✅ Tryby własne budynku — P1 (rozszerzenie M-03)

**Zrobione.** Cztery tryby wbudowane okazały się zbyt zgrubne dokładnie tak, jak zakładała
notka „nie weszło" w M-03: nie da się nimi opisać sytuacji, która nie jest ani urlopem, ani
oszczędzaniem — gości, przyjęcia, serwisu, wietrzenia. Zamiast dokładać kolejne wbudowane
tryby, zestaw jest teraz **otwarty**.

Co weszło:

- **Karta trybu własnego** (`.mr-custom` + `.mr-edit`) w `06-centralny` — wybór jak każdy inny
  tryb, plus ołówek `square-pen` prowadzący na jego formularz edycji. Referencyjny tryb:
  **Goście** (+1,5 °C w trzech pomieszczeniach, CWU 55 °C, rekuperacja bieg 3, do 10.08).
- **Kafel dodawania** (`.mr-add`, krawędź kreskowana) jako ostatnie pole siatki — akcja,
  nie wybór, więc nie przyjmuje `aria-pressed`.
- **`screens/13-dodaj-tryb.html`** — formularz siedmiu pól: nazwa (≤20 znaków), ikona z 14
  pozycji, zachowanie temperatur (korekta −5,0 … +3,0 °C / stała 10 … 26 °C / bez zmian),
  zakres pomieszczeń (wszystkie albo wybrane z 6), CWU, rekuperacja, zakończenie (ręcznie /
  po czasie 1–72 h / do daty). Na dole `.notebox` z podsumowaniem przeliczanym na żywo, które
  niesie też błędy walidacji.
- **`screens/tryb-goscie-edycja.html`** — ten sam formularz wypełniony, plus usuwanie trybu
  z dialogiem i toast po zapisie (bez opuszczania ekranu, jak `room-<slug>-edycja`).

Decyzje: tryby **nie mają koloru tożsamości** (kolor na karcie znaczy „wybrany", drugie
znaczenie zniosłoby pierwsze — rozpoznanie niesie ikona i nazwa); tryby **nie sumują się**
(jeden naraz), ale korekta globalna dodaje się do korekty trybu; Kotłownia jest w liście
zakresu jako `disabled`, spójnie z decyzją D-3, więc zakres liczy się do 6, nie do 7.

Specimeny w DS: `komponent-moderow` (rozszerzony), `komponent-formularz-trybu`.
Pełny opis: **DESIGN.md §12a**, podsekcje „Tryby własne" i „Formularz trybu".

### M-04 · Energia i koszty — P1 (nowa zakładka)

Pobór kWh (dzień/tydzień/miesiąc/sezon), podział grzanie / CWU / pomocnicze, średni COP,
koszt w zł z taryfą dzienną i nocną, porównanie z poprzednim okresem i rok do roku, ranking
pomieszczeń po udziale w zapotrzebowaniu.

- Wzorzec: Nest Energy History (słupki dobowe + ikona przyczyny), ecobee Energy IQ (podział
  i porównanie miesięczne), tado Energy IQ (koszt), Powermanager (Desigo).
- Nowe pliki: `screens/14-energia.html`, `screens/15-energia-pomieszczenia.html`;
  rozszerzenie `assets/history.js` o serie energii.
- Wykresy: słupkowe wypełnione (nie obrysy), ta sama mechanika hover/tap co `history.js`.
- Dane demo spójne wewnątrz widoku (§2.3).

### M-05 · ◐ Ciepła woda jako obieg sterowalny — P1

**Częściowo zrobione w konsoli budynku (M-03).** CWU nie jest już zamrożonym paskiem:
w `06-centralny` ma nadaną temperaturę celu (`.stepper`, 45–60 °C, krok 1) i przycisk „Dogrzej wodę
teraz". To pokrywa dwie najczęstsze czynności bez osobnego ekranu.

Zostaje do zrobienia: okna dogrzewania w taryfie nocnej, cykl antybakteryjny (legionella)
z datą ostatniego, priorytet CWU vs CO.

- Nowy plik: `screens/16-ciepla-woda.html` — tylko jeśli te trzy rzeczy okażą się potrzebne;
  sama nadana temperatura celu już nie wymaga własnej podstrony.

### M-07 · Powiadomienia: historia i potwierdzanie — P1

Sekcja „Wymaga uwagi" w `11` zostaje jako skrót, dochodzi pełny ekran zdarzeń: lista
chronologiczna, filtry (krytyczne / ostrzeżenia / zdarzenia), **potwierdzenie z komentarzem**
i status „potwierdzone przez / kiedy". Wzorzec budynkowy (Desigo CC acknowledge, EBO event
list) — w B2B ktoś odpowiada za reakcję.

- Nowy plik: `screens/17-zdarzenia.html`; klasy `.eventrow`, `.eventrow--ack`, `.ack-note`.

### M-08 · Serwis i przeglądy — P1 (domyka D-17)

Filtr rekuperatora („do wymiany za 12 dni") to dziś powiadomienie bez miejsca docelowego.
Dochodzi ekran serwisowy: elementy z zużyciem (filtr, czynnik, anoda), historia zgłoszeń
(której szuka przycisk „Historia"), terminy przeglądów.

- Wzorzec: tado Care & Protect, work orders w Building X.
- Nowy plik: `screens/18-serwis.html`.

### M-12 · Parowanie czujnika i onboarding — P1 (domyka obietnicę z `12`)

`12-dodaj-pomieszczenie` obiecuje „czujnik sparujesz po zapisaniu". Dochodzi przepływ:
szukanie urządzenia → wybór z listy → test sygnału → przypisanie do pomieszczenia, ze
stanami: szukanie, brak urządzeń, słaby sygnał, sukces. Awansowane z P2 — to złamana
obietnica wewnątrz prototypu, a stany błędów są dobrym materiałem na DS.

- Nowy plik: `screens/22-parowanie-czujnika.html`.

### M-10 · Kondygnacje i grupowanie — P1 (domyka obietnicę z `room-*-edycja`)

`room-*-edycja` mówi „Kondygnacja wpływa na grupowanie na ekranie głównym", a `05` nie grupuje
nic. `11-pomieszczenia` dostaje nagłówki grup (Parter / Piętro / Poddasze / Piwnica) z
przełącznikiem „grupuj po kondygnacji", `05` kafle kondygnacji z liczbą pomieszczeń
wymagających uwagi. Odpowiednik drzewa obiektu w systemach budynkowych.

### M-09 · Krzywa grzewcza i kompensacja pogodowa — P2

`06-centralny` pokazuje zasilanie 34 °C / powrót 29 °C i temperaturę zewnętrzną −2 °C, ale
zależności nie da się zobaczyć ani zmienić. Dochodzi edytor krzywej (nachylenie,
przesunięcie, podgląd „przy −10 °C zasilanie 42 °C").

- Nowy plik: `screens/19-krzywa-grzewcza.html`.

### M-11 · Role i użytkownicy budynku — P2

W B2B to nie „udostępnianie domu", a uprawnienia: Administrator, Operator (sterowanie bez
konfiguracji), Najemca (własne pomieszczenia), Serwis (diagnostyka, zgłoszenia). Plus ślad
zmian „kto i kiedy zmienił nadaną temperaturę" — wzorzec audit trail z Desigo CC i EBO.

- Nowe pliki: `screens/20-ustawienia.html`, `screens/21-uzytkownicy.html`.

### M-13 · Raporty i eksport — P2

„Udostępnij raport · ostatnie 30 dni jako PDF" kończy się dziś toastem. Dochodzi arkusz
konfiguracji raportu (zakres, pomieszczenia, format PDF/CSV, odbiorca, harmonogram
cykliczny) — wzorzec Nest Home Report i raportów w Desigo CC/EBO.

### M-14 · Sugestie zamiast automatycznego uczenia — P2, wymaga decyzji (R-07)

Nest Auto-Schedule i ecobee Schedule Assistant uczą się i proponują zmianę harmonogramu.
W budynku B2B automatyczna zmiana temperatur bez zgody operatora jest ryzykowna, więc wariant do
rozważenia: **sugestie do zaakceptowania** („Gabinet grzeje pusty w pn–pt 8–10, propozycja
obniżenia — oszczędność 2,1 %"), nigdy zmiana wykonana samodzielnie.

---

## 4. Zmiany techniczne

### T-02 · Tożsamość ekranu per pomieszczenie — ✅ P0, zrobione (naprawia D-10…D-13)

Wybrano **wariant A**: 7 plików `room-<slug>-edycja.html` (6 pomieszczeń ogrzewanych + wariant
okrojony dla Kotłowni, która nie ma harmonogramu/tarczy) — spójne z konwencją `room-<slug>-*`,
bez zależności od JS-owego parametru. Każdy plik ma własną nazwę, ikonę, kolor, ID czujnika,
domyślny tryb harmonogramu i link do własnego pliku harmonogramu. Wszyscy konsumenci
(appbar `room-*-glowny.html`, arkusz „Więcej opcji", skrót zębatki, `room-*-harmonogram.html`
wstecz, 12× `room-*-historia-*.html`) przekierowani na właściwy plik per pomieszczenie.
`screens/07-edycja-pomieszczenia.html` usunięty — 0 pozostałych odniesień w projekcie.

### T-04 · Strażnik ścieżek — P1

`_check-links.mjs`: każdy `href` do pliku istnieje, każdy plik w `screens/` jest osiągalny
z `index.html` **i** z wnętrza prototypu. To wyłapałoby D-12 i wyłapie każdą przyszłą
sierotę przy 51 plikach. Wersja danych (`_check-data.mjs` sprawdzający jeden odczyt na
pomieszczenie) **wypada z planu** zgodnie z §0.1.

`_check-ds.mjs` (z `plan-napraw-ds.md` Faza 7) zostaje: klasy w HTML ⊆ klasy w `assets/olte.css`,
zero surowych hexów w `screens/`, zero inline `border-radius:<liczba>px`. Przy 53 plikach to
jedyna realna obrona DS.

### T-05 · Dostępność — P1

`radiogroup` zamiast `tablist` w segmentach (D-26), decyzja o kontraście `.dial-value`
(D-27, R-05), semantyka wykresu dobowego (`role="listbox"`, roving tabindex) — domknąć przy
okazji M-04.

### T-03 · Wspólny chrome — P2, opcjonalny akcelerator (nie defekt)

`assets/chrome.js` (statusbar, appbar, tabbar z konfiguracji w `data-*`) + `assets/ui.js`
(toasty, arkusze, dialogi — dziś skopiowane w ~20 plikach). Opłaca się, jeśli wchodzi Faza
P3 (tabbar rośnie do 4 zakładek — to inaczej 45 edycji) albo jeśli prototyp ma żyć dłużej.
Ryzyko: ekrany przestają być samodzielnymi plikami, co utrudnia podgląd pojedynczego pliku
w launcherze. Decyzja: R-10.

### T-01 · Jedno źródło danych — poza zakresem

`assets/rooms.js` byłby potrzebny, gdyby prototyp miał trzymać spójne odczyty. Zgodnie
z §0.1 nie ma. Zostaje odnotowany jako pierwsza rzecz do zrobienia **przy handoffie do
implementacji**, nie tutaj.

---

## 5. Fazy wdrożenia

Kolejność: najpierw prototyp ma być klikalny w całości, potem ma pokazywać mechaniki,
potem rośnie funkcjonalnie. DS aktualizowany w każdej fazie, nie na końcu.

### Faza P1 — klikalność i tożsamość ekranów · P0 · ~4,5 h

Zakres: T-02 (wariant A), D-10…D-17, plus tani przebieg prawdopodobieństwa: D-05 (czasy
najbliższej zmiany po 09:41), D-03 (Kotłownia bez wilgotności przy nieaktywnym czujniku),
D-06 i D-09 (liczby i nazwy opisujące model, nie odczyty).

Pliki: 7 nowych `room-<slug>-edycja.html`; podmiana `href` w 6 panelach, 12 ekranach
historii, 6 harmonogramach i 6 sezonach; `06-centralny`, `09-stany-danych`,
`11-pomieszczenia`; `index.html` (+7 kadrów).

Odbiór: z każdego pomieszczenia edycja pokazuje **jego** nazwę, czujnik i kondygnację ·
Anuluj wraca do tego samego pomieszczenia · własny harmonogram każdego z 6 pomieszczeń
osiągalny bez launchera · zero linków prowadzących „byle gdzie" · żaden ekran nie podaje
odczytu dla nieaktywnego czujnika.

### Faza P2 — sterowanie i stany mechanik · P0 · ~6,5 h

Zakres: M-01 ✅, M-02 (wdrożone i wycofane), M-06 ✅, M-03 ✅, plus D-18 (rozdzielenie
tarczy) i D-19 ✅ (etykieta kierunku regulacji, po R-04 ✅).

Pliki: `assets/olte.css` (nowe klasy), 6× `room-*-glowny`, `11-pomieszczenia`,
`06-centralny` (przepisany od zera jako konsola budynku — patrz M-03), `05-ekran-startowy`,
`08-harmonogram`, `design-system.html` (sekcja `konsola-budynku`, 4 specimeny + piąty stan
`.rr-sched`), `DESIGN.md` §12 i §12a. Osobnego `screens/13-tryb-budynku.html`
**nie powstało** — tryb wszedł w `06`, uzasadnienie w M-03.

Odbiór: da się zmienić temperaturę z panelu i wrócić do harmonogramu jednym tapnięciem ✅ ·
nadpisanie ręczne widać w liście pomieszczeń ✅ · stan „okno otwarte" ma widok ✅ ·
nieobecność da się włączyć i wyłączyć, a jej stan widać na trzech głównych ekranach ✅ ·
tarcza nie miesza dwóch znaczeń (R-01) ✅ · tryb budynku i tryby własne mają pełną ścieżkę wyboru oraz edycji ✅ ·
każdy nowy komponent ma specimen w DS ✅.
Zostaje otwarte: M-02 (Boost wycofany na prośbę właściciela) oraz D-17.

To jest faza, po której prototyp przestaje być galerią stanów i zaczyna pokazywać produkt.

### Faza P3 — obietnice złamane w prototypie · P1 · ~6 h

Zakres: M-12 (parowanie), M-10 (kondygnacje), M-08 (serwis), M-07 (zdarzenia).
Wspólny mianownik: każda z tych czterech rzeczy jest **zapowiedziana w tekście UI** i nie ma
ekranu. Domykają D-17, D-21 (reszta), obietnicę z `07` i z `12`.

Pliki: `screens/22-parowanie-czujnika.html`, `17-zdarzenia.html`, `18-serwis.html`;
`05-ekran-startowy` i `11-pomieszczenia` (grupowanie); `09-stany-danych` („Historia" → cel).

Odbiór: żaden tekst w prototypie nie obiecuje ekranu, którego nie ma · każde powiadomienie
ma miejsce docelowe i da się je potwierdzić · kondygnacja z `07`/`12` realnie wpływa na
grupowanie.

### Faza P4 — energia i obiegi · P1 · ~8 h

Zakres: M-04, M-05, M-13.

Pliki: `screens/14-energia.html`, `15-energia-pomieszczenia.html`, `16-ciepla-woda.html`;
`assets/history.js` (serie energii); `06-centralny` (wejścia); tabbar → 4 zakładki (R-02);
arkusz raportu w 6 panelach; `index.html`.

Odbiór: koszt i zużycie w trzech horyzontach z porównaniem do poprzedniego okresu · dane
demo spójne wewnątrz każdego widoku (sumy, udziały, ranking) · „Udostępnij raport" prowadzi
do realnego arkusza, nie do toastu · nowe wykresy mają specimen w DS.

### Faza P5 — konfiguracja budynku · P2 · ~5 h

Zakres: M-11, M-09, D-23, D-32 (zakres komfortu jako pole w edycji, nie liczba w tekście).

Pliki: `screens/20-ustawienia.html`, `21-uzytkownicy.html`, `19-krzywa-grzewcza.html`;
6× `room-<slug>-edycja` (pole zakresu komfortu).

Odbiór: role widoczne jako model z konsekwencją w UI (co widzi Najemca) · krzywa grzewcza
edytowalna z podglądem · zakres komfortu ustawialny tam, gdzie prototyp go dziś tylko cytuje.

### Faza P6 — Design System i higiena · P1/P2 · ~3 h

Przejęte z `plan-napraw-ds.md` (reszta Fazy 6 i cała Faza 7), plus dług z tego audytu:

- **audyt pokrycia:** każdy komponent użyty na 62 ekranach ma specimen w `design-system.html`
  (po fazach P2–P5 dochodzi ~10 nowych: `.nowctl`, boost, `.rr-sched--override`,
  `.rr-climate--paused`, pasek trybu budynku, `.eventrow*`, wykres energii, stany parowania,
  nagłówki grup kondygnacji, edytor krzywej),
- klasy `.t-cardtitle` / `.t-dial-caption` + zastosowanie (12× sezony, 6× panele),
- zastosowanie istniejącej `.t-dial` w 6 panelach zamiast inline `font-size:45px`; decyzja
  o `.t-eyebrow` (martwa: usunąć albo zastosować),
- próbki gradientu „Tarcza · średni / zły" w DS,
- komentarz „czternaście → szesnaście stopni" (`olte.css:112`), `::-moz-range-thumb` 22 → 26 px,
- tokenizacja rozmiarów tekstu w `history.js` (14/10/9 px → `var(--fs-*)`),
- ikona `armchair` (hall) — kolizja z `house`,
- D-33 (`--app-2` → `--on-warning` w `room-kuchnia-historia-temp.html:117`), D-28
  (`wiersz-piętro` → `wiersz-kondygnacja`), D-29 (jedno źródło listy ikon), D-30 (klasa
  zamiast inline), D-24 (trzy konstrukcje `sr-only` tarczy → jedna),
- T-04 (`_check-ds.mjs`, `_check-links.mjs`), T-05 (ARIA), `aria-current` na „Centralny"
  w `09-stany-danych`, wpis do `DESIGN.md` §13.

Odbiór: strażniki przechodzą na czysto · zero klas-widm · zero surowych hexów w `screens/` ·
`design-system.html` pokrywa każdy komponent użyty na ekranach.

### Faza P7 — akcelerator, opcjonalna · ~3 h

T-03 (`chrome.js` + `ui.js`). Wchodzi tylko przy decyzji R-10 i najlepiej **przed** Fazą P4,
bo tam tabbar rośnie do 4 zakładek w 53+ plikach.

---

## 6. Decyzje do podjęcia

| Id | Decyzja | Warianty | Blokuje |
|---|---|---|---|
| R-01 | ✅ Co pokazuje tarcza pomieszczenia | **Rozstrzygnięte: (b).** Łuk i kropka pokazują nadaną temperaturę 15–26 °C, a wynik 0–100 komunikuje podsumowanie; zapisane w DESIGN.md §10 | — |
| R-04 | ✅ Czy budynek chłodzi | **Rozstrzygnięte: (b) nie.** `.rr-climate--cool` to teraz `Wychładzanie` z ikoną `trending-down` — kierunek zmiany, nie działanie urządzenia. Tryby budynku mówią wyłącznie o grzaniu. Zapisane jako decyzja D-4 w DESIGN.md §12a | — |
| R-03 | ✅ Tożsamość ekranu edycji | **Rozstrzygnięte: (a).** 7 osobnych plików `room-<slug>-edycja.html`, w tym wariant Kotłowni | — |
| R-02 | Nawigacja przy nowych ekranach | (a) 4 zakładki: Główny · Pomieszczenia · Energia · Centralny; (b) 5 zakładek z „Więcej"; (c) 3 zakładki + wejścia z Centralnego | P4 |
| R-09 | ◐ Pomieszczenia-widma (hall, pokój gościnny, Garaż) | **Częściowo: (b) w `06`** — „hall i pokój gościnny" usunięte razem z listą „Kto teraz pobiera ciepło"; lista sterowania wymienia dokładnie 7 realnych pomieszczeń. Do rozstrzygnięcia zostaje „Garaż" jako czujnik i „pokój gościnny" w historii zgłoszeń w `09` | P1 |
| R-10 | Wspólny chrome (T-03) | (a) tak, przed Fazą P4; (b) nie — zostaje 53 samodzielne pliki i ręczne edycje | P7 |
| R-06 | Koszty w zł | (a) tak, z taryfą dzienną/nocną i stawkami w ustawieniach; (b) tylko kWh | P4 |
| R-05 | Kontrast `.dial-value` | (a) wyjątek dla dużego tekstu, z wpisem w `DESIGN.md`; (b) przejście na `On/*`, `Gauge/*` zostaje na łuku | P6 |
| R-08 | `.badge--partial` (dług z DS) | (a) nowa klasa; (b) reużycie `.tagpill--warning` | P6 |
| R-07 | Uczenie / sugestie (M-14) | (a) pomijamy; (b) sugestie do akceptacji; (c) automatyczna korekta harmonogramu | poza fazami |

R-01, R-04, R-03 i R-09 warto rozstrzygnąć przed startem — pierwsze dwie blokują Fazę P2,
trzecia P1, czwarta dotyka treści na trzech ekranach.

---

## 7. Szacunek całości

| Faza | Priorytet | Szacunek | Nowe pliki |
|---|---|---|---|
| P1 — klikalność i tożsamość | P0 | ~4,5 h | 6 |
| P2 — sterowanie i stany | P0 | ~6,5 h | 1 |
| P3 — złamane obietnice | P1 | ~6 h | 3 |
| P4 — energia i obiegi | P1 | ~8 h | 3 |
| P5 — konfiguracja budynku | P2 | ~5 h | 3 |
| P6 — DS i higiena | P1/P2 | ~3 h | 2 skrypty |
| P7 — akcelerator (opcja) | — | ~3 h | 2 moduły |
| **Razem bez P7** | | **~33 h** | **16 nowych plików → 61 ekranów** |

Fazy P1–P2 (~11 h) to minimum, po którym prototyp jest klikalny w całości i pokazuje
rzecz, po którą użytkownik otwiera taką aplikację. P3 domyka obietnice, które prototyp
sam składa. P4–P5 to rozbudowa funkcjonalna wobec rynku, P6 higiena DS.

Względem poprzedniej wersji planu: **−5,5 h** (zniknęła faza uspójniania danych i T-01),
a P3 awansowała, bo złamana obietnica w tekście UI jest w prototypie gorsza niż rozjazd
liczby.

---

## 8. Świadomie poza zakresem

- **Spójność wartości liczbowych między ekranami** (§0.1, D-01/D-02/D-04) — dane są
  demonstracyjne. Warunek: spójność wewnątrz jednego widoku.
- **Responsywność ekranów aplikacji** — to makiety 393 px, launcher jest responsywny (D-31).
- **Realne dane per dzień w Week Calendar historii** — wykres nie przerysowuje się przy
  zmianie dnia; dług odnotowany, bez zmian.
- **Wielobudynkowość / portfel obiektów** (multi-site dashboard z Desigo CC, Building X) —
  sensowna dla B2B, ale to inny produkt niż aplikacja jednego budynku.
- **Integracje** (BACnet, Modbus, Matter, API) — warstwa systemowa, nie prototyp UI.
- **Warstwa danych pod implementację** (`assets/rooms.js`, T-01) — pierwsza pozycja przy
  handoffie do inżynierii, nie w prototypie.
