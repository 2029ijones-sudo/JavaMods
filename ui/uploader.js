import { log } from "./console.js";

export function createUploaders(container, callbacks) {
    // World uploader
    const worldInput = document.createElement("input");
    worldInput.type = "file";
    worldInput.accept = ".mcworld,.zip";
    worldInput.addEventListener("change", async e => {
        if (e.target.files.length === 0) return;
        await callbacks.onWorldUpload(e.target.files[0]); // wait until upload finishes
        modInput.disabled = false; // enable mod upload after world is ready
        log("World uploaded");
    });

    container.appendChild(document.createTextNode("Upload World: "));
    container.appendChild(worldInput);
    container.appendChild(document.createElement("br"));

    // Mod uploader
    const modInput = document.createElement("input");
    modInput.type = "file";
    modInput.accept = ".zip,.js";
    modInput.disabled = true; // disabled until world is uploaded
    modInput.addEventListener("change", async e => {
        if (e.target.files.length === 0) return;
        await callbacks.onModUpload(e.target.files[0]); // wait until upload finishes
        log("Mod uploaded");
    });

    container.appendChild(document.createTextNode("Upload Mod: "));
    container.appendChild(modInput);
    container.appendChild(document.createElement("br"));

    log("Uploader initialized");
}
