const Koa = require('koa');
const { createCanvas } = require('canvas');

function createImage(width, height, fColor, bColor) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = fColor;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = bColor;
  ctx.font = '24px';
  ctx.textAlign = 'center';
  ctx.fillText(`${width} X ${height}`, width / 2, height / 2);
  return canvas.toDataURL();
}

const app = new Koa();
app.use(async (ctx, next) => {
  const method = ctx.method;
  const path = ctx.path;
  if (method !== 'GET' || path !== '/image-mocker') {
    return ctx.body = '请使用 GET 请求方法，且请求路径为 /image-mocker';
  }
  const { width = 200, height = 200, fColor = '#eee', bColor = '#000' } = ctx.query;
  const res = await createImage(Number(width), Number(height), fColor, bColor);
  ctx.body = res;
})

const port = 16660;
app.listen(port);
console.log(`服务已启动: http://127.0.0.1:${port}`);