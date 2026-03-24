import './polyfills.mjs';
import fs from 'fs';
import { PDFParse } from 'pdf-parse';

async function run() {
    try {
        const dataBuffer = fs.readFileSync('src/templates/CV.pdf');
        const parser = new PDFParse({ data: dataBuffer });
        const result = await parser.getText();
        fs.writeFileSync('cv_text.txt', result.text);
        console.log('Successfully extracted text to cv_text.txt');
    } catch (e) {
        console.error('Error:', e);
    }
}

run();
