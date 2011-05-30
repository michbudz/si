// ugly globals
var xmin=0;
var xmax=200;
var e=2; // how many SDs in each direction from mean to draw

var data=[];
var ymin=0;
var ymax=2;
var bw = 0;
var kolory = new Array ('rgba(205,102,29,0.5)', 'rgba(9,249,17, 0.5)' , 'rgba(205,16,118 , 0.5)');

var col1 = { r:255, g:158, b:63 };
var col2 = { r:255, g:255, b:128 };
var alpha1 = 0.9;
var alpha2 = 0.5;








function drawGaussianCanvas(redraw) {
    ymin = 0;
    ymax = 3;
    
    canvas = document.getElementById("graph");
    ctx = canvas.getContext("2d");
    
    if(redraw) {
        // background
        var lingrad = ctx.createLinearGradient(0,0,0,300);
        lingrad.addColorStop(0, '#00ABEB');
        lingrad.addColorStop(1.0, '#B2DCF9');
        
        ctx.fillStyle = "rgb(232, 238, 246)";
        ctx.fillStyle = lingrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // grid
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        
        ctx.lineWidth = 1;
        if(bw&&bw.ie) { ctx.strokeStyle = "#B2DCF9"; }
        var yunit=canvas.height/15.0;
        var xunit=canvas.width/40.0;
        ctx.beginPath();
        for(var i=0;i<15;i++) {
            ctx.moveTo(0,i*yunit);
            ctx.lineTo(canvas.width,i*yunit);
        }
        for(var i=0;i<40;i++) {
            ctx.moveTo(i*xunit,0);
            ctx.lineTo(i*xunit,canvas.height);
        }
        ctx.stroke();
    }
    
    
    var rx=xmax-xmin;
    var ry=ymax-ymin;
    
    
    
    
    
    // shadow
    var x=0;
    var y=canvas.height;
     ctx.lineWidth = 2;
    if(bw&&bw.ie) ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath();
    ctx.stroke();
    
    //surface
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 2;
        ctx.beginPath();

         ctx.moveTo(canvas.width*(tab[0][0][0]-xmin)/rx,canvas.height);

         for( var licz = 0 ; licz <tab.length ; licz ++)
         	{
         	
         ctx.fillStyle=kolory[licz];
         
        
        for(var p=0;p<tab[0].length;p++) {
           	 	x=canvas.width*(tab[licz][p][0]-xmin)/rx;
            	y=canvas.height-0.8*canvas.height*(tab[licz][p][1]*2-ymin)/ry;
            	ctx.lineTo(x,y);
 
        }
       			 x=canvas.width*(tab[licz][0][0]-xmin)/rx;
            	y=canvas.height-0.8*canvas.height*(tab[licz][0][1]*2-ymin)/ry;
        ctx.lineTo(x,y);
       
        ctx.closePath();

          ctx.strokeStyle = "rgba(255,255,255,0.85)";
   		  ctx.lineWidth = 2;
   		  ctx.beginPath();
   		  
        for(var p=0;p<tab[0].length;p++) {
           	 	x=canvas.width*(tab[licz][p][0]-xmin)/rx;
            	y=canvas.height-0.8*canvas.height*(tab[licz][p][1]*2-ymin)/ry;
            	ctx.lineTo(x,y);
        
      
        
        }
         x=canvas.width*(tab[licz][0][0]-xmin)/rx;
         y=canvas.height-0.8*canvas.height*(tab[licz][0][1]*2-ymin)/ry;
        ctx.lineTo(x,y);
         ctx.stroke();
         ctx.fill();
        }
 
    
}

function makeXLabel(min,max,n,width) {
    var p=document.getElementById("xlabel");
    var tick_unit=(max-min)/n;
    var width_unit=width/n;
    for(var i=0;i<n+1;i++) {
        var tick = document.createElement("span");
        tick.innerHTML=min+tick_unit*i;
        tick.className="tick";
        tick.style.left=(-10+width_unit*i)+"px";
        p.appendChild(tick);
    }
}

function makeYLabel(min,max,n,width) {
    var p=document.getElementById("graph");
    var x=findPosX(p);
     var y=findPosY(p);
     var p=document.getElementById("ylabel");
    var tick_unit=(max-min)/n;
  
    var width_unit=width/n;
  
   for(var i=0;i<n+1;i++) {
        var tick = document.createElement("span");
        tick.innerHTML=max- tick_unit*i;
        tick.className="tick";
        tick.style.top=(-10+y+width_unit*i)+"px";
        tick.style.left=x-30 +"px";
        p.appendChild(tick);
       
        }
   
}



