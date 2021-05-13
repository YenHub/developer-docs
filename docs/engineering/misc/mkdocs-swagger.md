# Integrating swagger with MKDocs

## Usage

Given the fact MKDocs supports HTML, nothing prevents you adding the assets required to your MKDocs folder like so:-

```pre
- MKDocs
    - docs
        - swagger-doc.md
    - js
        - swagger-ui-bundle.js
        - swagger-ui-standalone-preset.js
    - stylesheets
        - swagger-ui.css
```

The assets can be obtained from the latest [Swagger UI dist](https://github.com/swagger-api/swagger-ui/tree/master/dist) 😉

Then you can simply use this in your swagger-doc.md file to render the docs, and of course configure Swagger UI as you see fit 😃

## Example MD Content

```pre
<link rel="stylesheet" type="text/css" href="/stylesheets/swagger-ui.css" />
<div id="swagger-ui"></div>
<script src="/js/swagger-ui-bundle.js" charset="UTF-8"> </script>
<script src="/js/swagger-ui-standalone-preset.js" charset="UTF-8"> </script>
<script>
    window.onload = function() {
        // Begin Swagger UI call region
        const ui = SwaggerUIBundle({
            url: "https://petstore.swagger.io/v2/swagger.json",
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
            ],
            plugins: [
                SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout"
        });
        // End Swagger UI call region

        window.ui = ui;
    };
</script>
```

## The Result

<link rel="stylesheet" type="text/css" href="/stylesheets/swagger-ui.css" />
<div id="swagger-ui"></div>
<script src="/js/swagger-ui-bundle.js" charset="UTF-8"> </script>
<script src="/js/swagger-ui-standalone-preset.js" charset="UTF-8"> </script>
<script>
    window.onload = function() {
        // Begin Swagger UI call region
        const ui = SwaggerUIBundle({
            url: "https://petstore.swagger.io/v2/swagger.json",
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
            ],
            plugins: [
                SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout"
        });
        // End Swagger UI call region

        window.ui = ui;
    };
</script>
