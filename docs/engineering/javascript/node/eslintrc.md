# Default ESLint Template

Simply save this at the root of your project:

```pre
- project
    - .git
    - .eslintrc
    - .gitignore
    - ...
```

Content:

```javascript
{
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "jquery": true,
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "rules": {
        "no-const-assign": "warn",
        "no-this-before-super": "warn",
        "no-undef": "warn",
        "semi": ["error", "always"],
        "quotes": ["error", "single", { "allowTemplateLiterals": true }],
        "no-unreachable": "warn",
        "no-unused-vars": "off",
        "constructor-super": "warn",
        "valid-typeof": "warn",
        "semi-style": ["error"],
    },
    "globals": {
        "IMWS": false,
        "IMatch": false,
        "IMatchTranslate": false,
        "ol":false
    }
}
```
