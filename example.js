var drawImageNormalized = require(".");

var image = new Image();
image.onload = main;
image.src = "./image.png";

var table = document.createElement("table");
document.body.appendChild(table);

table.style.font = "normal 8px monosapce";

function display (rect) {
  var tr = document.createElement("tr");
  var head = document.createElement("td");
  head.appendChild(document.createTextNode("["+rect+"]"));
  tr.appendChild(head);

  [
    300, 100
  ].forEach(function (w) {
    var W = image.width;
    var H = image.height;
    var canvas1 = document.createElement("canvas");
    canvas1.width = w;
    var canvas2 = document.createElement("canvas");
    canvas2.width = w;
    var ctx1 = canvas1.getContext("2d");
    var ctx2 = canvas2.getContext("2d");
    ctx1.fillStyle="#000";
    ctx2.fillStyle="#000";
    ctx1.fillRect(0,0,canvas1.width,canvas2.height);
    ctx2.fillRect(0,0,canvas2.width,canvas2.height);

    var viewport = [ 0, 0, W, H ];
    var out1 = rect.concat(viewport);
    var out2 = drawImageNormalized.apply(this, [ctx2, image].concat(rect).concat(viewport));
    try {
      ctx1.drawImage.apply(ctx1, [ image ].concat(out1));
    }
    catch (e) {
      console.log(e);
    }
    if (out2) ctx2.drawImage.apply(ctx2, [ image ].concat(out2));

    var tdcanvas1 = document.createElement("td");
    tdcanvas1.innerHTML = out1+"<br/>";
    tdcanvas1.appendChild(canvas1);
    var tdcanvas2 = document.createElement("td");
    tdcanvas2.innerHTML = out2+"<br/>";
    tdcanvas2.appendChild(canvas2);
    tr.appendChild(tdcanvas1);
    tr.appendChild(tdcanvas2);
  });

  table.appendChild(tr);
}

function main () {
  var W = image.width;
  var H = image.height;
  [
    [
      ~~((Math.random()-0.5) * (2 * W)),
      ~~((Math.random()-0.5) * (2 * H)),
      ~~(W * 1.5 * Math.random()),
      ~~(H * 1.5 * Math.random())
    ],
    [ W/2, H/2, W/2, H/2],
    [ 0, 0, W, H ],
    [ 0, 0, W/2, H/2 ],
    [ 0, 0, 2*W, 2*H ],
    [ -10, 20, W/2, H ],
    [ -10, -10, W/2, H ],
    [ -10, -100, W, H ],
    [ -10, -100, W/2, H ],
    [ -10, 0, 2*W, 2*H ],
    [ -10, -10, 2*W, 2*H ]
  ].forEach(display);
}
