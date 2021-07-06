import React from "react";
import OriginalNavBarItem from "@theme-original/NavbarItem";
import { useLocation } from "@docusaurus/router";

export default function NavbarItem(props) {
  const { pathname } = useLocation();

  let versionDoc = pathname.split("/");
  let activeNav = null;

  if (versionDoc[2] === "V2" || versionDoc[2] === "2.0.0") {
    activeNav = "V2";
  } else if (versionDoc[2] === "V1" || versionDoc[2] === "1.0.0") {
    activeNav = "V1";
  } else {
    activeNav = "V3";
  }

  return (
    <>
      <OriginalNavBarItem
        {...props}
        className={props.className + " " + activeNav}
      />
    </>
  );
}
