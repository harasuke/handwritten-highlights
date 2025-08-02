import React, { useMemo } from "react";

export default function useHighlightUnderlineVariant(variant: "1" | "2" | "3" | "random") {
  const resolvedVariant = useMemo(() => {
    return variant === "random"
      ? ((Math.floor(Math.random() * 3) + 1).toString() as "1" | "2" | "3")
      : variant;
  }, [variant]);

  const variantPath = useMemo(() => {
    switch (resolvedVariant) {
      case "1":
        return variantPath1;
      case "2":
        return variantPath2;
      // case "3":
      //   return Variant3;
      default:
        return variantPath1;
    }
  }, [resolvedVariant]);

  return { variantPath };
}

const variantPath1 = (line: DOMRect): string => {
  return `M0 ${line.height - 1}Q1.966 ${line.height + 1} 8.533 ${line.height - 1} T${
    line.width / 3 - 1
  } ${line.height - 1.2} ${line.width / 2 + 10} ${line.height - 1} ${
    line.width - line.width / 5
  } ${line.height - 2} ${line.width - 5} ${line.height} ${line.width} ${line.height + 2}`;
};

const variantPath2 = (line: DOMRect): string => {
  // M-.2 18.025 54.981 11.283 98.932 12.942 5.032 14.783 21.862 13.302 106.411 15.456
  return `M0 ${line.height + 4} ${line.width / 2} ${line.height} ${line.width + 4} ${
    line.height - 0.65
  } ${line.width / 9} ${line.height + 1} ${line.width / 6} ${line.height + 2} ${
    line.width + 5
  } ${line.height + 3}`;
};
