# Maintenance Notes

## Safe changes

- Keep the lexical scanner conservative: preserving source text is preferred over aggressive comment removal.
- Add language-specific behavior only when representative tests cover the new syntax.
- Run `npm test` before publishing changes.
- Keep the `/legacy/` implementation intact unless a deliberate legacy cleanup is being made.
