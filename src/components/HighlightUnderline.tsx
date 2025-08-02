import React, { useContext, useEffect, useId, useRef, useState } from "react";
import { AnimationSpline, CSSColor } from "../index";
import { HighlightContext } from "../providers/HighlightProvider";
import useHighlightUnderlineVariant from "../hooks/useHighlightUnderlineVariant";

interface HighlightUnderlineProps {
  children: React.ReactNode;
  highlightVariant?: "1" | "2" | "3" | "random";
  highlightColor?: CSSColor;
  animationOffset?: number;
  animationDirection?: "left" | "right" | "center";
  animationDuration?: number;
  animationEffect?: keyof typeof AnimationSpline;
}

export const HighlightUnderline = ({
  children,
  highlightVariant = "2",
  highlightColor = "hsla(120, 60%, 50%, 0.5)",
  animationDirection = "left",
  animationDuration = 400,
  animationOffset = 0,
  animationEffect = "none",
}: HighlightUnderlineProps) => {
  const ctx = useContext(HighlightContext);
  const id = useId();
  const randomClass = `highlight-${id.replace(/:/g, "-")}`;

  const { variantPath } = useHighlightUnderlineVariant(highlightVariant);

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
      {linesOfText?.map((line, index) => {
        return (
          <svg
            key={index}
            viewBox={`0 0 ${line.width} ${line.height + 4}`}
            preserveAspectRatio="none"
            style={{
              pointerEvents: "none",
              position: "absolute",
              top: -(linesOfText[0]!.top - line.top) + 2,
              left: -(linesOfText[0]!.left - line.left),
              width: line.width,
              height: line.height,
              zIndex: 1,
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* {variantComponent} */}
            <path
              d={variantPath(line)}
              fill="transparent"
              stroke={highlightColor}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={line.width * 3}
              strokeDashoffset={animationEffect !== "none" ? line.width * 3 : 0}
            >
              {animationEffect != "none" && (
                <animate
                  attributeName="stroke-dashoffset"
                  from={animationDirection === "left" ? line.width * 3 : 0}
                  to={animationDirection === "left" ? 0 : line.width * 3}
                  dur={`${animationDuration}ms`}
                  begin={`${
                    animationOffset * (index + 1) + animationDuration * (index > 0 ? 1 : 0)
                  }ms`}
                  repeatCount="1"
                  {...AnimationSpline[animationEffect]}
                  fill="freeze"
                />
              )}
            </path>
          </svg>
        );
      })}
    </span>
  );
};
