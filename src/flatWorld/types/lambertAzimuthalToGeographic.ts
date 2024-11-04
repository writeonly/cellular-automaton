import { AzimuthalPoint } from './AzimuthalPoint';
import { Point } from './Point';

const RADIUS_EARTH = 353.55;

const degreesToRadians = (degrees: number): number => (degrees * Math.PI) / 180;
const radiansToDegrees = (radians: number): number => (radians * 180) / Math.PI;

export function lambertAzimuthalToGeographic(
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

// const center: Point = { lat: 0, lon: 0 };
// const azimuthalPoint: AzimuthalPoint = { x: 1000, y: 500 };
// const geographicPoint = lambertAzimuthalToGeographic(azimuthalPoint, center);
// console.log("Współrzędne geograficzne:", geographicPoint);
