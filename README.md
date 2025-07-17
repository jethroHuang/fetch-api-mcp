# Fetch API MCP 服务器

这是一个基于MCP（Model Context Protocol）的API请求服务器，可以发送各种HTTP请求并返回结果。

## 功能

- 支持多种HTTP方法（GET, POST, PUT, DELETE等）
- 支持自定义请求头
- 支持表单数据提交
- 支持JSON数据提交
- 支持Cookie设置
- 自动处理不同类型的响应（JSON, 文本, 二进制）

## Cursor安装

npm 安装

``` shell
npm install -g fetch-api-mcp
```

打开 cursor mcp 配置，添加配置项：

``` json
"fetch-api": {
  "command": "mcp-server-fetch-api"
}
```

## 开发安装

```bash
npm install
```

## 调试

### 启动服务器

```bash
npm start
```

或者直接运行：

```bash
node src/index.js
```

### 参数说明

MCP服务器接受以下参数：

- `url`: 请求的URL（必填）
- `method`: 请求方法，默认为GET
- `headers`: 请求头，对象格式
- `formData`: 表单数据，对象格式
- `jsonData`: JSON数据，对象格式
- `cookies`: Cookie数据，对象格式

### 返回数据

服务器返回以下数据：

- `status`: HTTP状态码
- `statusText`: HTTP状态文本
- `headers`: 响应头
- `data`: 响应数据（会根据Content-Type自动解析为JSON、文本或Base64编码的二进制数据）

## 示例

### 发送GET请求

```json
{
  "url": "https://api.example.com/data",
  "method": "GET",
  "headers": {
    "User-Agent": "MCP-Fetch-API/1.0"
  }
}
```

### 发送POST请求（JSON数据）

```json
{
  "url": "https://api.example.com/submit",
  "method": "POST",
  "headers": {
    "User-Agent": "MCP-Fetch-API/1.0"
  },
  "jsonData": {
    "name": "测试用户",
    "email": "test@example.com"
  }
}
```

### 发送POST请求（表单数据）

```json
{
  "url": "https://api.example.com/form",
  "method": "POST",
  "formData": {
    "username": "testuser",
    "password": "password123"
  }
}
```

### 带Cookie的请求

```json
{
  "url": "https://api.example.com/profile",
  "method": "GET",
  "cookies": {
    "session": "abc123",
    "user_id": "12345"
  }
}
``` 