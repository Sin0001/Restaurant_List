# Restaurant List
一個簡易的餐廳列表網站，可以搜尋、查看熱門餐廳資訊。

### Features
+ 可以註冊帳號、使用facebook登入
+ 在首頁查看所有餐廳清單列表
+ 在搜尋輸入餐廳名稱關鍵字，可搜尋餐廳
+ 在搜尋輸入餐廳類別關鍵字，可搜尋餐廳
+ 點擊加入新餐廳可以新增一筆餐廳
+ 點擊detail可以查看餐廳的詳細資訊
+ 點擊edit可以編輯餐廳
+ 點擊delete可以刪除餐廳

### Installation and execution
1. 打開 terminal 將此專案 clone 到本機電腦
```
git clone https://github.com/Sin0001/Restaurant_List.git
```
2. 安裝
```
cd Restaurant_List
```
```
npm install
```
```
將檔案.env.example改為.env
```
```
npm run seed
```
3. 執行程式
```
npm run dev
```
4. 當 terminal 出現以下字樣，表示伺服器已啟動，連結成功
```
Express is listening on localhost:3000
```
### Prerequisites
+ Visual Studio Code
+ Node.js & npm
+ Express.js
+ Express-Handlebars
+ express-session
+ method-override
+ passport
+ mongoDB & mongoose
