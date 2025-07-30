"use client";

import { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Button } from "./ui/button";
import { Camera, Video, X, Check } from "lucide-react";

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

export function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const webcamRef = useRef<Webcam>(null);

  const handleTakePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // Convert the base64 image to a File object
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          onCapture(new File([blob], "photo.jpg", { type: "image/jpeg" }));
        });
    }
  }, [webcamRef, onCapture]);
  
  // Note: Video recording with react-webcam is more complex and often
  // requires using the MediaRecorder API alongside it, just like our
  // previous custom component. For an MVP, we will focus on photo capture.

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-90">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full h-full object-contain"
        videoConstraints={{ facingMode: "user" }}
      />
      <div className="absolute bottom-4 flex items-center gap-x-4">
        <Button onClick={onClose} variant="destructive" size="icon" className="rounded-full h-12 w-12">
          <X />
        </Button>
        <Button onClick={handleTakePhoto} size="icon" className="rounded-full h-16 w-16">
          <Camera />
        </Button>
      </div>
    </div>
  );
}