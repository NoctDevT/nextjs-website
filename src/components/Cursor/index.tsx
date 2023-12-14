import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const Cursor = () => {
  const { theme } = useTheme();
  const smallCursor = useRef<HTMLDivElement>(null);
  const [winDimensions, setWinDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {


    document.body.style.cursor = 'none';


    const handleMouseMove = (e: MouseEvent) => {
      const { pageX: x, pageY: y } = e;
      positionDot(x, y);
    };

    const handleMouseEnterLeave = (e: MouseEvent) => {
      const entering = e.type === "mouseenter";
      toggleCursorVisibility(entering);
    };

    const handleMouseDownUp = (e: MouseEvent) => {
      const pressing = e.type === "mousedown";
      toggleCursorSize(pressing);
    };

    const handleResize = () => {
      setWinDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const handleLinks = () => {
      const links = document.querySelectorAll("a");
      links.forEach((el) => {
        el.addEventListener("mouseover", () => toggleCursorSize(true, true));
        el.addEventListener("mouseout", () => toggleCursorSize(false, true));
      });
    };

    handleLinks();
    toggleCursorVisibility(false);
    toggleCursorSize(false);
    updateCursorColor();

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnterLeave);
    document.addEventListener("mouseleave", handleMouseEnterLeave);
    document.addEventListener("mousedown", handleMouseDownUp);
    document.addEventListener("mouseup", handleMouseDownUp);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnterLeave);
      document.removeEventListener("mouseleave", handleMouseEnterLeave);
      document.removeEventListener("mousedown", handleMouseDownUp);
      document.removeEventListener("mouseup", handleMouseDownUp);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  const updateCursorColor = () => {
    if (smallCursor.current) {
      smallCursor.current.style.backgroundColor = theme === "dark" ? "white" : "black";
    }
  };

  const toggleCursorVisibility = (visible: boolean) => {
    smallCursor.current?.style.setProperty("opacity", visible ? "1" : "1");
  };

  const toggleCursorSize = (enlarged: boolean, isLink = false) => {
    const scale = enlarged ? (theme === "dark" ? "scale(1.1)" : "scale(4.4)") : "scale(1)";
    smallCursor.current?.style.setProperty("transform", `translate(-50%, -50%) ${scale}`);
  
    if (isLink && smallCursor.current) {
      if (enlarged) {
        smallCursor.current.style.border = theme === "dark" ? "0px solid black" : "0.25px solid black";
        smallCursor.current.style.height = theme === "dark" ? "50px" : "14px";
        smallCursor.current.style.width =  theme === "dark" ? "50px" : "14px";
        smallCursor.current.style.backgroundColor = theme === "dark" ? "white" : "transparent";
      } else {
        smallCursor.current.style.border = "0px solid black";
        smallCursor.current.style.height = "11px";
        smallCursor.current.style.width = "11px";
        updateCursorColor();
      }
    }
  };

  const positionDot = (x: number, y: number) => {
    smallCursor.current?.style.setProperty("top", `${y}px`);
    smallCursor.current?.style.setProperty("left", `${x}px`);
  };

  return <div ref={smallCursor} className="cursor" />;
};

export default Cursor;
