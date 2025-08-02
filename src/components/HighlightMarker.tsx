import React, { useContext, useEffect, useId, useRef, useState } from "react";
import { AnimationSpline, CSSColor } from "../index";
import useHighlightMarkerVariant from "../hooks/useHighlightMarkerVariation";
import { HighlightContext } from "../providers/HighlightProvider";

interface HighlightMarkerProps {
  children: React.ReactNode;
  highlightVariant?: "1" | "2" | "3" | "random";
  highlightColor?: CSSColor;
  animationOffset?: number;
  animationDirection?: "left" | "right" | "center";
  animationDuration?: number;
  animationEffect?: keyof typeof AnimationSpline;
}

export const HighlightMarker = ({
  children,
  highlightVariant = "2",
  highlightColor = "hsla(120, 60%, 50%, 0.3)",
  animationDirection = "left",
  animationDuration = 400,
  animationOffset = 0,
  animationEffect = "none",
}: HighlightMarkerProps) => {
  const ctx = useContext(HighlightContext);
  const id = useId();
  const randomClass = `highlight-${id.replace(/:/g, "-")}`;

  const { variantComponent } = useHighlightMarkerVariant(highlightVariant);

  const textRef = useRef<HTMLSpanElement>(null);

  const [linesOfText, setLinesOfText] = useState<DOMRect[]>();

  useEffect(() => {
    if (!ctx) return;

    const onResize = () => {
      if (!textRef.current) return;
      const _lines = Array.from(textRef.current.getClientRects());
      setLinesOfText(_lines);
    };

    onResize();
    const unregister = ctx.registerCallback(onResize);
    return () => {
      unregister();
    };
  }, [ctx]);

  return (
    <span ref={textRef} className={randomClass} style={{ position: "relative" }}>
      {children}
      {linesOfText?.map((line, index) => (
        <svg
          key={index}
          viewBox={`0 0 100 ${line.height}`}
          preserveAspectRatio="none"
          style={{
            pointerEvents: "none",
            position: "absolute",
            top: -(linesOfText[0]!.top - line.top),
            left: -(linesOfText[0]!.left - line.left),
            width: line.width,
            height: line.height,
            zIndex: 1,
          }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {variantComponent}
          <rect
            x="0"
            y="0"
            width={animationEffect != "none" ? 0 : 100}
            height="20"
            fill={highlightColor}
            clipPath="url(#highlightShape)"
            filter="url(#highlightFilter)"
          >
            {animationEffect != "none" && (
              <animate
                attributeName="width"
                values={animationDirection == "left" ? "0;100" : "100;0"}
                dur={`${animationDuration}ms`}
                begin={`${
                  animationOffset * (index + 1) + animationDuration * (index > 0 ? 1 : 0)
                }ms`}
                repeatCount="1"
                {...AnimationSpline[animationEffect]}
                fill="freeze"
              />
            )}
          </rect>
        </svg>
      ))}
    </span>
  );
};
