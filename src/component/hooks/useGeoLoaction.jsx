import { useState } from "react";

export default function useGeoLoaction(defaultPos = null) {
  const [loading, isLoading] = useState(false);
  const [postion, setPostiotion] = useState(defaultPos);
  const [error, setError] = useState(null);
  // console.log(postion);
  function getPostion() {
    if (!navigator.geolocation)
      return setError("Your browseer does not support geoloaction");

    isLoading(true);
    navigator.geolocation.getCurrentPosition(
      (e) => {
        setPostiotion({ lat: e.coords.latitude, lng: e.coords.longitude });
        isLoading(false);
      },
      (error) => {
        setError(error.message);
        isLoading(false);
      }
    );
  }
  return { loading, postion, setPostiotion, useGeoLoaction, getPostion };
}
