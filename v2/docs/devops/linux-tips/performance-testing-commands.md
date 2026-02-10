# Performance Testing Bash Commands

You can use [gnu-time] to run a performance analysis of any command run in bash.

## First, install [gnu-time] via brew:

```bash
brew install gnu-time
```

## Now run a performance test:

```bash
gtime -f "\nElapsed: %E \nUser: %U \nSystem: %S \nMemory: %M\n" \
heavy-script.sh > output
```

### Output

```txt
Elapsed: 0:00.81
User: 0.80
System: 0.00
Memory: 5184
```

<!-- LINKS -->

[gnu-time]: https://formulae.brew.sh/formula/gnu-time
