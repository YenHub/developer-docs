# Fix Vmmem High Memory Usage WSL2

The vmmem process is a virtual process that the system synthesizes to represent the memory and CPU resources consumed by your virtual machines when using Windows Sub-System for Linux.

If you find vmmem consuming a lot of memory and CPU resources, you can use these steps to keep on top of it!

## Solution

Add the following alias to the tail of `~/.bashrc`

```bash
# Edit .bashrc (Right click to paste, Ctrl+X to save)
sudo nano ~/.bashrc

# Add the following line:-
alias drop_cache="sudo sh -c \"echo 3 >'/proc/sys/vm/drop_caches' && swapoff -a && swapon -a && printf '\n%s\n' 'Ram-cache and Swap Cleared'\""

# Then run source ~/.bashrc in your WSL shell to setup the alias
source ~/.bashrc

# Now you can simply run `drop_cache` in the terminal to clear
drop_cache
```

Following these steps, you may then run the `drop_cache` command from your WSL Bash Terminal when you need it

Simply run it when memory use creeps, or cron job it :)