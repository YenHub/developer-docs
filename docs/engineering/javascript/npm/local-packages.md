# Working with a npm package locally

For testing purposes (or any really), you can install your packages locally via npm.

## Creating your npm package

You can run below command at the root directory of the project you wish to test.

`npm pack`

This will generate (package) a tar file with the naming convention `[package-name]-[version].tgz`.

## Installing your package locally

Now, go to the root directory of target project where you want to consume it, and run below command.

`npm install [path to the tar file created above]`

Cons: The process is a bit cumbersome as you need to install the tar file every time.

## Installing your package globally

You can also install the package to be used from any project like so:-

`npm install -g [path to the tar file created above]`