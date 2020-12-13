import Main from "./main";
import {Size} from "./dataObjects"
class Engine {
  constructor(
    canvasElement: HTMLCanvasElement,
    canvasRender: CanvasRenderingContext2D,language:any
  ) {
    this.view = canvasElement;
    this.render = canvasRender;
    this.language=language
    this.draw()
    Main();
  }
  view: HTMLCanvasElement;
  language:any
  get viewSize(){
    return new Size(this.view.width,this.view.height)
  }
  render: CanvasRenderingContext2D;
  
    drawText(x:number,y:number,text:string="Empty Text",color:string,size=16){
      this.render.fillStyle=color
      this.render.font=`${size}px 'default'`
      this.render.fillText(text,x,y)
    }
    drawShadowText(x:number,y:number,text:string="Empty Text",color:string="#109eff",shadowColor:string="#fff",size=16,shadowSize=1){
      for(let sizeCount=0;sizeCount<=shadowSize;sizeCount++){
      this.render.fillStyle=shadowColor
      this.render.font=`${size}px 'default'`
      this.render.fillText(text,x+sizeCount,y+sizeCount)}
      this.render.fillStyle=color
      this.render.font=`${size}px 'default'`
      this.render.fillText(text,x,y)
      
    }
  objects=[]
  error(title:any,msg:string="Unknown Error"){
    this.drawShadowText(0,0,`[!] Error catch in console`,"#f00","#fff",18);
    console.error(`\nError ${title}:\n${msg}`);
  }
  draw() {
    this.render.fillStyle="#000"
    this.render.fillRect(0,0,this.viewSize.width,this.viewSize.height)
    // this.render.fillStyle="#f00"
    this.render.textAlign="left"
    this.render.textBaseline="top"
    if(this.objects.length===0){
    this.error("noObjects",this.language.errors.noObjects);return
  }
    requestAnimationFrame(() => {
      this.draw();
    });
  }
  update() {}
}
export { Engine };
