import { useSearchParams } from "react-router-dom";

export function UsePosition() {
  const [data] = useSearchParams();
  const lat = data.get("lat");
  const lng = data.get("lng");
  return [lat, lng];
}
