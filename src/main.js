import {k} from "./kaplayCtx"
import game from "./scenes/game";
import gameover from "./scenes/gameover"
import mainMenu from "./scenes/mainMenu"


k.loadSprite("chemical-bg","graphics/chemical-bg.png");
k.loadSprite("platforms" , "graphics/platforms.png");

k.loadSprite("sonic","graphics/sonic.png",{
    sliceX:8, // no. of frames per row
    sliceY:2, // no. of fra,es per columns // kaplay will split the imgaes ino frames
    anims:{
        run:{from:0, to:7, loop:true,speed:30},
        jump:{from:8,to:15,loop:true,speed:100},
    }
});

k.loadSprite("motobug","graphics/motobug.png",{
    sliceX:5,
    sliceY:1,
    anims:{
        run:{from:0,to:4,loop:true,speed:8},
    }
})

k.loadSprite("ring","graphics/ring.png",{
    sliceX:16,
    sliceY:1,
    anims:{
        spin:{from:0,to:15,loop:true,speed:30},
    }
})

k.loadFont("mania","fonts/mania.ttf");
k.loadSound("destroy","sounds/Destroy.wav");
k.loadSound("hurt","sounds/Hurt.wav");
k.loadSound("hyperRing","sounds/HyperRing.wav");
k.loadSound("jump","sounds/Jump.wav");
k.loadSound("ring","sounds/Ring.wav");
k.loadSound("city","sounds/city.mp3");


k.scene("main-menu",mainMenu); // first page of the game

k.scene("game",game); //game page

k.scene("gameover",gameover);

k.go("main-menu");

