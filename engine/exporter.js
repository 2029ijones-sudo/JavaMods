import { log } from "../ui/console.js";

export async function exportWorld(world){
    if(!world || !world.zip) { log("No world to export"); return; }

    const blob = await world.zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "JavaModsWorld.mcworld";
    a.click();

    log("World exported successfully!");
}
