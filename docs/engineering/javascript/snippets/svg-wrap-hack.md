# Word Wrap hack for SVG Text

This handy little function will help to centre and word-wrap the text within an SVG:

### Before:
```pre
   ##################
   #                #
NOTICE THE TEXT OVERFLOW!
   #                #
   ##################
```
### After:
```pre
   ##################
   #   NOTICE THE   #
   # TEXT OVERFLOW! #
   #                #
   ##################
```

## The Snippet

```javascript
// (IG) Initiate Text Wrapping for SVGs

// (IG) Helper Function: Wrap text within SVGs into BLOCK tspans
function svgTextWrap(caption) {
    var MAXIMUM_CHARS_PER_LINE = 14;
    if(caption.length <= MAXIMUM_CHARS_PER_LINE) {
        return false;
    }
    var svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    svgText.setAttributeNS(null, 'font-size', 30);
    svgText.setAttributeNS(null, 'fill', '#00B5FA');
    svgText.setAttributeNS(null, 'text-anchor', 'middle');

    var words = caption.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        if(testLine.length > MAXIMUM_CHARS_PER_LINE) {
            // MAXIMUM_CHARS_PER_LINE has been met, append the line and reset test line
            var svgTSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            svgTSpan.setAttributeNS(null, 'x', '50%');
            svgTSpan.setAttributeNS(null, 'y', '65%');

            var tSpanTextNode = document.createTextNode(line.trim());
            svgTSpan.appendChild(tSpanTextNode);
            svgText.appendChild(svgTSpan);

            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }

    var svgTSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    svgTSpan.setAttributeNS(null, 'x', '50%');
    svgTSpan.setAttributeNS(null, 'y', '80%');

    var tSpanTextNode = document.createTextNode(line);
    svgTSpan.appendChild(tSpanTextNode);

    svgText.appendChild(svgTSpan);

    return svgText;
}

// (IG) Initiate Text Wrapping for SVGs
$(document).ready( function(){
    $('.contact-us__contact-options-link svg').each((ind, elem) => {
        var $elem = $(elem);
        var textElem = $elem.find('text')[0];
        var textSnippet = textElem.innerHTML.trim();
        var tSpans = svgTextWrap(textSnippet);
        if(tSpans) {
            $(elem).append(tSpans);
            textElem.remove();
        }
    });
});
```