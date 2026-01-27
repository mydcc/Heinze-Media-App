import * as fs from 'fs';
import * as path from 'path';

export async function load() {
    try {
        const filePath = path.join(process.cwd(), "CORPORATE_DESIGN.md");
        const content = fs.readFileSync(filePath, "utf-8");
        return {
            content
        };
    } catch (err) {
        console.error("Failed to load CORPORATE_DESIGN.md:", err);
        return {
            content: "# Error\nFailed to load Corporate Design content."
        };
    }
}
