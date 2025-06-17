import { makeSonic  } from "../entities/sonic";
import k from "../kaplayCtx";
import {makeMotobug} from "../entities/motobug";
import {makeRing} from "../entities/rings"

export default function game() {
    const citySfx = k.play("city",{volume:0.4,loop:true})
    k.setGravity(3100); //to jump

    const bgPieceWidth = 1920;
        const bgPieces=[
            k.add([
                k.sprite("chemical-bg"), // will create  a game object
                k.pos(0,0),
                k.scale(2),
                k.opacity(0.8),
                k.area(),            
            ]),
            k.add([
                k.sprite("chemical-bg"), // will create  a game object
                k.pos(bgPieceWidth*2,0),
                k.scale(2),
                k.opacity(0.8),            
                k.area(),
            ]),
        ];
        const platformWidth = 1280;
        const platforms = [
                k.add([
                    k.sprite("platforms"),
                    k.pos(0,450),
                    k.scale(4),
                    k.opacity(0.8),
                ]),
                k.add([
                    k.sprite("platforms"),
                    k.pos(platformWidth*4,0),
                    k.scale(4),
                    k.opacity(0.8)
                ]),
            ];

          

            //add sonic player
            const sonic = makeSonic(k.vec2(200,745))
            sonic.setControls();
            sonic.setEvents();

           
            let score = 0;
          let scoreMultiplier = 0;
         const scoreText = k.add([
            k.text("SCORE : 0",{font : "mania",size:96}),
            k.pos(20,20),
        ]);
            sonic.onCollide("ring",(ring)=>{
                k.play("ring",{volume:0.5});
                k.destroy(ring);
                score++;
                scoreText.text = `SCORE: ${score}`;
                sonic.ringCollectUI.text = "+1";
                k.wait(1,()=>{
                    sonic.ringCollectUI.text="";
                });  
                              
            });
           

            sonic.onCollide("enemy",(enemy)=>{
                if(!sonic.isGrounded()){
                    k.play("destroy",{volume:0.5});
                    k.play("hyperRing",{volume:0.5});
                    k.destroy(enemy);
                    sonic.play("jump");
                    sonic.jump();

                    //todo
                    scoreMultiplier+=1;
                    score+=10*scoreMultiplier;
                    scoreText.text = `SCORE: ${score}`;
                    if(scoreMultiplier===1) sonic.ringCollectUI.text=`+10`;
                    if(scoreMultiplier>1) sonic.ringCollectUI.text = `x${scoreMultiplier}`
                    k.wait(1,()=>{
                        sonic.ringCollectUI.text=""
                    })
                    return;
                }
                k.play("hurt",{volume:0.5});
                k.setData("current-score",score);
                k.go("gameover", citySfx);

            });
            


            //increase the speed of game after 1 sec
            let gameSpeed = 300;
            k.loop(1,()=>{
                gameSpeed +=50;
            });


             // respond to motobugs
             const spawnMotoBug = () =>{
                const motobug = makeMotobug(k.vec2(1950,773));
                motobug.onUpdate(()=>{
                    if(gameSpeed<3000){
                        motobug.move((-gameSpeed+100),0);
                        return;
                    }
                    motobug.move(-gameSpeed,0);
                });

                motobug.onExitScreen(()=>{
                    if(motobug.pos.x<0){
                        k.destroy(motobug);
                    }
                });
                const waitTime = k.rand(0.5,2.5);
                k.wait(waitTime,spawnMotoBug);
            }
            spawnMotoBug();

            //respond  to rings add points
            const spawnRing = () =>{
                const ring = makeRing(k.vec2(1950,745));
                ring.onUpdate(()=>{
                    ring.move(-gameSpeed-20,0);
                });
                ring.onExitScreen(()=>{
                    if(ring.pos.x<0) k.destroy(ring);
                });
                const waitTime = k.rand(0.5,3);
                k.wait(waitTime,spawnRing);
            };
            spawnRing();

            // actual rectangle that will act as a platform for sonic
            k.add([
                k.rect(1920,3000),
                k.opacity(0) , // to make invisible
                k.area(),
                k.pos(0,832),
                k.body({isStatic:true}), // to remain fixed

            ]);



            // update  the pralaas image as per the gamespeed
            k.onUpdate(()=>{

                if(sonic.isGrounded()) scoreMultiplier=0;
                    if(bgPieces[1].pos.x<0){
                        bgPieces[0].moveTo(bgPieces[1].pos.x+bgPieceWidth*2,0);
                        bgPieces.push(bgPieces.shift());
                        bgPieces[0].moveTo(bgPieces[0].pos.x, -sonic.pos.y / 10 - 50);
    bgPieces[1].moveTo(bgPieces[1].pos.x, -sonic.pos.y / 10 - 50);
                    }
            
                    bgPieces[0].move(-100,0)
                    bgPieces[1].moveTo(bgPieces[0].pos.x+bgPieceWidth*2,0);
            
            
                    if(platforms[1].pos.x<0){
                        platforms[0].moveTo(platforms[1].pos.x+platforms[1].width*4,450);
                        platforms.push(platforms.shift());
                    }
            
                    platforms[0].move(-gameSpeed,0);
                    platforms[1].moveTo(platforms[0].pos.x+platforms[1].width*4,450);
            
            });
        

}