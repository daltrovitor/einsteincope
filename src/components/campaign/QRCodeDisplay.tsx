'use client';

import React, { useState, useEffect, forwardRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
}

/**
 * QRCodeDisplay component that handles SSR gracefully by only rendering
 * the QRCodeCanvas on the client.
 */
const QRCodeDisplay = forwardRef<HTMLDivElement, QRCodeDisplayProps>(
  ({ value, size = 256 }, ref) => {
    const [isClient, setIsClient] = useState(false);

    // Only render on the client to avoid "document is not defined" error from qrcode.react
    useEffect(() => {
      setIsClient(true);
    }, []);

    if (!value?.trim()) {
      return (
        <div ref={ref} className="p-4 bg-gray-100 text-gray-600 rounded-xl shadow-md text-center text-sm">
          Código PIX indisponível.
        </div>
      );
    }

    if (!isClient) {
      return (
        <div ref={ref} className="p-4 bg-white rounded-xl shadow-md flex items-center justify-center" style={{ width: size, height: size }}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    return (
      <div ref={ref} className="p-2 bg-white rounded-xl shadow-md inline-block">
        <QRCodeCanvas
          value={value}
          size={size}
          level="M"
          includeMargin={true}
          fgColor="#000000"
          bgColor="#ffffff"
        />
      </div>
    );
  }
);

QRCodeDisplay.displayName = 'QRCodeDisplay';

export default QRCodeDisplay;
