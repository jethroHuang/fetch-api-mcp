/**
 * Fetch API处理器
 * 处理API请求并返回结果
 */
export async function fetchApiHandler({ url, method, headers = {}, formData, jsonData, cookies }) {
  try {
    // 准备请求选项
    const options = {
      method,
      headers: { ...headers },
    };

    // 处理cookies
    if (cookies && Object.keys(cookies).length > 0) {
      const cookieString = Object.entries(cookies)
        .map(([key, value]) => `${key}=${value}`)
        .join('; ');
      options.headers.Cookie = cookieString;
    }

    // 处理请求体
    if (method !== 'GET' && method !== 'HEAD') {
      if (formData && Object.keys(formData).length > 0) {
        // 处理表单数据
        const form = new URLSearchParams();
        Object.entries(formData).forEach(([key, value]) => {
          form.append(key, value);
        });
        options.body = form.toString();
        options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      } else if (jsonData) {
        // 处理JSON数据
        options.body = JSON.stringify(jsonData);
        options.headers['Content-Type'] = 'application/json';
      }
    }

    // 发送请求
    const response = await fetch(url, options);
    
    // 获取响应头
    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    // 尝试解析响应体
    let data;
    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else if (contentType?.includes('text/')) {
      data = await response.text();
    } else {
      // 对于二进制数据，转换为base64字符串
      const buffer = await response.arrayBuffer();
      data = Buffer.from(buffer).toString('base64');
    }

    // 返回结果
    return {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      data,
    };
  } catch (error) {
    // 处理错误
    return {
      status: 500,
      statusText: 'Internal Server Error',
      headers: {},
      data: {
        error: error.message,
        stack: error.stack,
      },
    };
  }
} 