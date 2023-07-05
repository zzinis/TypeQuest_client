// import { useState } from "react";
// import mbti from "../common/api/resultApi.json";
import { useLocation } from "react-router-dom";

function TravelResult() {
  const location = useLocation();
  const mbti = location.state.id;
  return (
    <>
      <div>안녕</div>
    </>
  );
}

export default TravelResult;
