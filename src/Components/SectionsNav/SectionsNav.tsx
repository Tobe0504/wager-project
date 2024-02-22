import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import classes from "./SectionsNav.module.css";

type SectionsNavTypes = {
  navItems: {
    title: string;
    isActive: boolean;
    route?: string;
  }[];
  setNavItems: Dispatch<
    SetStateAction<
      {
        title: string;
        isActive: boolean;
        route?: string;
      }[]
    >
  >;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  isRouting?: boolean;
};

const SectionsNav = ({
  navItems,
  setNavItems,
  style,
  containerStyle,
  isRouting,
}: SectionsNavTypes) => {
  // ROuter

  const [, setSearchParams] = useSearchParams();
  const currentSearchParams = new URLSearchParams(window.location.search);
  const section = currentSearchParams.get("section");

  useEffect(() => {
    if (isRouting) {
      setNavItems(
        navItems.map((data) => {
          if (
            data?.title?.toLocaleLowerCase() ===
            section?.replaceAll("-", " ")?.toLocaleLowerCase()
          ) {
            return {
              ...data,
              isActive: true,
            };
          } else {
            return {
              ...data,
              isActive: false,
            };
          }
        })
      );

      if (!section) {
        currentSearchParams.set(
          "section",
          navItems[0].title?.replaceAll(" ", "-")?.toLowerCase()
        );
        setSearchParams(currentSearchParams.toString());
      }
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.listNav} style={containerStyle}>
        {navItems.map((data, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                if (isRouting) {
                  currentSearchParams.set(
                    "section",
                    data.title?.replaceAll(" ", "-").toLowerCase()
                  );
                  setSearchParams(currentSearchParams.toString());
                }
              }}
              className={
                data.title.toLowerCase() ===
                section?.replaceAll("-", " ")?.toLowerCase()
                  ? `${classes.activeDiv}`
                  : `${classes.div}`
              }
              style={style}
            >
              <span>{data.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionsNav;
