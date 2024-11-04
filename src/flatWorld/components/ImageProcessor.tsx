import React, { useState, useRef } from 'react';

import { AzimuthalPoint } from '../types/AzimuthalPoint';
import { Point } from '../types/Point';

const RADIUS_EARTH = 353.55;

const degreesToRadians = (degrees: number): number => (degrees * Math.PI) / 180;
const radiansToDegrees = (radians: number): number => (radians * 180) / Math.PI;

function lambertAzimuthalToGeographic(
  point: AzimuthalPoint,
  center: Point,
  radius: number = RADIUS_EARTH
): Point {
  const φ1 = degreesToRadians(center.lat);
  const λ1 = degreesToRadians(center.lon);

  const rho = Math.sqrt(point.x ** 2 + point.y ** 2) / radius;
  const c = 2 * Math.asin(rho / 2);

  if (rho === 0) return { lat: center.lat, lon: center.lon };

  const φ2 = Math.asin(
    Math.cos(c) * Math.sin(φ1) + (point.y * Math.sin(c) * Math.cos(φ1)) / rho
  );

  const λ2 =
    λ1 +
    Math.atan2(point.x * Math.sin(c), rho * Math.cos(c) * Math.cos(φ1) - point.y * Math.sin(c) * Math.sin(φ1));

  return {
    lat: radiansToDegrees(φ2),
    lon: radiansToDegrees(λ2)
  };
}

const SIZE = 1000;
const HALF_SIZE = SIZE / 2;

const ImageProcessor: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const sourceCanvasRef = useRef<HTMLCanvasElement>(null);
  const targetCanvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageSrc(imageURL);
      drawImageOnCanvas(imageURL);
    }
  };

  const drawImageOnCanvas = (src: string) => {
    const canvas = sourceCanvasRef.current;
    if (canvas) {
      const sourceContext = canvas.getContext('2d');
      const image = new Image();
      image.src = src;

      image.onload = () => {

        canvas.width = image.width;
        canvas.height = image.height;

        if (sourceContext) {
          sourceContext.clearRect(0, 0, canvas.width, canvas.height);
          sourceContext.drawImage(image, 0, 0, canvas.width, canvas.height);
          const targetCanvas = targetCanvasRef.current;
          if (targetCanvas) {
            targetCanvas.width = SIZE;
            targetCanvas.height = SIZE;
            const targetContext = targetCanvas.getContext('2d');
            if (targetContext) {
              targetContext.clearRect(0, 0, canvas.width, canvas.height);
              for (let i = -HALF_SIZE; i < HALF_SIZE; i++) {
                for (let j = -HALF_SIZE; j < HALF_SIZE; j++) {
                  const p = lambertAzimuthalToGeographic({ x: i, y: j}, { lat: 0, lon: 0 }, SIZE * 2)
                  if (!isNaN(p.lat) && !isNaN(p.lon)) {
                    const targetX = HALF_SIZE + i;
                    const targetY = HALF_SIZE + j;
                    const x = Math.round((p.lat + 90) / 180 * image.width);
                    const y = Math.round((p.lon + 180) / 360 * image.height);
                    const imageData = sourceContext.getImageData(x, y, 1, 1);
                    const targetImageData = targetContext.getImageData(targetX, targetY, 1, 1);
                    targetImageData.data[0] = imageData.data[0];
                    targetImageData.data[1] = imageData.data[1];
                    targetImageData.data[2] = imageData.data[2];
                    targetImageData.data[3] = imageData.data[3];
                    console.log(`${p.lat} ${p.lon}, ${x} ${y}, ${targetX} ${targetY}`);
                    targetContext.putImageData(targetImageData, targetX, targetY);
                  }
                }
              }
            }
          }
        }
      };
    }
  };

  const applyEffects = (sourceContext: CanvasRenderingContext2D, width: number, height: number) => {
    const imageData = sourceContext.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }

    sourceContext.putImageData(imageData, 0, 0);
  };

  return (
    <div>
     <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'block', marginBottom: '10px' }} />
     {imageSrc && <img src={imageSrc} alt="Uploaded" style={{ display: 'none' }} />}
      <canvas ref={sourceCanvasRef}></canvas>
      <canvas ref={targetCanvasRef}></canvas>
    </div>
  );
};

export default ImageProcessor;
