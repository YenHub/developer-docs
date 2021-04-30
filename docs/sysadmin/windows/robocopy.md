# Robocopy

## Cheat Sheet

| Switch                | Notes                                                                                                                        |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `/S`                    | Copy subdirectories (excludes empty directories).                                                                            |
| `/E`                    | Copy subdirectories (includes empty directories).                                                                            |
| `/Z`                    | Copy files in restartable mode.                                                                                              |
| `/ZB`                   | Use restartable mode. Turn to backup mode, if access is denied.                                                              |
| `/R:5`                  | Retry 5 times (change the number by your needs, the default value is 1 million).                                             |
| `/W:5`                  | Wait 5 seconds before retrying (you can specify a different number, default value is 30 seconds).                            |
| `/TBD`                  | Wait for the share names to be defined by the system (retry error 67).                                                       |
| `/NP`                   | Copying progress will not be displayed.                                                                                      |
| `/V`                    | Produce verbose output, showing skipped files.                                                                               |
| `/MT:128`               | Create multi-threaded copies with 16 threads (you can replace 16 with an integer between 1 and 128, the default value is 8). |
| `/LOG:C:\FILE-LOCATION` | Set a log file as specified (Be sure to use `/NP`, otherwise you get 0.01%,0.02%,0.03% etc...)                                 |
| `/TEE`                  | Still print output to screen                                                                                                 |
| `/MIR`                  | Acts as -E + -PURGE, Will delete any directories/files in the destination, that no longer exist in the source                |
| `/NFL`                  | No File List - don't log file names.                                                                                         |
| `/NDL`                  | No Directory List - don't log directory names.                                                                               |
| `/NJH`                  | No Job Header.                                                                                                               |
| `/NJS`                  | No Job Summary.                                                                                                              |
| `/NP`                   | No Progress - don't display percentage copied.                                                                               |
| `/NS`                   | No Size - don't log file sizes.                                                                                              |
| `/NC`                   | No Class - don't log file classes.                                                                                           |

## Helpful Examples

### Network Copy

```batchfile
robocopy \\source-device-ip\path to share folder C:\destination-device\path to store folder /S /E /Z /ZB /R:5 /W:5 /TBD /NP /V /MT:128
```

### Ignore node_modules

```batchfile
robocopy "source" "dest" /S /E /R:2 /W:1 /MT:32 /NP /XD *node_modules*
```

### Current templates

```batchfile
# eg
robocopy C:\Gilkes D:\Gilkes /S /E /Z /ZB /R:5 /W:5 /TBD /NP /V /MT:128
robocopy C:\Gilkes D:\Gilkes /S /E /R:2 /W:1 /MT:128 /TEE /NP /XD *node_modules*
robocopy C:\Gilkes D:\Gilkes /S /E /R:3 /W:1 /TBD /V /MT:128 /LOG:C:\Users\gilke\robo.log /TEE /NP
robocopy C:\Users\gilke\ "D:\Gilkes\CDrive\Old To Sort\gilkesi"  /S /E /Z /ZB /R:3 /W:1 /V /MT:128 /XD "C:\Users\gilke\AppData" "C:\Users\gilke\Local Settings" "C:\Users\gilke\Application Data" "C:\Users\gilke\Recent" /XF ntuser*

# GILKES Folder
robocopy C:\Gilkes D:\CDrive\Gilkes /S /E /R:2 /W:1 /MT:128 /TEE /NP /XD *node_modules*

# User DIR
robocopy C:\Users\gilke\ "D:\CDrive\Users\gilke" /S /E /R:2 /W:1 /MT:128 /NP /XD *node_modules* "C:\Users\gilke\.nuget" "C:\Users\gilke\MicrosoftEdgeBackups" "C:\Users\gilke\AppData" "C:\Users\gilke\OneDrive" "C:\Users\gilke\Local Settings" "C:\Users\gilke\Application Data" "C:\Users\gilke\Recent" /XF ntuser*
robocopy "C:\Program Files (x86)\Steam\steamapps " "D:\Steam Backup\steamapps " /S /E /R:2 /W:1 /MT:32 /NP /XD *node_modules*
robocopy "C:\[GIT] " "D:\CDrive\[GIT] " /S /E /R:2 /W:1 /MT:32 /NP /XD *node_modules*
NEXT:-
robocopy "C:\Photoshop " "D:\CDrive\Photoshop " /S /E /R:2 /W:1 /MT:32 /NP /XD *node_modules*
```
