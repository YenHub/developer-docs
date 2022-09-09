# JavaScript `matchAll`

An example of how to use the ES2020 `matchAll` method.

Say you have a list of directory names, and you want to extract all unique paths to a depth of 3 which follow a particular token, like `etc`

```javascript
const str = `etc/common
etc/common/lib
etc/common/lib/themes
etc/common/lib/themes/css
etc/common/lib/themes/utils`

const getUniqueMatches = (str, regex) => {
  const array = [...str.matchAll(regex)]
  const finalSet = new Set()
  array.forEach(it => finalSet.add(it[1]))
  console.log([...finalSet].join('\n'))
}

getUniqueMatches(str, /etc(\/[a-z\-]+\/[a-z\-]+\/[a-z\-]+\/)/g)

// The same regular expression could be simplified as
getUniqueMatches(str, /etc((\/[a-z\-]+){3})/g)

// /common/lib/themes

// Or match between a depth of 2 & 3
getUniqueMatches(str, /etc((\/[a-z\-]+){2,3})/g)
/**
 * /common/lib
 * /common/lib/themes
 */
```
