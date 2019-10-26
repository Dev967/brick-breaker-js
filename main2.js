let test = localStorage.getItem('bviews');
let canvas = document.getElementById('gameScreen');
let ctx = canvas.getContext('2d');
let gameWidth = 800;
let gameHeight = 400;
let over = document.getElementById("over");
over.style.opacity = "0";
let met = document.getElementById("score");
let met2 = document.getElementById("score2");
let score = 0;
let i = 0;
let j = 1;
document.addEventListener('keydown',(event)=>{
    switch(event.keyCode){
        case 13: 
        location.reload();
    }
})
class paddle{
constructor(gameHeight,gameWidth){
    this.height = 20;
    this.width = 100;

    this.maxSpeed =10;
    this.speed = 0;

    this.position ={
        x: gameWidth/2 - this.width/2,
        y: gameHeight - this.height -10,
    }
}
draw(ctx){
    ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
}
update(){

    this.position.x += this.speed;
    
    if(this.position.x<0){
        this.position.x =2;
    }else if(this.position.x>700){
        this.position.x =698;
    }
}
moveLeft(){

    this.speed = -this.maxSpeed;
}
moveRight(){
    this.speed = this.maxSpeed;
}
 //STOP
stop(){               
    this.speed = 0;  
}
}

class ball{
    constructor(gameWidth,gameHeight){
        this.img = document.getElementById('ball');
        this.position ={
            x:10,
            y:10,
        }
        this.size = 20;
        this.speed ={x:3,y:3,}
        this.gameHeight = gameHeight;
        this.gameWidth = gameWidth;
    }

    draw(ctx){
        ctx.drawImage(this.img,this.position.x,this.position.y,this.size,this.size);
    }
    update(Paddle){
        //bouncing back when touched the paddle
        let topOfBall = this.position.y + this.size;
        let topOfPaddle = Paddle.position.y;
        let leftOfPaddle = Paddle.position.x;
        let rightOfPaddle = Paddle.position.x + Paddle.width;
        if(topOfBall >= topOfPaddle && this.position.x >= leftOfPaddle && this.position.x <= rightOfPaddle){
            this.speed.x -=0.2; 
            this.speed.y = -this.speed.y-0.5;
            this.position.y = Paddle.position.y - this.size;
            console.log(this.speed.y);
            console.log(this.speed.x);
            }
             //Bouncing back normally
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
        if(this.position.x>this.gameWidth-40 || this.position.x <0) this.speed.x = -this.speed.x;
        if( this.position.y <0 ){ 
            this.speed.y = -this.speed.y;            
        }
        met.innerHTML = i;
        met2.innerHTML = "highscore "+ test;
        i +=j;
        if(this.position.y > gameHeight) {
            this.speed = 0;
            Paddle.maxSpeed = 0;
            over.style.opacity = "1";
            if(i>test){
                 localStorage.setItem('bviews',i);
                 console.log('set successful');
            }
             j= 0;
        }
       
    }
}
let Paddle = new paddle(gameHeight,gameWidth);
let Ball = new ball(gameWidth,gameHeight);


let lastTime = 0;
function gameLoop(timeStamp){

let deltaTime = timeStamp - lastTime;
lastTime = timeStamp;

ctx.clearRect(0,0,800,400);
Paddle.update(deltaTime);
Paddle.draw(ctx);

Ball.update(Paddle);
Ball.draw(ctx);

requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);




class inputHandler{
    constructor(Paddle){
        document.addEventListener('keydown',(event)=>{
            switch(event.keyCode){
                case 37: 
                Paddle.moveLeft();
                break;

                case 39:
                Paddle.moveRight();
                break;
            }
        })
        document.addEventListener('keyup',()=>{
            Paddle.stop();
        })
    }
}
new inputHandler(Paddle);

