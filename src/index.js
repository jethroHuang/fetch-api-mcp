#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { fetchApiHandler } from './handler.js';

// 初始化MCP服务器
const server = new McpServer({
  name: "fetch-api",
  version: "1.0.0"
});

// 定义输入参数的验证模式
const inputSchema = {
  url: z.string().url(),
  method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS']).default('GET'),
  headers: z.record(z.string()).optional(),
  formData: z.record(z.string()).optional(),
  jsonData: z.any().optional(),
  cookies: z.record(z.string()).optional(),
};

// 注册工具
server.tool(
  'request',
  inputSchema,
  async (params) => {
    const result = await fetchApiHandler(params);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
    };
  },
  {
    description: '发送API请求并返回结果。使用方法：传入url（必需）、method（可选，默认GET）、headers（可选）、formData（可选，用于表单数据）、jsonData（可选，用于JSON数据）和cookies（可选）参数。例如：{ "url": "https://example.com/api", "method": "POST", "headers": {"Content-Type": "application/json"}, "jsonData": {"key": "value"}, "cookies": {"key": "value"} }。GET请求示例：{ "url": "https://example.com/api" }。返回包含status、statusText、headers和data的响应对象。'
  }
);

// 启动服务器
const transport = new StdioServerTransport();
await server.connect(transport);