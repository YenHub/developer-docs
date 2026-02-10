# Virtual Box Tips!

## Resizing Virtual Machine HD (Best Option)

```batch
# Set the path variable so you can call VBoxManage
set PATH=%PATH%;"C:\Program Files\Oracle\VirtualBox"

# Create a blank HD
VBoxManage createhd --filename Newhardisk.vdi --size 20480

# Clone the old disk to the new one
vboxmanage clonehd "original.vdi" --existing "Newhardisk.vdi"

# Release the old HD from the VM, and add the new disk

# Now on the VM
sudo pvscan
# Resize the physical volume
sudo pvresize /dev/sda3
# Allocate the space to the logical volume
sudo lvextend -l +100%FREE /dev/ubuntu-vg/ubuntu-lv
# Apply the change to the filesystem
sudo resize2fs /dev/ubuntu-vg/ubuntu-lv
```

## Resizing Virtual Machine HD (opt 2)

```batch
# Set the path variable so you can call VBoxManage
set PATH=%PATH%;"C:\Program Files\Oracle\VirtualBox"

# Copy the original disk >> Virtual Media Manager >> Right Click the disk >> Copy >> Dynamic Size
vboxmanage clonehd "original.vdi" "original_clone.vdi"

# CD to your folder with the VM

# Modify the HD
VBoxManage modifyhd my_old_VM_HD.vdi --resize 20000

# Backup the old VDI
cp box.ova box.ova.ori

# Now on the VM
sudo pvscan
# Resize the physical volume
pvresize /dev/sda3
# Allocate the space to the logical volume
sudo lvextend -l +100%FREE /dev/ubuntu-vg/ubuntu-lv
# Apply the change to the filesystem
sudo resize2fs /dev/ubuntu-vg/ubuntu-lv
```
