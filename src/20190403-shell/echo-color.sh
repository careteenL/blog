#!/bin/bash

# 定义一个颜色输出字符串函数
function echo_color () {
  if [ $1 == "green" ]; then
    echo -e "\033[32;40m$2\033[0m"
  elif [ $1 == 'red' ]; then
    echo -e "\033[31;40m$2\033[0m"
  fi
}

# 调用
echo_color green "gao"
echo_color red "careteen"