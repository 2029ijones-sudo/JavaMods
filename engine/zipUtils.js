import JSZip from "https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm";

export async function unzip(file){
    return await JSZip.loadAsync(file);
}

export async function zip(folder){
    return await folder.generateAsync({type:"blob"});
}
