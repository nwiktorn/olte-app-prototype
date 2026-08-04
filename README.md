# OLTE — prototyp aplikacji

Klikalny prototyp aplikacji mobilnej do monitoringu i sterowania ogrzewaniem w budynku:
45 ekranów w ramkach telefonu plus samodzielna dokumentacja design systemu.
Całość to statyczny HTML/CSS/JS bez frameworka i bez procesu budowania.

**Podgląd online:** _uzupełnij po pierwszym wdrożeniu na Vercel_

## Co jest w środku

| Plik / katalog | Rola |
|---|---|
| `index.html` | Launcher — wszystkie 45 ekranów obok siebie w ramkach telefonu, punkt wejścia do prototypu |
| `design-system.html` | Dokumentacja design systemu: tokeny, typografia, ikony, komponenty, stany |
| `screens/` | Po jednym pliku HTML na ekran — prototyp jest klikalny bezpośrednio w przeglądarce |
| `assets/olte.css` | Jedyne źródło prawdy dla tokenów i komponentów |
| `assets/icons.js` | Sprite ikon Lucide wstrzykiwany do DOM |
| `assets/theme.js` | Przełącznik motywu jasny/ciemny |
| `assets/history.js` | Wykresy historii temperatury i wilgotności |
| `DESIGN.md` | Specyfikacja design systemu i decyzje projektowe |
| `brand-spec.md` | Tokeny marki (kolory, kroje pisma, postawa wizualna) |

Ekrany dzielą się na trzy grupy: przepływy budynkowe (`05`–`12`), panele pomieszczeń
(`room-<pomieszczenie>-glowny`) oraz ich ekrany szczegółowe — harmonogram, historia
temperatury i wilgotności, podsumowanie doby, porównanie sezonów.

## Uruchomienie lokalne

Ekrany korzystają wyłącznie ze ścieżek relatywnych, więc wystarczy dowolny serwer statyczny:

```bash
python -m http.server 8000
# albo
npx serve .
```

Następnie otwórz `http://localhost:8000/`. Pojedynczy ekran można też otworzyć
bezpośrednio z pliku, np. `screens/11-pomieszczenia.html`.

## Wdrożenie na Vercel

Projekt nie ma kroku budowania — Vercel serwuje pliki z katalogu głównego.

1. **Import repozytorium** → [vercel.com/new](https://vercel.com/new), wybierz `olte-app-prototype`.
2. **Framework Preset:** `Other`. Build Command i Output Directory pozostaw puste.
3. **Deploy.** Kolejne wdrożenia ruszają automatycznie po każdym pushu na `main`.

Alternatywnie z CLI:

```bash
npm i -g vercel
vercel --prod
```

`vercel.json` ustawia tylko nagłówki cache: assety na godzinę, pliki HTML bez cache,
żeby testerzy zawsze widzieli aktualną wersję ekranów.

## Zakres prototypu

To prototyp, nie aplikacja produkcyjna. Pokazuje przepływy, stany i design system —
dlatego dane liczbowe są przykładowe i mogą się różnić między ekranami. Backendu nie ma:
formularze nie zapisują danych, a odczyty czujników są statyczne.

Interakcje działające w prototypie: nawigacja między ekranami, przełącznik motywu,
zakładki i segmenty, arkusze dolne, dialogi, walidacja formularzy, przełączanie
zakresów na wykresach historii.
