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
          sourceContext.drawImage(image, 0, 0, canvas.width, canvas.height);
          const targetCanvas = targetCanvasRef.current;
          if (targetCanvas) {
            targetCanvas.width = SIZE;
            targetCanvas.height = SIZE;
            const targetContext = targetCanvas.getContext('2d');
            if (targetContext) {
              const targetImageData = targetContext.createImageData(SIZE, SIZE);

              for (let i = -HALF_SIZE; i < HALF_SIZE; i++) {
                for (let j = -HALF_SIZE; j < HALF_SIZE; j++) {
                  const p = lambertAzimuthalToGeographic({ x: i, y: j}, { lat: 0, lon: 0 }, SIZE);

                  if (!isNaN(p.lat) && !isNaN(p.lon)) {
                    const x = Math.round((p.lon + 180) / 360 * image.width);
                    const y = Math.round((p.lat + 90) / 180 * image.height);

                    if (0 <= x && x < image.width && 0 <= y && y < image.height) {
                      const sourcePixel = sourceContext.getImageData(x, y, 1, 1).data;
                      const targetX = i + HALF_SIZE;
                      const targetY = j + HALF_SIZE;
                      const index = (targetY * SIZE + targetX) * 4;

                      targetImageData.data[index] = sourcePixel[0];
                      targetImageData.data[index + 1] = sourcePixel[1];
                      targetImageData.data[index + 2] = sourcePixel[2];
                      targetImageData.data[index + 3] = sourcePixel[3];
                    }
                  }
                }
              }
              targetContext.putImageData(targetImageData, 0, 0);
            }
          }
        }
      };
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'block', marginBottom: '10px' }} />
      {imageSrc && <img src={imageSrc} alt="Uploaded" style={{ display: 'none' }} />}
      <canvas ref={sourceCanvasRef} style={{ display: 'none' }}></canvas>
      <canvas ref={targetCanvasRef}></canvas>
    </div>
  );
};

export default ImageProcessor;
