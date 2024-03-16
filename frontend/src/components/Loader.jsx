import React from "react";
import { InfinitySpin } from "react-loader-spinner";

function Loader() {
  return (
    <div>
      <InfinitySpin
        visible={true}
        width="200"
        color="#000000"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
}

export default Loader;
