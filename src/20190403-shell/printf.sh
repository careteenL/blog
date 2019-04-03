#!/bin/bash
# 查看`dev/disk1`占用百分比情况
printf "%s\t%s\t%s\t%s\t%s\t%s\n" $(df -h | grep /dev/disk1) | cut -f 5 | cut -d % -f 1