function load() {
	 
    // make browser specific hacks
    bw=new checkBrowser;
    
    start = new Date();
    makeXLabel(xmin,xmax,20,800);
    makeYLabel(ymin, ymax,4 , 300);
   
   drawGaussianCanvas(1,col1,alpha1);
   // makeData(100,110,15);
    //drawGaussianCanvas(0,col2,alpha2);
    end = new Date();
    //alert((end-start)/1000.0);
   
}


function update(i) {
	console.log("update");
	
    var i=0;
	while( i < tab.length)
		{
		var x1=parseFloat(document.valform.elements[nazwy[i]+"X1"].value );
		var x2=parseFloat(document.valform.elements[nazwy[i]+"X2"].value );
		var x3=parseFloat(document.valform.elements[nazwy[i]+"X3"].value );
		var x4=parseFloat(document.valform.elements[nazwy[i]+"X4"].value );
		
		if( x1 >=x2 )
			{
			
			tab[i][0][0]=tab[i][1][0];
			
			}
		else
			{
			tab[i][0][0]=x1;
			}
		
		if(x2 >=x3 )
		{
			tab[i][1][0]=tab[i][2][0];;
		}
		else if( x2 <= x1)
		{
			tab[i][1][0]=tab[i][0][0];;
		}
		else
			{
			tab[i][1][0]= x2;
			}
		
		if( x3 >=x4)
			{
			tab[i][2][0]=tab[i][3][0];
			}
		else if( x3 <= x2)
			{
			tab[i][2][0]=tab[i][1][0];
			}
		else
			{
			tab[i][2][0]=x3;
			}
		
		if(x4<=x3)
			{
			tab[i][3][0]=tab[i][2][0];
			}
		else
			{
			tab[i][3][0]=x4;
			}
		i++;
		}
	 
	   /*
    var tmp ;
    alert(miejsce-1);
    tmp= nazwy[miejsce-1]+"x1";
    
    tab[miejsce-1][0][0]=parseFloat(document.valform.elements[tmp].value );
    tmp = nazwy[miejsce-1]+"x2";
    tab[miejsce-1][1][0]=parseFloat(document.valform.elements[tmp].value );
    tmp = nazwy[miejsce-1]+"x3";
    tab[miejsce-1][2][0]=parseFloat(document.valform.elements[tmp].value );
    tmp = nazwy[miejsce-1]+"x4";
    tab[miejsce-1][3][0]=parseFloat(document.valform.elements[tmp].value );
   */
  //alert(parseInt(document.potwierdz1));
    
    
   
   // sd= parseFloat(document.valform.sd.value);
   //mn= parseFloat(document.valform.mn.value);
    //makeData(amp,mn,sd);
   
    drawGaussianCanvas(1);
}



// check for browser
// (from MediaWiki)
function checkBrowser(){
    this.ver=navigator.appVersion;
    this.name=navigator.appName;
    this.mac=(navigator.platform.toLowerCase().indexOf('mac')>-1)?true:false;
    this.opera=(navigator.userAgent.toLowerCase().indexOf('opera')>-1)?true:false;
    this.dom=document.getElementById?true:false;
    this.ns=(this.name=='Netscape');
    this.ie4=(document.all && !this.dom)?true:false;
    this.ie=(this.name =='Microsoft Internet Explorer'&&!this.opera)?true:false;
    this.ie5=(this.ie && (navigator.userAgent.indexOf("MSIE 5")!=-1))?true:false;
    this.macie50=(this.mac&&this.ie5&&(navigator.userAgent.indexOf("MSIE 5.0")!=-1))?true:false
    this.ns4=(this.ns && parseInt(this.ver) == 4)?true:false;
    this.ns6=((this.name=="Netscape")&&(parseInt(this.ver)==5))?true:false
    this.standards=document.getElementById?true:false;
    this.dhtml=this.standards||this.ie4||this.ns4;
    this.ff=(navigator.userAgent.indexOf("Firefox")!=-1)?true:false;
}


function findPosX(obj) {
    var nleft = 0;
   
    if (obj.offsetParent) {
        nleft = obj.offsetLeft
       
        while (obj = obj.offsetParent) {
            nleft += obj.offsetLeft
            
        }
    }
    return nleft;
}
function findPosY(obj) {
   
    var ntop = 0;
    if (obj.offsetParent) {
        
        ntop = obj.offsetTop
        while (obj = obj.offsetParent) {
            
            ntop += obj.offsetTop
        }
    }
    return ntop;
}
				