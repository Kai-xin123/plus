# 积分系统（Cloudflare Pages + KV）

## 文件结构
```
积分/
├── index.html                 管理员端：积分、抽选、抽卡、发放作业
├── wrangler.toml              Pages 配置，KV 绑定名 plus
├── functions/api/
│   ├── data.js                积分/卡片/配色（key: all）
│   └── homework.js            作业（key: homework）
└── 学生端/index.html          学生端：只读显示作业，10秒自动刷新
```

## 功能
- 管理员端右上角「📋 发放作业」：编辑并保存作业，写入 KV。
- 学生端打开只显示发放的作业文字，自动定时刷新，无任何操作按钮。
- 学生端访问地址：`https://你的站点/学生端/`

## 部署（Dashboard 上传）
1. Cloudflare → Workers & Pages → Create → Pages → 直接上传整个「积分」文件夹。
2. 项目 Settings → Bindings → KV namespace → Add，变量名填 `plus`，选择已创建的 KV。
3. Redeploy 生效。

## 命令行
```
cd 积分
npx wrangler login
npx wrangler pages dev . --kv=plus        # 本地预览
npx wrangler pages deploy . --project-name=score-plus
```

## KV 说明
- 绑定名 `plus`。
- 积分/卡片/配色整体存在 key `all`；作业单独存在 key `homework`。
- 无服务时管理员端回退浏览器本地存储；学生端无服务会提示加载失败。
