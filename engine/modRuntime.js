import { log } from "../ui/console.js";

export function runMods(world){
    const mods = [];
    for(const name in world.files){
        if(name.startsWith("minecraft/mods/") && name.endsWith(".js")){
            world.files[name].async("string").then(code=>{
                mods.push(code);
            });
        }
    }

    window.JavaMods = {
        items:{},
        registerItem(item){
            this.items[item.id] = item;
            log("Item registered: "+item.id);
        }
    };

    setTimeout(()=>{ // allow async loading
        mods.forEach(code=>new Function("JavaMods", code)(window.JavaMods));
        log("Mods executed");
    },100);
}
