import { generatePixPayload } from './src/utils/pix.js';

const key = '7c653110-0380-458c-ba23-fd3e291e6104';
const payload = generatePixPayload(key, 10.00, 'EINSTAO', 'BRASIL');
console.log('Payload:', payload);
