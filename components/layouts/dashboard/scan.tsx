"use client";

import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";

export function ScanModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;


    const timer = setTimeout(() => {
      if (scannerRef.current) return;

      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        false,
      );

      scannerRef.current.render(
        (decodedText) => {
          setScanResult(decodedText);
          scannerRef.current?.clear();
          scannerRef.current = null;
        },
        () => {},
      );
    }, 300);

    return () => {
      clearTimeout(timer);
      scannerRef.current?.clear().catch(() => {});
      scannerRef.current = null;
    };
  }, [open]);

  const resetScan = () => {
    setScanResult(null);

    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false,
    );

    scannerRef.current.render(
      (decodedText) => {
        setScanResult(decodedText);
        scannerRef.current?.clear();
        scannerRef.current = null;
      },
      () => {},
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 bg-black border-none">
        <div className="relative w-full h-[520px] flex flex-col items-center justify-between py-6">
          {/* Top Bar */}
          <div className="w-full px-4 flex items-center justify-start"></div>

          {/* Scanner Area */}
          <div className="relative flex flex-col items-center">
            {/* Scanner Frame */}
            <div className="relative w-[260px] h-[260px]">
              {/* Camera */}
              <div
                id="reader"
                className="w-full h-full border-0 outline-none rounded-xl overflow-hidden"
              />

              {/* Overlay corners */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-green-400 rounded-tl-xl" />

                <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-green-400 rounded-tr-xl" />

                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-green-400 rounded-bl-xl" />

                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-green-400 rounded-br-xl" />
              </div>
            </div>

            <div className="mt-6 text-green-400 text-2xl">
              <QrCode />
            </div>

            <h2 className="text-white text-lg font-semibold mt-2">
              Scan TapPay QR Code
            </h2>

            <p className="text-white/50 text-sm text-center px-6 mt-1">
              Align the QR code within the frame to send money instantly
            </p>
          </div>

          <div className="w-full px-6">
            <Button className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-xl">
              Simulate Successful Scan
            </Button>
          </div>
        </div>

        {scanResult && (
          <div className="px-6 pb-6 space-y-3">
            <p className="text-xs text-green-400 break-all">{scanResult}</p>

            <Button className="w-full">Confirm Payment</Button>

            <Button variant="outline" className="w-full" onClick={resetScan}>
              Scan Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
