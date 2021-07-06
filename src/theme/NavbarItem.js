import React from "react";
import OriginalNavBarItem from "@theme-original/NavbarItem";
import { useLocation } from "@docusaurus/router";

export default function NavbarItem(props) {
  const { docsPluginId, type } = props;
  const { pathname } = useLocation();

  if (
    type === "docsVersionDropdown" &&
    pathname.search(new RegExp(`^/${docsPluginId}/`, "g")) === -1
  ) {
    return null;
  }

  console.log(pathname);
  console.log(docsPluginId);

  return (
    <>
      <OriginalNavBarItem {...props} />
    </>
  );
}
