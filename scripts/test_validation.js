
import { validateContent } from './src/lib/server/validator.js';

async function runTest() {
    console.log("--- Starting Internal Validation Test ---");
    try {
        const report = validateContent();
        if (report.length === 0) {
            console.log("✅ SUCCESS: No validation errors found!");
        } else {
            console.warn(`⚠️ FOUND ${report.length} ISSUES:`);
            report.forEach(line => console.warn(`  - ${line}`));
        }
    } catch (e) {
        console.error("❌ CRITICAL ERROR DURING VALIDATION:", e);
    }
}

runTest();
