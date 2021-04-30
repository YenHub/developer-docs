# Backing Up Putty

Run either of these commands to save a backup of your Putty settings to a location of your choosing.

## Exporting Saved Sessions & Settings

```batchfile
regedit /e "%USERPROFILE%\Desktop\putty.reg" HKEY_CURRENT_USER\Software\SimonTatham
```

## Exporting ONLY Saved Sessions

```batchfile
regedit /e "%USERPROFILE%\Desktop\putty-sessions.reg" HKEY_CURRENT_USER\Software\SimonTatham\PuTTY\Sessions
```
