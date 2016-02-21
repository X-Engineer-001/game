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
function IsCollidedMovingPointToPointOrPointToSurface(x,y,targetx,targety,targetwidth,targetheight){
  if(x>=targetx&&
    x<=targetx+targetwidth&&
    y>=targety&&
    y<=targety+targetheight){
    return true;
  }else{
    return false;
  }
}
function IsCollidedMovingPointToSurfaceOrSurfaceToSurface(x,y,width,height,targetx,targety,targetwidth,targetheight){
  if(IsCollidedMovingPointToPointOrPointToSurface(x,y,targetx,targety,targetwidth,targetheight)||
    IsCollidedMovingPointToPointOrPointToSurface(x+width,y,targetx,targety,targetwidth,targetheight)||
    IsCollidedMovingPointToPointOrPointToSurface(x,y+height,targetx,targety,targetwidth,targetheight)||
    IsCollidedMovingPointToPointOrPointToSurface(x+width,y+height,targetx,targety,targetwidth,targetheight)||
    IsCollidedMovingPointToPointOrPointToSurface(targetx,targety,x,y,width,height)||
    IsCollidedMovingPointToPointOrPointToSurface(targetx+targetwidth,targety,x,y,width,height)||
    IsCollidedMovingPointToPointOrPointToSurface(targetx,targety+targetheight,x,y,width,height)||
    IsCollidedMovingPointToPointOrPointToSurface(targetx+targetwidth,targety+targetheight,x,y,width,height)
    ){
    return true;
  }else{
    return false;
  }
}
function CollidedPointToPlane(x,y){
  for(var i=0;i<items.length;i++){
    if(i>0&&(IsCollidedMovingPointToPointOrPointToSurface(x,y,items[0].x+(items[i].x*itemwidth),items[0].y+(items[i].y*itemheight),itemwidth,itemheight)||
    IsCollidedMovingPointToPointOrPointToSurface(x,y,items[0].x-(items[i].x*itemwidth),items[0].y+(items[i].y*itemheight),itemwidth,itemheight))||
    i=0&&IsCollidedMovingPointToPointOrPointToSurface(x,y,items[0].x,items[0].y,itemwidth,itemheight)
    ){
      return i;
    }
  }
  return false;
}
function IsCollidedMovingPointToPlaneOrSurfaceToPlane(x,y,width,height){
  for(var i=0;i<items.length;i++){
    if(IsCollidedMovingPointToSurfaceOrSurfaceToSurface(x,y,width,height,items[0].x+(items[i].x*itemwidth),items[0].y+(items[i].y*itemheight),itemwidth,itemheight)||
    IsCollidedMovingPointToSurfaceOrSurfaceToSurface(x,y,width,height,items[0].x-(items[i].x*itemwidth),items[0].y+(items[i].y*itemheight),itemwidth,itemheight)
    ){
      return true;
    }
  }
  return false;
}
document.onmousemove=function(event){
  cursor.x=event.offsetX;
  cursor.y=event.offsetY;
};
document.onclick=function(){
  if(flag==0){
    if(IsCollidedMovingPointToPointOrPointToSurface(cursor.x,cursor.y,600,5,20,20)){
      itemflag=1;
    }else if(IsCollidedMovingPointToPointOrPointToSurface(cursor.x,cursor.y,625,5,20,20)){
      itemflag=2;
    }else if(IsCollidedMovingPointToPointOrPointToSurface(cursor.x,cursor.y,650,5,20,20)){
      itemflag=3;
    }else if(IsCollidedMovingPointToPointOrPointToSurface(cursor.x,cursor.y,675,5,20,20)){
      itemflag=4;
    }else if(CollidedPointToPlane(cursor.x,cursor.y)!=false){
      if(items[CollidedPointToPlane(cursor.x,cursor.y)].item==1){
        armorleft=armorleft+items[CollidedPointToPlane(cursor.x,cursor.y)].itemcost;
      }else if(items[CollidedPointToPlane(cursor.x,cursor.y)].item==2){
        gunleft=gunleft+items[CollidedPointToPlane(cursor.x,cursor.y)].itemcost;
      }else if(items[CollidedPointToPlane(cursor.x,cursor.y)].item==3){
        storageleft=storageleft+items[CollidedPointToPlane(cursor.x,cursor.y)].itemcost;
      }else if(items[CollidedPointToPlane(cursor.x,cursor.y)].item==4){
        turboleft=turboleft+items[CollidedPointToPlane(cursor.x,cursor.y)].itemcost;
      }
      items.splice(CollidedPointToPlane(cursor.x,cursor.y),1);
    }else{
      if(itemflag!=0){
        var newitem=new Item();
        items.push(newitem);
      }
      if(itemflag==1){
        armorleft=armorleft-items[items.length-1].itemcost;
        if(armorleft<0){
          armorleft=armorleft+items[items.length-1].itemcost;
          items.splice(items.length-1,1);
        }
      }else if(itemflag==2){
        gunleft=gunleft-items[items.length-1].itemcost;
        if(gunleft<0){
          gunleft=gunleft+items[items.length-1].itemcost;
          items.splice(items.length-1,1);
        }
      }else if(itemflag==3){
        storageleft=storageleft-items[items.length-1].itemcost;
        if(storageleft<0){
          storageleft=storageleft+items[items.length-1].itemcost;
          items.splice(items.length-1,1);
        }
      }else if(itemflag==4){
        turboleft=turboleft-items[items.length-1].itemcost;
        if(turboleft<0){
          turboleft=turboleft+items[items.length-1].itemcost;
          items.splice(items.length-1,1);
        }
      }
    }
  }
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
  if((cursor.x-(cursor.x%itemwidth)-items[0].x)/itemwidth==0){
    this.itemcost=1;
  }else{
    this.itemcost=2;
  }
}
function draw(){
  ctx.drawImage(bg,0,0,700,700);
  if(flag==0){
    draw0();
    for(var i=1;i<items.length;i++){
      if(items[i].item==1){
        draw1(i);
      }else if(items[i].item==2){
        draw2(i);
      }else if(items[i].item==3){
        draw3(i);
      }else if(items[i].item==4){
        draw4(i);
      }
    }
    ctx.drawImage(armor,600,5,20,20);
    ctx.drawImage(gun,625,5,20,20);
    ctx.drawImage(storage,650,5,20,20);
    ctx.drawImage(turbo,675,5,20,20);
    ctx.font="20px Arial";
    ctx.fillStyle="white";
    ctx.fillText(armorleft,605,20);
    ctx.fillText(gunleft,630,20);
    ctx.fillText(storageleft,655,20);
    ctx.fillText(turboleft,680,20);
  }
}
setInterval(draw,1000/FPS)
