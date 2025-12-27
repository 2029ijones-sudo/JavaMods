import { runMods } from "./modRuntime.js";

export async function loadMods(file){
    const JSZip = (await import("https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm")).default;
    const zip = await JSZip.loadAsync(file);

    const mods = [];
    const textures = [];

    for(const name in zip.files){
        if(name.startsWith("minecraft/mods/") && name.endsWith(".js")){
            const code = await zip.file(name).async("string");
            mods.push(code);
        }
        if(name.startsWith("minecraft/textures/") && name.endsWith(".png")){
            textures.push(name);
        }
    }
    return { mods, textures };
}

export function injectMods(world){
    // inject runtime placeholder
    world.zip.file("javamods/runtime.js", "console.log('JavaMods runtime loaded');");
    runMods(world);
}
