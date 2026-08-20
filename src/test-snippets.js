const snippets=[
  {name:'C',code:`#include <stdio.h>
// print a URL safely
const char *url = "https://example.com/a//b";
/* temporary value */
int total = 42;
printf("%s %d\\n", url, total);`},
  {name:'Scala',code:`object Main {
  // Application entry point
  val url = "https://example.com/a//b"
  /* temporary value */
  println(url)
}`},
  {name:'Dart',code:`void main() {
  // Network endpoint
  final url = "https://example.com/api//users";
  /* temporary value */
  print(url);
}`},
  {name:'Groovy',code:`def url = "https://example.com/api//users"
// temporary value
def total = 42
/* keep this string */
def message = "hello // world"
println(message)`},
  {name:'XML',code:`<!-- Document comment -->
<config>
  <url>https://example.com/a//b</url>
  <!-- inline comment -->
  <name>Aaqib</name>
</config>`},
  {name:'Perl',code:`# configuration
my $url = "https://example.com/api#users";
# temporary value
my $name = "Aaqib # Khan";
print "$name\\n";`},
  {name:'R',code:`# configuration
url <- "https://example.com/api#users"
# temporary calculation
total <- 10 + 20
print(url)`},
  {name:'PowerShell',code:`# Application configuration
$url = "https://example.com/api#users"
<# temporary block #>
Write-Output $url # print endpoint`},
  {name:'Haskell',code:`{- Application configuration -}
-- Keep this URL
url = "https://example.com/a//b"
{- temporary value -}
total = 42`},
  {name:'Julia',code:`# configuration
url = "https://example.com/api#users"
#= temporary block =#
message = "hello # world"
println(message)`},
  {name:'Nim',code:`# configuration
let url = "https://example.com/api#users"
#[ temporary block ]#
let total = 42
stdout.writeLine(url)`},
  {name:'MATLAB',code:`% configuration
url = "https://example.com/api#users";
% temporary value
total = 10 + 20;
% print result
disp(url)`},
  {name:'Fortran',code:`! program configuration
program demo
  character(len=40) :: url
  url = "https://example.com/a//b" ! keep URL
  print *, url
end program demo`},
  {name:'Lisp/Scheme',code:`; configuration
(define url "https://example.com/api#users")
; temporary value
(define total 42)
(display url)`},
  {name:'Erlang',code:`% configuration
-module(demo).
-export([start/0]).
start() ->
    Url = "https://example.com/a//b", % keep URL
    io:format("~s~n", [Url]).`},
  {name:'Elixir',code:`# configuration
url = "https://example.com/api#users"
# temporary value
total = 42
IO.puts(url)`},
  {name:'Prolog',code:`% configuration
url("https://example.com/api#users").
/* temporary fact */
name("Aaqib % Khan").`},
  {name:'Pascal',code:`// configuration
program Demo;
var
  url: string;
begin
  url := "https://example.com/a//b"; { temporary value }
  writeln(url);
end.`},
  {name:'D',code:`// configuration
import std.stdio;
void main() {
  string url = "https://example.com/a//b";
  /* temporary value */
  writeln(url);
}`},
  {name:'Solidity',code:`// contract configuration
pragma solidity ^0.8.0;
contract Demo {
  /* temporary value */
  string public constant URL = "https://example.com/a//b";
}`},
  {name:'HCL/Terraform',code:`# service configuration
name = "nocodecomments"
url = "https://example.com/api#users" # public endpoint
/* temporary block */
port = 8080`},
  {name:'JSONC',code:`{
  // public endpoint
  "url": "https://example.com/api//users",
  /* user configuration */
  "name": "Aaqib // Khan"
}`},
  {name:'Visual Basic',code:`REM application configuration
Dim url As String = "https://example.com/api//users"
' temporary value
Dim total As Integer = 42
Console.WriteLine(url)`},
  {name:'Batch',code:`@echo off
REM deployment configuration
set "URL=https://example.com/api#users"
:: temporary message
echo %URL%`},
  {name:'Assembly',code:`; configuration
section .data
url db "https://example.com/a//b", 0
# temporary value
value dd 42`},
  {name:'COBOL',code:`       *> program configuration
       IDENTIFICATION DIVISION.
       PROGRAM-ID. DEMO.
       PROCEDURE DIVISION.
           DISPLAY "https://example.com/a//b".
           *> temporary statement
           STOP RUN.`}
];

export function renderAdditionalSnippets(){const grid=document.querySelector('.snippet-grid');if(!grid)return;for(const snippet of snippets){const details=document.createElement('details');const summary=document.createElement('summary');summary.textContent=snippet.name;const pre=document.createElement('pre');const code=document.createElement('code');code.textContent=snippet.code;pre.appendChild(code);details.appendChild(summary);details.appendChild(pre);grid.appendChild(details);}}
