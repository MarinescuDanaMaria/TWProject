import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";

const QrCodeScanner = ({ onScanSuccess, onScanError }) => {
  const qrCodeRegionId = "qr-reader"; 
  const [scanning, setScanning] = useState(false);
  const html5QrCode = useRef(null);

  useEffect(() => {
    return () => {
      if (html5QrCode.current) {
        stopScanning();
      }
    };
  }, []);

  const startScanning = async () => {
    try {
      setScanning(true);
      html5QrCode.current = new Html5Qrcode(qrCodeRegionId);

      const cameras = await Html5Qrcode.getCameras();
      if (cameras && cameras.length > 0) {
        const cameraId = cameras[0].id; 
        html5QrCode.current
          .start(
            cameraId,
            {
              fps: 10,
              qrbox: { width: 250, height: 250 }, 
            },
            (decodedText) => {
              onScanSuccess(decodedText); 
              stopScanning(); 
            },
            (errorMessage) => {
              onScanError(errorMessage); 
            }
          )
          .catch((err) => {
            console.error("Eroare la pornirea scannerului:", err);
            setScanning(false);
          });
      } else {
        console.warn("Nu s-a găsit nicio cameră.");
        setScanning(false);
      }
    } catch (error) {
      console.error("Eroare la inițializarea camerei:", error);
      setScanning(false);
    }
  };

  const stopScanning = async () => {
    if (html5QrCode.current) {
      try {
        const state = html5QrCode.current.getState();
        if (state === Html5QrcodeScannerState.SCANNING) {
          await html5QrCode.current.stop();
          setScanning(false);
        } else {
          console.warn("Scannerul nu este în stare activă.");
        }
      } catch (error) {
        console.error("Eroare la oprirea scannerului:", error);
      }
    }
  };

  return (
    <div>
      <div id={qrCodeRegionId} style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}></div>
      {!scanning ? (
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
          onClick={startScanning}
        >
          Start Scanning
        </button>
      ) : (
        <button
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg"
          onClick={stopScanning}
        >
          Stop Scanning
        </button>
      )}
    </div>
  );
};

export default QrCodeScanner;
