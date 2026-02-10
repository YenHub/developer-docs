# Sitemap CLI Generator

This tool can be used locally, or more helpfully, in a pipeline 😉

```bash
npx sitemap-generator-cli -d 10 -l -g monthly -c 15 https://developer.quickdash.co.uk
```

## Options

```pre
$ sitemap-generator --help

  Usage: cli [options] <url>

  Options:

    -V, --version                           output the version number
    -f, --filepath <filepath>               path to file including filename (default: sitemap.xml)
    -m, --max-entries <maxEntries>          limits the maximum number of URLs per sitemap file (default: 50000)
    -d, --max-depth <maxDepth>              limits the maximum distance from the original request (default: 0)
    -q, --query                             consider query string
    -u, --user-agent <agent>                set custom User Agent
    -v, --verbose                           print details when crawling
    -c, --max-concurrency <maxConcurrency>  maximum number of requests the crawler will run simultaneously (default: 5)
    -r, --no-respect-robots-txt             controls whether the crawler should respect rules in robots.txt
    -l, --last-mod                          add Last-Modified header to xml
    -g, --change-freq <changeFreq>          adds a <changefreq> line to each URL in the sitemap.
    -p, --priority-map <priorityMap>        priority for each depth url, values between 1.0 and 0.0, example: "1.0,0.8 0.6,0.4"
    -x, --proxy <url>                       Use the passed proxy URL
    -h, --help                              output usage information
```
