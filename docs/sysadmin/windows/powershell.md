# Powershell

## Get process by port (find process running on port)

```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort [YourPortNumberHere]).OwningProcess
```

## Symbolic Directory Links and Junctions

```powershell
New-Item -ItemType SymbolicLink -Path "Link" -Target "Target"
# Alternatively
New-Item -ItemType Junction -Path "Link" -Target "Target"
```
