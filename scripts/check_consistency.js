import fs from "fs";
import path from "path";

const contentDir = "src/content";
const types = ["blog", "pages", "work"];

function getFiles(lang, type) {
    const dir = path.join(contentDir, lang, type);
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter(f => f.endsWith(".md")).sort();
}

console.log("Consistency Check: DE vs EN");

types.forEach(type => {
    const deFiles = getFiles("de", type);
    const enFiles = getFiles("en", type);

    console.log("\nCategory: " + type);
    
    const allFiles = Array.from(new Set([...deFiles, ...enFiles])).sort();
    
    allFiles.forEach(file => {
        const hasDe = deFiles.includes(file);
        const hasEn = enFiles.includes(file);
        let status = "[OK]";
        
        if (!hasDe) status = "[MISSING DE]";
        if (!hasEn) status = "[MISSING EN]";

        console.log("- " + file + " " + status);
    });
});