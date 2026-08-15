import test from 'node:test';
import assert from 'node:assert/strict';
import { stripComments } from '../src/comment-stripper.js';

const cases=[
['javascript',`const url = "https://example.com//keep"; // remove\nconst rx = /https?:\\/\\//; /* remove */\nconsole.log("/* keep */");`,`const url = "https://example.com//keep"; \nconst rx = /https?:\\/\\//; \nconsole.log("/* keep */");`],
['python',`value = "# keep" # remove\nprint("https://example.com/#keep")`,`value = "# keep" \nprint("https://example.com/#keep")`],
['sql',`SELECT '-- keep' AS x -- remove\n/* remove */ SELECT 1;`,`SELECT '-- keep' AS x \n SELECT 1;`],
['html',`<div title="<!-- keep -->"><!-- remove -->ok</div>`,`<div title="<!-- keep -->">ok</div>`],
['css',`.x{content:"/* keep */";/* remove */color:red}`,`.x{content:"/* keep */";color:red}`],
['shell',`echo "# keep" # remove\necho "https://x/#keep"`,`echo "# keep" \necho "https://x/#keep"`],
['lua',`local x="--keep" -- remove\n--[[ remove\nline ]]local y=1`,`local x="--keep" \n\nlocal y=1`],
['haskell',`x = "-- keep" -- remove\n{- remove -}\ny=1`,`x = "-- keep" \n\ny=1`],
['julia',`x="# keep" # remove\n#= remove =#\ny=1`,`x="# keep" \n\ny=1`],
['pascal',`x := '{ keep }'; { remove } y := 1;`,`x := '{ keep }';  y := 1;`],
['csharp',`var x = "https://x//y"; // remove`,`var x = "https://x//y"; `],
['yaml',`url: "https://x/#keep" # remove`,`url: "https://x/#keep" `]
];
for(const [language,input,expected] of cases)test(`${language} strips comments safely`,()=>assert.equal(stripComments(input,language),expected));
test('preserves multiline layout inside removed blocks',()=>assert.equal(stripComments('a=1;/* one\n two */\nb=2;','javascript'),'a=1;\n\nb=2;'));
test('does not strip comment markers inside unknown-language strings',()=>assert.equal(stripComments('text "http://keep" // remove','generic'),'text "http://keep" '));
test('does not alter code when no comments exist',()=>{const code='const value = "https://example.com//keep";';assert.equal(stripComments(code,'javascript'),code);});
