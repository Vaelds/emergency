# Emergency Site

Dette er en samlet aflevering med:

- 3 sider: forside, infografik-side og formular-side
- Interaktiv SVG-infografik med JavaScript
- Webformular med opsummering
- Dark mode på hele sitet
- 404-side
- Dokumentation i almindeligt sprog

## Filer

- `index.html` = forside
- `instruction.html` = side med interaktiv infografik
- `register.html` = side med formular
- `404.html` = fallback-side

## Sådan virker infografikken

SVG-filen `russer_abombe.svg` indlæses med et `object`-tag. Med JavaScript hentes lagene:

- `bombe_x5F_1`
- `bombe_x5F_2`
- `bombe_x5F_3`
- `soldat`

Når brugeren klikker på dem, opdateres overskrift, brødtekst og faktabokse i højre side.

## Dokumentation

### HTML
Sitet er bygget op af tre sider med samme header og footer. Forsiden introducerer temaet og sender brugeren videre. Instruction-siden indeholder den interaktive infografik. Register-siden indeholder formularen.

### CSS
Stylingen er lavet med CSS custom properties, så det er nemt at skifte mellem light mode og dark mode. Layoutet er bygget med CSS Grid og Flexbox. Kort, bokse og billeder bruger samme visuelle system for at få et ensartet udtryk.

### JavaScript
`main.js` styrer dark mode og burger-menu. `instruction.js` gør SVG-lagene klikbare og opdaterer indholdet dynamisk. `register.js` opsamler brugerinput og viser en opsummering direkte på siden uden reload.
