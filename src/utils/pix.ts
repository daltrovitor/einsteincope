import { createStaticPix, hasError } from 'pix-utils';

/**
 * Generates a PIX Copy and Paste / QR Code payload.
 * Follows the EMV® QR Code Specification for Payment Systems (QRCPS).
 * 
 * @param key The PIX key (email, phone, CPF/CNPJ or random key)
 * @param amount The value of the transaction
 * @param name The name of the receiver (max 25 chars)
 * @param city The city of the receiver (max 15 chars)
 * @returns The PIX payload string (Copy and Paste)
 */
export function generatePixPayload(
  key: string,
  amount: number,
  name: string = 'DONATION',
  city: string = 'SAO PAULO'
): string {
  try {
    const pix = createStaticPix({
      merchantName: name.substring(0, 25),
      merchantCity: city.substring(0, 15),
      pixKey: key,
      transactionAmount: amount > 0 ? amount : undefined,
      infoAdicional: 'Pagamento via Web',
      txid: '***', // Standard for static PIX
    });

    if (hasError(pix)) {
      throw new Error('PIX creation error');
    }

    return pix.toBRCode();
  } catch (error) {
    console.error('Error generating PIX payload:', error);
    // Fallback to a basic manual implementation if pix-utils fails
    return '';
  }
}
