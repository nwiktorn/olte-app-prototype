# OLTE — specyfikacja marki do przekazania

System OLTE jest spokojnym, precyzyjnym interfejsem do monitorowania domu: jasne tło, przyciemniona zieleń jako jedyny akcent akcji oraz kolory semantyczne wyłącznie dla danych i stanów.

## Sześć tokenów bazowych

| Token | Wartość źródłowa | OKLCH |
|---|---:|---:|
| `--bg` | `#ffffff` | `oklch(100% 0 0)` |
| `--surface` | `#ffffff` | `oklch(100% 0 0)` |
| `--fg` | `#101614` | `oklch(19.31% 0.0100 173.0)` |
| `--muted` | `#6b756f` | `oklch(55.21% 0.0151 159.6)` |
| `--border` | `#e4e9e6` | `oklch(92.94% 0.0067 160.1)` |
| `--accent` | `#478675` | `oklch(57.26% 0.0709 174.1)` |

## Typografia

- Wyświetlana: `Manrope`, `Segoe UI`, `system-ui`, `sans-serif`
- Tekst: `Instrument Sans`, `Segoe UI`, `system-ui`, `sans-serif`
- Liczby: tabularne (`font-variant-numeric: tabular-nums`)

## Zasady postawy

1. Jeden zielony akcent służy działaniu i stanowi „w normie”; nie jest dekoracją.
2. Kolory temperatury, wilgotności i ostrzeżeń pozostają semantyczne i nie zastępują etykiet tekstowych.
3. Skala odstępów opiera się na module 4/8 px; promienie mają pięć stopni: 10, 12, 14, 22 i 999 px.
4. Główne powierzchnie są białe, obrysy subtelne, a hierarchię tworzy typografia Manrope i rytm pionowy.
5. Ciemny motyw jest wariantem tych samych tokenów, nie osobnym zestawem komponentów.
