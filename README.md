# 猫二杯 · STRIVE "2" PURRFFECT

面向校园与社区音游玩家的民间线上音游比赛官网，包含 Phigros 与 Phira 两个项目。

- 线上地址：<https://xeycmd.github.io/strive2purrfect-website/>
- 仓库地址：<https://github.com/XEYcmd/strive2purrfect-website>

站点为纯静态 HTML / CSS / JavaScript，无构建步骤、无外部运行时依赖，直接部署在 GitHub Pages 上。

## 本地预览

任选一种方式，在项目根目录启动静态服务器：

```powershell
# Python
python -m http.server 8000

# 或 Node.js
npx serve .
```

然后打开 <http://127.0.0.1:8000/>。

请不要直接双击 `index.html`：页面使用相对路径，`file://` 协议下部分资源与脚本行为会不一致。

## 页面结构

| 文件 | 内容 |
| --- | --- |
| `index.html` | 首页：主视觉、赛事简介、项目、参赛流程、动态、报名入口 |
| `event.html` | 赛事介绍、项目详情、参赛资格、赛事精神、主视觉海报 |
| `schedule.html` | 赛程时间线、赛制表、奖品设置 |
| `rules.html` | 规则草案、通用条款、项目细则、申诉机制 |
| `register.html` | 报名说明与「即将开启」状态、材料清单、联系方式 |
| `faq.html` | 常见问题手风琴 |
| `404.html` | 404 页面（GitHub Pages 自动使用根目录的 404.html） |

```
assets/
  css/style.css          全站样式与设计系统
  js/main.js             导航、滚动显现、状态彩蛋、海报灯箱、规则目录
  fonts/                 Archivo Black + 按标题字符裁剪的 Noto Sans SC 子集
  img/                   处理后的 Logo、海报、蓝色纹理、条码、图标
素材/                     原始素材（不参与页面引用，可保留或删除）
```

## 部署到 GitHub Pages

1. 将本仓库推送到 GitHub 的 `main` 分支。
2. 打开仓库 **Settings → Pages**。
3. 在 **Build and deployment** 中选择 **Deploy from a branch**。
4. 分支选择 `main`，目录选择 `/ (root)`，保存。
5. 等待 Actions 完成，访问 <https://xeycmd.github.io/strive2purrfect-website/>。

仓库根目录已包含 `.nojekyll`，可避免 GitHub Pages 的 Jekyll 处理，并保证 `assets/` 等目录按原样发布。

## 内容维护

赛事日期、赛制细节、奖品、QQ 群、Bilibili、联系邮箱等目前均为占位内容。拿到最终信息后，建议按下面的顺序替换：

1. **全站导航与页脚**：`QQ 群 · 待公布`、`Bilibili · 待公布`、`联系组委会` 在 6 个页面中重复出现，建议全局搜索后统一替换。
2. **日期与赛程**：搜索 `待公布` / `筹备中`，重点修改 `schedule.html` 的时间线与 `event.html` 的赛事信息表。
3. **报名入口**：`register.html` 的「COMING SOON」区域、材料清单与报名按钮，以及首页的报名 CTA。
4. **奖品**：`schedule.html` 的奖品卡片；确认前请保留「最终以公告为准」的说明。
5. **SEO**：各页 `<head>` 中的 `canonical`、`og:url`、`og:image` 已指向正式域名，如更换域名需同步修改。
6. **页脚版权与免责声明**：确认赛事组名称及与 Phigros / Phira 官方的关系表述。

### 修改标题文字时的字体注意

中文标题使用本地裁剪的 Noto Sans SC 子集（`assets/fonts/NotoSansSC-subset-*.woff2`），仅覆盖当前页面出现过的字符。若新增了子集中没有的汉字，标题会回退到系统字体，字重可能不一致。新增标题文案后，可用 Google Fonts 的 `text=` 参数重新生成子集，或在 `style.css` 的 `@font-face` 中加入新的 `unicode-range` 子集文件。

### 状态彩蛋

页脚与首页的「火热筹备中」按钮可点击切换为「冰冷」。状态保存在 `localStorage` 的 `s2p-cold` 键中，不会影响任何赛事信息。上线后如需移除，删除 `data-cold-toggle` 元素及 `main.js` 中对应逻辑即可。

## 素材与版权

- 站点视觉素材来自赛事组提供的原始文件，已转换为 WebP / PNG 并做透明化与压缩处理。
- 本站为玩家自发组织的民间赛事网站，与 Phigros、Phira 官方无隶属关系。相关游戏名称、商标及素材版权归各自权利人所有。
- 页面中的赛事日期、赛制与奖品信息以最终公告为准。
