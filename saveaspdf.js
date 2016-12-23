/*
 * saveaspdf 1.0.0 (https://github.com/bertjohnson/saveaspdf).
 * Licensed according to the MIT License (http://mit-license.org/).
 * Created by Bert Johnson (https://bertjohnson.com/) of Allcloud Inc. (https://allcloud.com/).
 *
 * Dependencies: html2canvas >=0.4.1 (https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js).
 *               jsPDF >=1.3.2 (https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.2/jspdf.min.js).
 */

/*
 * Main function to save the current webpage as a PDF.
 * @param {string} filename - The filename of the exported PDF. Appending ".pdf" is optional.
 * @param {object} params - Optional object containing parameters (background, baseClass, expandHorizontal, and/or expandVertical).
 */
function saveaspdf(filename, params) {
    // Ensure proper file extension.
    if (!filename.toLowerCase().endsWith('.pdf'))
        filename += '.pdf';

    // Instantiate parameters object.
    if (params === undefined || params === null)
        params = {};

    // If no background is specified, default to the body's background.
    if (!params.background)
        params.background = window.getComputedStyle(document.body).getPropertyValue('background-color');

    // If scrolling behavior has been overridden, loop through all elements to ensure that they render as visible when exporting to a canvas.
    var allTags;
    if (params.expandHorizontal || params.expandVertical) {
        allTags = document.getElementsByTagName("*");
        var overflows = [];

        var bodyOverflowX = document.body.style.overflowX;
        var bodyOverflowY = document.body.style.overflowY;
        for (var i = 0, maxI = allTags.length; i < maxI; i++) {
            var overflowProperties = ['overflowX', 'overflowY'];
            for (var j = 0, maxJ = overflowProperties.length; j < maxJ; j++) {
                var overflow = allTags[i].style[overflowProperties[j]];
                if (overflow != 'hidden' && (allTags[i].offsetHeight < allTags[i].scrollHeight || allTags[i].offsetWidth < allTags[i].scrollWidth)) {
                    overflows.push([i, overflowProperties[j], overflow]);
                    allTags[i].style[overflowProperties[j]] = 'visible';
                }
            }
        }
        document.body.style.overflowX = 'scroll';
        document.body.style.overflowY = 'scroll';
    }

    // Optionally, add a class to the body to allow PDF-specific styling.
    if (params.bodyClass)
        document.body.classList.add(params.bodyClass);

    // Export the current page to a canvas, then save it as the PDF with the filename specified.
    html2canvas(document.body, {
        onrendered: function (canvas) {
            // Ensure proper orientation.
            var orientation = (canvas.width > canvas.height) ? 'l' : 'p';

            // Create a PDF based on the canvas.
            var context = canvas.getContext('2d');
            var imgData = canvas.toDataURL("image/jpeg", 1.0);
            var pdf = new jsPDF(orientation, 'pt', [canvas.width, canvas.height]);
            pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
            pdf.save(filename);
        },
        background: params.background,      // Establish a default background color.
        useCORS: true                       // Attempt to load external images using CORS.
    });

    // Remove the optional body class.
    if (params.bodyClass)
        document.body.classList.remove(params.bodyClass);

    // If we overrode scrolling behavior, reset it.
    if (params.expandHorizontal || params.expandVertical) {
        for (var i = 0, max = overflows.length; i < max; i++) {
            allTags[overflows[i][0]].style[overflows[i][1]] = overflows[i][2];
        }
        document.body.style.overflowX = bodyOverflowX;
        document.body.style.overflowY = bodyOverflowY;
    }
}