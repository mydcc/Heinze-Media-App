import fs from 'fs';
import path from 'path';

export async function load() {
    const filePath = path.join(process.cwd(), 'CORPORATE_DESIGN.md');

    if (!fs.existsSync(filePath)) {
        throw new Error('CORPORATE_DESIGN.md not found');
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    return {
        content,
        meta: {
            title: 'Corporate Design | HEINZE MEDIA',
            description: 'Visuelle Identität und Design-Standards'
        }
    };
}
