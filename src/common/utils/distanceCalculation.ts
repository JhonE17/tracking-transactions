export const distanceCalculation = (
  latRider: number,
  lonRider: number,
  latDriver: number,
  lonDriver: number
) => {
  const earthRadius = 6371;
  const distanceLat = ((latRider - latDriver) * Math.PI) / 180;
  const distanceLon = ((lonRider - lonDriver) * Math.PI) / 180;
  const angularDistance =
    Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
    Math.cos((latRider * Math.PI) / 180) *
      Math.cos((latDriver * Math.PI) / 180) *
      Math.sin(distanceLon / 2) *
      Math.sin(distanceLon / 2);
  const subtendedCentralAngle =
    2 * Math.atan2(Math.sqrt(angularDistance), Math.sqrt(1 - angularDistance));
  const distance = earthRadius * subtendedCentralAngle;

  return distance;
};

export const calculateTime = (distance: number, averageSpeed = 60) => {
  const timeHuors = distance / averageSpeed;
  return timeHuors * 60;
};

export const calculateTotalAmount = (distance: number, timeInMinute:number): number=>{
  const ratePerKm = 1000;
  const ratePerMinute = 200;
  const rateBase = 3500;

  const totalAmount = rateBase + (ratePerKm * distance) + (ratePerMinute * timeInMinute);
  return Math.round(totalAmount)
}