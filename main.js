var FPS=60;
var flag=0;
var itemflag=0;
var itemwidth=20;
var itemheight=20;
var armorleft=0;
var gunleft=0;
var storageleft=0;
var turboleft=0;
var canvas=document.getElementById("gamecanvas");
var ctx=canvas.getContext("2d");
var bg=document.createElement("img");
bg.src="images/bg.png";
var core=document.createElement("img");
core.src="images/core.png";
var armor=document.createElement("img");
armor.src="images/armor.png";
var gun=document.createElement("img");
gun.src="images/gun.png";
var storage=document.createElement("img");
storage.src="images/storage.png";
var turbo=document.createElement("img");
turbo.src="images/turbo.png";
var cursor={
  x:0,
  y:0
};
document.onmousemove=function(event){
  cursor.x=event.offsetX;
  cursor.y=event.offsetY;
};
var items=[
  {
    item:0,
    x:340,
    y:340,
  },
  {
    item:1,
    x:1,
    y:0,
    itemcost:2
  },
  {
    item:2,
    x:0,
    y:-2,
    itemcost:1
  },
  {
    item:3,
    x:0,
    y:-1,
    itemcost:1
  },
  {
    item:4,
    x:1,
    y:1,
    itemcost:2
  }
]
function draw0(){
  ctx.drawImage(core,items[0].x,items[0].y,itemwidth,itemheight);
}
function draw1(I){
  ctx.drawImage(armor,items[0].x+(items[I].x*itemwidth),items[0].y+(items[I].y*itemheight),itemwidth,itemheight);
  ctx.drawImage(armor,items[0].x-(items[I].x*itemwidth),items[0].y+(items[I].y*itemheight),itemwidth,itemheight);
}
function draw2(I){
  ctx.drawImage(gun,items[0].x+(items[I].x*itemwidth),items[0].y+(items[I].y*itemheight),itemwidth,itemheight);
  ctx.drawImage(gun,items[0].x-(items[I].x*itemwidth),items[0].y+(items[I].y*itemheight),itemwidth,itemheight);
}
function draw3(I){
  ctx.drawImage(storage,items[0].x+(items[I].x*itemwidth),items[0].y+(items[I].y*itemheight),itemwidth,itemheight);
  ctx.drawImage(storage,items[0].x-(items[I].x*itemwidth),items[0].y+(items[I].y*itemheight),itemwidth,itemheight);
}
function draw4(I){
  ctx.drawImage(turbo,items[0].x+(items[I].x*itemwidth),items[0].y+(items[I].y*itemheight),itemwidth,itemheight);
  ctx.drawImage(turbo,items[0].x-(items[I].x*itemwidth),items[0].y+(items[I].y*itemheight),itemwidth,itemheight);
}
function Item(){
  this.item=itemflag;
  this.x=(cursor.x-(cursor.x%itemwidth)-items[0].x)/itemwidth;
  this.y=(cursor.y-(cursor.y%itemheight)-items[0].y)/itemheight;
  if(this.x=(cursor.x-(cursor.x%itemwidth)-items=[0].x)/itemwidth;==0){
    this.itemcost=1;
  }else{
    this.itemcost=2;
  }
}
function draw(){
  ctx.drawImage(bg,0,0,700,700);
  if(flag==0){
    ctx.drawImage(armor,600,5,20,20);
    ctx.drawImage(gun,625,5,20,20);
    ctx.drawImage(storage,650,5,20,20);
    ctx.drawImage(turbo,675,5,20,20);
    ctx.font="20px Arial";
    ctx.fillStyle="white";
    ctx.fillText(armorleft,600,25);
    ctx.fillText(gunleft,625,25);
    ctx.fillText(storageleft,650,25);
    ctx.fillText(turboleft,675,25);
    draw0();
    for(var i=1;i<items.length;i++){
      if(items[i].item==1){
        draw1(i);
      }else if(items[i].item==2){
        draw2(i);
      }else if(items[i].item==3){
        draw3(i);
      }else{
        draw4(i);
      }
    }
  }
}
setInterval(draw,1000/FPS)
