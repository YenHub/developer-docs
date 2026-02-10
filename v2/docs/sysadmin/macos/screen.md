# Using the screen command

## Install screen

```bash
sudo apt update
sudo apt-get install screen
```

## Enter a screen session

```bash
screen
```

## Detach from a screen session

<kbd>CTRL</kbd> + <kbd>A</kbd> >> <kbd>D</kbd>

## Re-attach to the screen session

```bash
screen -r
```

## List screen session IDs

```bash
# Creating a named session will give accessibility via id or name
screen -S MyNamedSession

# List the sessions open
screen -ls
# There is a screen on:
# 	19624.MyNamedSession	(01/01/21 01:00:00)	(Detached)
```

## Re-attach by ID

```bash
screen -r 19624
```

## Example: Create a named session & reconnect to it

```bash
# Enter a named session
screen -S MyNamedSession

# Now detach from the session

# Now you can re-attach using the name specified
screen -r MyNamedSession
```

## Example: Running a background process as a daemon

```bash
screen -dmS ngrok ngrok start --all
```
