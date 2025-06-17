// import kaplay context for game engine features
import k from "../kaplayCtx"

// create a function to make Sonic at given position
export function makeSonic(pos){
    
    // add Sonic sprite with animation, scaling, area and position
    const sonic = k.add([
        
        // load Sonic sprite with running animation
        k.sprite("sonic", { anim: "run" }),
        
        // enlarge sprite 4 times original size
        k.scale(4),
        
        // add invisible area for collisions and interaction
        k.area(),
        
        // set anchor point to center of sprite
        k.anchor("center"),
        
        // place Sonic at specified position
        k.pos(pos),
        k.body({jumpForce:1700}),
        //make sonic do somethig
        {
            ringCollectUI:null,
            setControls(){
                k.onButtonPress("jump",()=>{
                    if(this.isGrounded()){
                        this.play("jump");
                        this.jump();
                        k.play("jump",{volume:0.5});
                    }
                });
            },

            setEvents(){
                this.onGround(()=>{
                    this.play("run");
                    
                });
            },
        },

    ]);

    sonic.ringCollectUI = sonic.add([
        k.text("",{font:"mania",size:24}),
        k.color(255,255,0),
        k.anchor("center"),
        k.pos(30,-10),
    ])
    return sonic;
}
