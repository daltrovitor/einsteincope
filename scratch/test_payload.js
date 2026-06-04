import { generatePixPayload } from './src/utils/pix.js';

const key = '62999216741';
const payload = generatePixPayload(key, 10.00, 'EINSTAO', 'BRASIL');
console.log('Payload:', payload);
