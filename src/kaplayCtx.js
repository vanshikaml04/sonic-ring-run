import kaplay from "kaplay";

export const k = kaplay({
    width : 1920,
    height:1080,
    letterbox:true,
    background:[0,0,0], // will change the color as r,g,b values
    global: false, // will stop the kaplay form going global
    touchToMouse:true, // will translate any touch inputs to click including the mobiles touch
    buttons:{
        jump:{
            keyboard:["space"],
            mouse:"left",
        },
    }, // create a multiple buttons allow to reuse when needed 
    debugKey:"d", // kaplay offer F1 to open debug page, but to specify we can use any key by choice
    debug:true, // by default debug is true which can allow multiple users to debug or even harm your game, so make it false when done uploading the game
});



export default k;