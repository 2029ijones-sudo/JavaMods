import { log } from "./console.js";

export function createModeSelector(container, onChange){
    const worldBtn = document.createElement("button");
    worldBtn.textContent="World Mode";
    worldBtn.onclick = ()=>onChange("world");

    const testBtn = document.createElement("button");
    testBtn.textContent="Testing Environment";
    testBtn.onclick = ()=>onChange("test");

    container.appendChild(worldBtn);
    container.appendChild(testBtn);

    log("Mode selector initialized");
}
