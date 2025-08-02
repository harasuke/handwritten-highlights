import React, { useMemo } from "react";

export default function useHighlightMarkerVariant(variant: "1" | "2" | "3" | "random") {
  const resolvedVariant = useMemo(() => {
    return variant === "random"
      ? ((Math.floor(Math.random() * 3) + 1).toString() as "1" | "2" | "3")
      : variant;
  }, [variant]);

  const variantComponent = useMemo(() => {
    switch (resolvedVariant) {
      case "1":
        return Variant1;
      case "2":
        return Variant2;
      case "3":
        return Variant3;
      default:
        return null;
    }
  }, [resolvedVariant]);

  return { variantComponent };
}

const Variant1 = (
  <defs>
    <filter id="highlightFilter" x="0" y="0" width="100%" height="100%">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.02"
        numOctaves="2"
        result="noise"
        seed="1"
      />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" />
    </filter>
  </defs>
);

const Variant2 = (
  <defs>
    <filter id="highlightFilter" x="0" y="0" width="100%" height="100%">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.1 0.05"
        numOctaves="5"
        result="noise"
        seed="2"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale="10"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </defs>
);

const Variant3 = (
  <defs>
    <filter id="highlightFilter" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.01 0.05"
        numOctaves="1"
        result="turbulence"
      />
      <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="3" />
    </filter>

    <clipPath id="highlightShape">
      <path d="M0,14 C10,5 40,5 60,8 C75,10 90,5 100,6 L100,20 L0,20 Z" />
    </clipPath>
  </defs>
);
