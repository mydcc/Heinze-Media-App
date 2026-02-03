import fs from 'fs';
import { glob } from 'glob';

// Simple DeepL Translator using fetch
async function translateText(text, targetLang) {
    if (!process.env.DEEPL_API_KEY) {
        console.warn('Skipping translation: DEEPL_API_KEY not set.');
        return text;
    }

    const url = 'https://api-free.deepl.com/v2/translate';
    const apiUrl = process.env.DEEPL_API_KEY.endsWith(':fx')
        ? 'https://api-free.deepl.com/v2/translate'
        : 'https://api.deepl.com/v2/translate';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: [text],
                target_lang: targetLang.toUpperCase(),
            }),
        });

        if (!response.ok) {
            throw new Error(`DeepL API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.translations[0].text;
    } catch (e) {
        console.error('Translation failed:', e);
        return text;
    }
}

function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
    if (!match) return { data: {}, body: content, rawData: '' };
    const rawData = match[1];
    const body = match[2];

    // Simple YAML parser for title
    const data = {};
    const titleMatch = rawData.match(/^title:\s*"(.+)"/m);
    if (titleMatch) data.title = titleMatch[1];

    return { data, body, rawData };
}

async function main() {
    const files = await glob('src/content/**/*.md');

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf8');
        const { data, body, rawData } = parseFrontmatter(content);

        if (data.title && (data.title.includes('[EN Copy]') || data.title.includes('[DE Copy]'))) {
             console.log(`Translating file: ${file}`);

             const isDe = file.includes('/de/');
             const targetLang = isDe ? 'de' : 'en';

             const cleanTitle = data.title.replace(/\[(EN|DE) Copy\]\s*/, '');

             // Translate Title
             let translatedTitle = cleanTitle;
             if (process.env.DEEPL_API_KEY) {
                 translatedTitle = await translateText(cleanTitle, targetLang);
             }

             // Translate Body
             let translatedBody = body;
             if (process.env.DEEPL_API_KEY) {
                 translatedBody = await translateText(body, targetLang);
             } else {
                 // If no key, just remove the marker from title to "approve" the file as manual draft?
                 // Or keep marker? User asked for a script to use DeepL.
                 // If no key, we probably shouldn't modify the file other than maybe logging.
                 console.log(`No API Key. Skipping translation for ${file}.`);
                 continue;
             }

             // Reconstruct
             const newRawData = rawData.replace(/^title:\s*".+"/m, `title: "${translatedTitle}"`);
             const newContent = `---\n${newRawData}\n---\n${translatedBody}`;

             fs.writeFileSync(file, newContent);
             console.log(`Updated ${file}`);
        }
    }
}

main();
