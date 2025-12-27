import { unzip } from "./zipUtils.js";

export async function loadWorld(file){
    const zip = await unzip(file);
    return { zip, files: zip.files };
}
