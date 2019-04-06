#!/bin/bash
# 判断url是否可用
# 方法1：
function check_url() {
  HTTP_CODE=$(curl -o /dev/null --connect-timeout 3 -s -w "%{http_code}" $1)
  if [ $HTTP_CODE -ne 200 ]; then
    echo "Warning: $1 Access failure!"
  fi
}
# 方法2：
function check_url2() {
if ! wget -T 10 --tries=1 --spider $1 >/dev/null 2>&1; then  
#-T超时时间，--tries尝试1次，--spider爬虫模式
    echo "Warning: $1 Access failure!"
  fi
}

check_url "www.baidu.com" # success
check_url "www.aa.com" # failure