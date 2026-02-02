
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { globSync } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MODELS_DIR = path.join(__dirname, '../static/models');

console.log('--- Starting Draco Compression Pipeline ---');

if (!fs.existsSync(MODELS_DIR)) {
    console.log('No models directory found at static/models. Skipping.');
    process.exit(0);
}

// Find all .glb files
const files = globSync(`${MODELS_DIR}/**/*.glb`);

files.forEach(file => {
    if (file.includes('.draco.glb')) return; // Skip already compressed files

    const dracoFile = file.replace('.glb', '.draco.glb');

    // Check if draco version already exists and is newer
    if (fs.existsSync(dracoFile)) {
        const statOrig = fs.statSync(file);
        const statDraco = fs.statSync(dracoFile);
        if (statDraco.mtime > statOrig.mtime) {
            console.log(`[SKIP] ${path.basename(file)} (Draco version is up to date)`);
            return;
        }
    }

    console.log(`[COMPRESS] Processing ${path.basename(file)}...`);

    try {
        // Use npx to run gltf-pipeline without adding it as a permanent dependency
        // -d: draco, -b: binary (glb)
        execSync(`npx -y gltf-pipeline -i "${file}" -o "${dracoFile}" -d -b`, { stdio: 'inherit' });
        console.log(`[SUCCESS] Created ${path.basename(dracoFile)}`);
    } catch (e) {
        console.error(`[ERROR] Failed to compress ${path.basename(file)}`);
        // We do not fail the build here, just log error
    }
});

console.log('--- Pipeline Complete ---');
