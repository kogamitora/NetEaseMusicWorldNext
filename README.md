# NetEaseMusicWorld++

简体中文 | [English](README_EN.md) | [日本語](README_JA.md)

> 解锁网易云音乐网页版海外访问限制的 Chrome 扩展程序（新版）

## 插件地址

[Chrome 网上应用商店](https://chromewebstore.google.com/detail/neteasemusicworld++/ibglohpjgdhkmhmfpdibjgmjjmccafmh)

## 简介

这是一个帮助海外用户访问网易云音乐的 Chrome 扩展程序。本项目是在前两个版本的基础上，针对 Chrome 最新版本的扩展要求进行了优化。

由于原作者不再维护，且本人在海外经常需要使用网易云音乐，因此对这个扩展进行了更新，方便更多海外用户使用。




## 历史版本

- 第一版：[acgotaku/NetEaseMusicWorld](https://github.com/acgotaku/NetEaseMusicWorld)
- 第二版：[nondanee/NetEaseMusicWorldPlus](https://github.com/nondanee/NetEaseMusicWorldPlus)

## 主要更新

1. 采用 Chrome Extension Manifest V3
   - 符合 Chrome 最新扩展规范
   - 不会出现扩展程序被禁用的提示
   - 提供更好的性能和安全性

2. 优化功能实现
   - 使用 declarativeNetRequest 替代传统的请求拦截
   - 简化为单一模式，操作更直观
   - 无需修改系统 hosts 文件

## 使用方法

1. 安装扩展后，点击工具栏的扩展图标即可切换启用/禁用状态
2. 灰色图标表示禁用状态
3. 红色图标表示启用状态

## 隐私说明

- 不收集任何用户数据
- 仅修改必要的网络请求
- 所有代码开源可见