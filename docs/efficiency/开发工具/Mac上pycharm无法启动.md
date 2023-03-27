# Mac 上 pycharm 无法启动

## 场景

Mac 安装 Pycharm，点击图标无法启动，总是自动退出

## 解决方案

1. 执行/Applications/PyCharm.app/Contents/bin/format.sh

   ```bash
   2020-08-25 19:19:42.502 pycharm[1619:20093] allVms required 1.8*,1.8+
   2020-08-25 19:19:42.503 pycharm[1619:20100] Current Directory: /Users/wangyong/Library/Caches
   2020-08-25 19:19:42.504 pycharm[1619:20100] Value of PYCHARM_VM_OPTIONS is (null)
   2020-08-25 19:19:42.504 pycharm[1619:20100] Processing VMOptions file at /Users/wangyong/Library/Application Support/JetBrains/PyCharm2020.2/pycharm.vmoptions
   2020-08-25 19:19:42.504 pycharm[1619:20100] Done
   OpenJDK 64-Bit Server VM warning: Option UseConcMarkSweepGC was deprecated in version 9.0 and will likely be removed in a future release.
   Error opening zip file or JAR manifest missing : /Applications/PyCharm.app/Contents/bin/jetbrains-agent.jar
   Error occurred during initialization of VM
   agent library failed to init: instrument
   [Caches]$cd /Users/wangyong/Library/Application
   ```

2. 删除/Users/wangyong/Library/Application Support/JetBrains/PyCharm2020.2/pycharm.vmoptions 即可启动
