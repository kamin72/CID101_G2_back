# Silken Sip Vineyard 葡萄酒電商平台 - 後台管理系統

## 專案概述

Silken Sip Vineyard 後台管理系統是一個專為葡萄酒電商平台設計的管理介面，提供完整的產品管理、會員管理、訂單處理、課程管理、優惠券管理等功能。本系統使用 Vue 3 和 Vite 開發，旨在提供高效、直觀的管理體驗。

本專案是為了練習前端技術而開發的作品，展示 Vue 3 與相關技術在後台管理系統中的實際應用，並提供一個完整的電商管理平台開發經驗。

## 功能特點

### 會員管理
- 會員資料查詢與編輯
- 會員權限管理
- 會員訂單歷史查詢

### 產品管理
- 產品新增、編輯與刪除
- 產品分類管理
- 產品庫存管理

### 訂單管理
- 訂單狀態追蹤與更新
- 訂單詳情查看
- 出貨管理

### 課程管理
- 課程新增與編輯
- 課程預約管理
- 課程訂單處理

### 優惠券管理
- 優惠券創建與編輯
- 優惠券使用追蹤
- 促銷活動設定

### 最新消息管理
- 消息發佈與編輯
- 消息上下架管理
- 富文本編輯器整合

### 測驗管理
- 品酒達人遊戲題目管理
- 測驗結果分析

### 管理員權限
- 管理員帳號管理
- 權限分級設定

## 技術架構

### 前端技術
- **框架**：Vue 3 + Vite
- **狀態管理**：Pinia
- **路由管理**：Vue Router
- **樣式處理**：SASS/SCSS
- **UI 框架**：Bootstrap 5
- **富文本編輯器**：TinyMCE

### 開發工具
- **程式碼檢查**：ESLint
- **程式碼格式化**：Prettier
- **建議開發環境**：VSCode + Volar 擴充功能

## 安裝指南

### 環境需求
- Node.js (建議使用最新 LTS 版本)
- npm 或 yarn 套件管理工具

### 安裝步驟

1. 複製專案到本地
```sh
git clone [專案 Git 倉庫 URL]
cd CID101_G2_back
```

2. 進入專案目錄
```sh
cd G2_BACK
```

3. 安裝相依套件
```sh
npm install
```

4. 設定環境變數
- 複製 `.env.development` 檔案並根據需要進行修改

## 使用方法

### 開發環境

啟動開發伺服器：
```sh
npm run dev
```

### 生產環境

建置生產版本：
```sh
npm run build
```

使用生產模式建置：
```sh
npm run prod
```

預覽生產版本：
```sh
npm run preview
```

### 程式碼品質管理

執行程式碼檢查：
```sh
npm run lint
```

格式化程式碼：
```sh
npm run format
```

## 專案結構

```
G2_BACK/
├── public/              # 靜態資源目錄
├── src/                 # 原始碼目錄
│   ├── assets/          # 資源檔案（圖片、樣式等）
│   ├── components/      # 共用元件
│   ├── router/          # 路由配置
│   ├── stores/          # Pinia 狀態管理
│   ├── views/           # 頁面元件
│   │   ├── AddCoursePage.vue         # 新增課程頁面
│   │   ├── AdministratorManage.vue   # 管理員管理頁面
│   │   ├── CourseManage.vue          # 課程管理頁面
│   │   ├── CourseOrderManage.vue     # 課程訂單管理頁面
│   │   ├── DiscountManage.vue        # 優惠券管理頁面
│   │   ├── LoginView.vue             # 登入頁面
│   │   ├── MemberManage.vue          # 會員管理頁面
│   │   ├── NewsManage.vue            # 最新消息管理頁面
│   │   ├── OrderManage.vue           # 訂單管理頁面
│   │   ├── ProductManage.vue         # 產品管理頁面
│   │   └── QuizManage.vue            # 測驗管理頁面
│   ├── App.vue          # 根元件
│   └── main.js          # 應用程式入口
├── .env.development     # 開發環境變數
├── .env.production      # 生產環境變數
├── .eslintrc.cjs        # ESLint 配置
├── .prettierrc.json     # Prettier 配置
├── index.html           # HTML 入口
├── jsconfig.json        # JavaScript 配置
├── package.json         # 專案依賴與腳本
└── vite.config.js       # Vite 配置
```

## 與前台的整合

本後台管理系統與 Silken Sip Vineyard 前台電商平台緊密整合，管理員可以通過本系統管理前台顯示的所有內容，包括產品、課程、會員、訂單和促銷活動等。

## 安全性考量

- 本系統實作了基於角色的訪問控制 (RBAC)
- 所有 API 請求都需要進行身份驗證
- 敏感操作需要額外的權限確認

## 部署說明

本專案可以部署到任何支援靜態網站的服務上，如 Vercel、Netlify 或 GitHub Pages。

## 注意事項

- 本系統僅供授權管理員使用
- 請妥善保管管理員帳號密碼
- 定期備份重要數據
