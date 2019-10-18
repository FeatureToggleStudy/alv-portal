# CSS HTML Cross-Browser

This document should provide some guidance when ...

## Nested Buttons
Nested buttons are not supported by the Firefox (ESR) browser (nested button is not clickable). To overcome that issue we use the following pattern.

Instead of nesting the buttons like this:
```xhtml
<button>
    Parent Button
    <button>
        Nested Button
    </button>
</button>
```
... you have to position the nested button below the parent button and use absolute positioning:

```xhtml
<div class="position-relative">
    <button>Parent Button</button>
    <button class="nested-button">Nested Button</button>
</div>
```
```CSS
.nested-button {
    position: absolute;
    right: 0.5em;
    top: 0.5em;
}
```

## Sticky Positioning


## Printing

### Full Width Columns
Use the class `.alv-print-container` to force columns (e.g. ".col-6") to have full width on print.

### Exclude from print
To explicitly exclude certain parts of the HTML from print use the Bootstrap CSS class `.d-print-none`.

### Global printing rules
The global printing rules are maintained and documented in [scss/common/print.scss](../alv-portal-ui/src/scss/common/print.scss).

