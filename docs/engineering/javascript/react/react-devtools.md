# Installing & Using react-devtools in React-DOM

## Heads Up!!

**_You must not commit this into production code bases_**

Always remove these tags if you are adding temporarily for local debugging... 😉

![react-devtools UI](https://user-images.githubusercontent.com/29597/63811956-bdd9b580-c8dd-11e9-8962-c568e475c425.png)

## Notes


By default react-devtools is served on `localhost:8097`, if this poses an issue; see [react-devtools-core][1].

More information, including React Native setup, can be found on [npm][2]

## Adding the tag

#### Option A: Via HTML Template

```html
# index.ejs / index.html
<head>
  <!-- TODO: Remove This - It's react DevTools -->
  <script src="http://localhost:8097"></script>
  <!-- ^DevTools^ MUST BE FIRST! -->
  <!--     OTHER HEAD TAGS...     -->
</head>
```

#### Option B: Via import

NOTE: This must be the FIRST import ahead of any react library; literally the first import!

It is required that you install react-devtools to the package.json in order to import it; this info is purely for information, do not import react-devtools!

```javascript
import "react-devtools";
import React from "react";
/* CONTINUE IMPORTING */
```

## Debugging

#### Fire up react-devtools

```bash
npx react-devtools
```

After running the command above; you will be presented with a new external devtools window running in ElectronJS.

Once the page has rebuilt with the script in situ; the external devtools window will become active and you are then able to debug your application directly from this window.

[1]: https://www.npmjs.com/package/react-devtools-core
[2]: https://www.npmjs.com/package/react-devtools
