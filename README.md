saveaspdf.js
============

JavaScript function to save the current webpage as a PDF.

When called, saveaspdf() attempts to re-render the page on a hidden `<canvas>` element. It then outputs the canvas to an image/png datastream and saves it into a new PDF. This is a naive approach, but effective for some use cases.

Using modern browsers' built-in "Save As PDF" or "Print to PDF" functionality is usually better. For unsavvy users, wiring up saveaspdf() to a "PDF" button on your page may be worthwhile.

Licensed according to the MIT License (http://mit-license.org/).

Created by Bert Johnson (https://bertjohnson.com/) of Allcloud Inc. (https://allcloud.com/).

Dependencies
============

The function relies on [html2canvas](https://github.com/niklasvh/html2canvas) by Nicolas von Hertzen [niklasvh](https://github.com/niklasvh) and [jsPDF](https://github.com/MrRio/jsPDF) by [James Hall](https://github.com/MrRio).

These can be referenced from [cdnjs.com](https://cdnjs.com/):

```html
<!-- Dependencies hosted on CDNJS -->
<script src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js'></script>`
<!-- saveaspdf -->
<script src='saveaspdf.js'></script>
```

Usage
=====

To output the current page as a PDF named "webpage.pdf", simply call:

```javascript
saveaspdf('webpage.pdf')
```

While the above example works for most use cases, some applications hijack the scrolling behavior (e.g., SharePoint). In those cases, only the current viewport is saved to a PDF. Since that isn't ideal, saveaspdf() can accept a parameter object with properties named "expandVertical" and "expandHorizontal". Setting either value to true will temporarily override scrolling behavior to ensure all content is output, then revert to the original scrolling behavior.

To output the current page (which has overridden vertical scrolling behavior) as a PDF named "webpage-scrolled.pdf"", call:

```javascript
saveaspdf('webpage-scrolled.pdf', {expandVertical:true})
```

The function will attempt to set a default PDF background color based on the document's body background color. To override that, pass in an object with parameter of "background".

To output the current page as PDF named "webpage-red.pdf" with a red background, call:

```javascript
saveaspdf('webpage-red.pdf', {background:'#ff0000'})
```

Available Options
=================

Options are passed as an object with the following parameters:

| Name             | Type    | Default   | Description                                                                                                                  |
|------------------|---------|-----------|------------------------------------------------------------------------------------------------------------------------------|
| background       | string  | '#fff'    | Default background color of the page. Defaults to white.                                                                     |
| bodyClass        | string  | undefined | The name of a class added to the body when generating the canvas. Useful for formatting PDF-friendly output.                 |
| expandHorizontal | boolean | false     | Whether to override the default horizontal scrolling behavior when generating the output, to ensure all content is included. |
| expandVertical   | boolean | false     | Whether to override the default vertical scrolling behavior when generating the output, to ensure all content is included.   |

Browser Compatibility
==================

saveaspdf() should work on the following browsers:

Firefox 3.5+
Google Chrome
Opera 12+
IE9+
Safari 6+

Limitations
===========

saveaspdf() works best on self-contained websites. The following limitations exist and are unlikely to be fixed in the short-term:

1. Not all pages can be exported. If a page already has canvas elements or if a "Content-Security-Policy" header has been set, the function will error.
2. When rendering the canvas, external images (those on a different domain) may be blocked due to [cross-origin resource sharing](http://enable-cors.org/) policies. Because of that, complex sites that use CDNs are likely to render without images.
3. Not all CSS properties are supported. External fonts are inconsistent.
4. IFrames, Flash, and Java applets are not supported.
5. The generated PDF will contain a single image on a single page. The lack of pagination makes printing and scrolling unwieldy in some PDF readers.
6. Canvas rendering and PDF generation can be slow. For best performance, use Chrome.

License
=======

Copyright © 2016 Bert Johnson (https://bertjohnson.com/) of Allcloud Inc. (https://allcloud.com/).

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.