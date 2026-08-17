# NoCodeComments

NoCodeComments is a browser-only code comment stripper. Version 2 replaces the original regex-based implementation with a conservative lexical scanner that understands comment delimiters without blindly modifying quoted strings, template literals, or regular-expression literals.

## Supported language families

The language registry currently covers C, C++, C#, Java, JavaScript, TypeScript, Go, Rust, Swift, Kotlin, Scala, Dart, Groovy, PHP, CSS/SCSS/Less, HTML/XML/SVG, Python, Ruby, Perl, R, Shell, PowerShell, YAML, Dockerfiles, SQL, Lua, Haskell, Julia, Nim, MATLAB, Fortran, Lisp-family languages, Erlang, Elixir, Prolog, Pascal, D, Solidity, HCL/Terraform, JSONC, Visual Basic, Batch, Assembly and COBOL. A conservative generic fallback is also available.

This is intentionally not marketed as a mathematically universal parser. Every programming language has its own grammar and some languages have context-sensitive or preprocessor-specific comment rules. The scanner therefore uses explicit language profiles and avoids destructive heuristics where possible.

## Features

- Removes line and block comments with a conservative lexical scanner.
- Preserves comment-like text inside strings and template literals.
- Preserves JavaScript/PHP/Perl-style regular-expression literals where they can be identified conservatively.
- Preserves line endings when multiline comments are removed.
- Supports nested block comments for language families that use them.
- Auto-detects languages from uploaded filenames and common source-code content.
- Drag-and-drop file loading.
- Copy input or output with one click.
- Swap the processed output back into the input editor.
- Download stripped code with the original filename when a file was opened.
- Optional blank-line collapsing and long-line wrapping controls.
- Live character and line-count statistics.
- Dark mode for comfortable editing.
- Keyboard shortcuts: `Ctrl+Enter` reprocesses, `Ctrl+Shift+S` swaps input/output, and `Ctrl+D` downloads the output.
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
