# Integrating swagger with MKDocs

Given the fact MKDocs supports HTML, nothing prevents you adding the assets required to your MKDocs folder like so:-

```pre
- MKDocs
    - docs
    - js
    - stylesheets
```

Then you can simply do use this in your md file to render the docs, and of course configure Swagger UI as you see fit 😃

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