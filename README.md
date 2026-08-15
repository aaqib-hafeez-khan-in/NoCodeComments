# NoCodeComments

NoCodeComments is a browser-only code comment stripper. Version 2 replaces the original regex-based implementation with a conservative lexical scanner that understands comment delimiters without blindly modifying quoted strings, template literals, or regular-expression literals.

## Supported language families

The language registry currently covers C, C++, C#, Java, JavaScript, TypeScript, Go, Rust, Swift, Kotlin, Scala, Dart, Groovy, PHP, CSS/SCSS/Less, HTML/XML/SVG, Python, Ruby, Perl, R, Shell, PowerShell, YAML, Dockerfiles, SQL, Lua, Haskell, Julia, Nim, MATLAB, Fortran, Lisp-family languages, Erlang, Elixir, Prolog, Pascal, D, Solidity, HCL/Terraform, JSONC, Visual Basic, Batch, Assembly and COBOL. A conservative generic fallback is also available.

This is intentionally not marketed as a mathematically universal parser. Every programming language has its own grammar and some languages have context-sensitive or preprocessor-specific comment rules. The scanner therefore uses explicit language profiles and avoids destructive heuristics where possible.

## What changed in v2

- Replaced global regular-expression comment deletion with a character-by-character lexical scanner.
- Preserves comment-like text inside strings and template literals.
- Preserves JavaScript/PHP/Perl-style regular-expression literals where they can be identified conservatively.
- Preserves line endings when multiline comments are removed.
- Supports nested block comments for language families that use them.
- Adds filename-based language detection for uploaded files.
- Adds content-based auto detection for common languages.
- Keeps the original vanilla JavaScript implementation intact under `/legacy/`.
- Adds automated Node.js tests covering representative language families and edge cases.

## Legacy version

The original implementation is intentionally preserved at [`/legacy/`](./legacy/). The new application exposes a **Legacy version** button at the bottom of the main page.

## Testing

Requires Node.js 20 or newer.

```bash
npm test
```

The test suite focuses on the most failure-prone behavior: comment markers inside strings, regex literals, multiline comments, multiple language syntaxes, and code with no comments.

## Static deployment

There is no build step. The project can be served as a static site, including through GitHub Pages.
