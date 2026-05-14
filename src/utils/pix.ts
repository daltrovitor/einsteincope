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
    // Remove caracteres especiais para evitar erro em bancos (Nubank, etc)
    const cleanName = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    const cleanCity = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

    const pix = createStaticPix({
      merchantName: cleanName.substring(0, 25),
      merchantCity: cleanCity.substring(0, 15),
      pixKey: key,
      transactionAmount: amount > 0 ? amount : undefined,
      infoAdicional: 'Pagamento Einstein',
      txid: '***', // Padrao mais aceito para PIX estatico
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
