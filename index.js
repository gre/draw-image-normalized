module.exports = function drawImageNormalized (ctx, image, sx, sy, sw, sh, dx, dy, dw, dh) {

  if (arguments.length <= 6) {
    dx = sx;
    dy = sy;
    dw = sw;
    dh = sh;
    sx = 0;
    sy = 0;
    sw = image.width;
    sh = image.height;
  }
  if (arguments.length <= 4) {
    dw = sw;
    dh = sh;
  }

  if (sx < 0) {
    dx -= sx * dw / sw;
    dw += sx * dw / sw;
    sw += sx;
    sx = 0;
  }
  if (sy < 0) {
    dy -= sy * dh / sh;
    dh += sy * dh / sh;
    sh += sy;
    sy = 0;
  }
  if (sx + sw > image.width) {
    var x = sx + sw - image.width;
    dw *= (sw - x) / sw;
    sw = image.width;
  }
  if (sy + sh > image.height) {
    var y = sy + sh - image.height;
    dh *= (sh - y) / sh;
    sh = image.height;
  }

  if (sw <= 0 || sh <= 0 || dw <= 0 || dh <= 0) return;
  ctx.drawImage.apply(ctx, [image, sx, sy, sw, sh, dx, dy, dw, dh ]);
};
