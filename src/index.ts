type RGB = `rgb(${number}, ${number}, ${number})` | `rgb(${number},${number},${number})`;
type RGBA =
  | `rgba(${number}, ${number}, ${number}, ${number})`
  | `rgba(${number},${number},${number},${number})`;
type HEX = `#${string}`;
type HSLA =
  | `hsla(${number}, ${number}%, ${number}%, ${number})`
  | `hsla(${number},${number}%,${number}%,${number})`;
export type CSSColor = RGB | RGBA | HEX | HSLA;

type AnimationEasing = "none" | "ease" | "ease-in" | "ease-out" | "ease-in-out";

export const AnimationSpline: {
  none: { [K in never]: never };
} & Record<
  Exclude<AnimationEasing, "none">,
  {
    keyTimes: string;
    keySplines: string;
    calcMode: string;
  }
> = {
  none: {},
  ease: {
    keyTimes: "0;1",
    keySplines: "0.42 0 0.58 1",
    calcMode: "spline",
  },
  "ease-in": {
    keyTimes: "0;1",
    keySplines: "0.42 0 1 1",
    calcMode: "spline",
  },
  "ease-out": {
    keyTimes: "0;1",
    keySplines: "0 0 0.58 1",
    calcMode: "spline",
  },
  "ease-in-out": {
    keyTimes: "0;1",
    keySplines: "0.42 0 0.58 1",
    calcMode: "spline",
  },
} as const;

export { HighlightProvider } from "./providers/HighlightProvider";
export { HighlightMarker } from "./components/HighlightMarker";
export { HighlightUnderline } from "./components/HighlightUnderline";
