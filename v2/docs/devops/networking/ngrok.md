# Serving your local to the internet with NGROK

This guide describes the setup process to expose your local environment to the web.

This is helpful, for example, when attempting to test local code changes on a mobile device.

## Install

Visit [ngrok's website](https://dashboard.ngrok.com/get-started/setup), setup an account & grab [the exe](https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-windows-amd64.zip)

## Usage

Follow the steps outlined at the installer page.

Add the path to ngrok to your system's environment variables >> path

If you have a command prompt open, run `refreshenv` in order to update the enviroment variables within this terminal.

Run the command to setup your auth token, it will look like:-

`ngrok authtoken 1WRE7FjLaaP5YtRVnGHwJRPiZWHP_3A8nVBN5Yab3PTp1FVMP`

The simply run:- `ngrok http 5005`

This will expose anything running on `localhost:5005` through NGROK

You may now visit the URL provided in the ngrok output, which should look like the below:-

```
Session Status                online                                                                                    Account                       some@programmer.com (Plan: Free)                                                       Update                        update available (version 2.3.40, Ctrl-U to update)                                       Version                       2.3.38                                                                                    Region                        United States (us)                                                                        Web Interface                 http://127.0.0.1:4040                                                                     Forwarding                    http://b90ef80f5be4.ngrok.io -> http://localhost:5005                                     Forwarding                    https://b90ef80f5be4.ngrok.io -> http://localhost:5005
```

In this instance, our URL would be `https://b90ef80f5be4.ngrok.io/`

## Known Issues

Some functionality will only work if you manually override parts of your local configuration, e.g. port forwarding etc.