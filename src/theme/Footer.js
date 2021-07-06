import OriginalFooter from "@theme-original/Footer";
import React from "react";

export default function Footer(props) {
  return (
    <>
      <div>Before footer</div>
      <OriginalFooter {...props} />
      <div>after footer</div>
    </>
  );
}
