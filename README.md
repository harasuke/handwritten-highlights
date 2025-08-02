[![npm version](https://badge.fury.io/js/handwritten-highlights.svg)](https://badge.fury.io/js/handwritten-highlights)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# 📑 Handwritten Highlights ✍️ ✨

> Beautiful & animated text highlighter for your React/Next.js project. Enhance your typography with colorful, animated highlights that resemble a real handwritten work.

---

## Prerequisites

This library requires **Node.js (>=14)** and **React 17+**, and is compatible with React 17, 18, and 19.
Tested and working on Next 15.4

## Installation

```
npm install handwritten-highlights
```

## First wrap your app with the provider


```
  import { HighlightProvider } from "handwritten-highlights";
  ...

  <HighlightProvider>
    <App />
  </HighlightProvider>
```

## Then apply the Highlights
```
import { HighlightMarker, HighlightUnderline } from "handwritten-highlights";
...
return (
  <>
    ...
    <p>
      <HighlightMarker>Lorem ipsum</HighlightMarker>, dolor sit amet consectetur
      adipisicing elit. Commodi eos temporibus, adipisci facilis qui cumque, reiciendis saepe mollitia ratione optio officia illum earum fugiat fugit distinctio!
      Repellat, porro adipisci magni accusantium nemo fugiat minus libero eos
      quis, numquam excepturi molestias error consequatur tempore? Corrupti at eum
      nemo, rem nulla facilis!
    </p>
  </>
)
```

## Configure the highlight the way you prefer
By default no animation is displayed but they are easy to enable
```
<HighlightMarker
  animationEffect="ease-out"
  animationOffset={500}
  animationDuration={600}
  highlightColor="hsla(288, 60%, 50%, 0.30)"
>
  ...
</HighlightMarker>
```
#### animationEffect
"None" by default but these are available:  
>"ease" | "ease-in" | "ease-out" | "ease-in-out"

To make animation effective, other parameters are required which are:

#### animationOffset
Expressed in milliseconds. 0 by default

#### animationDuration
Expressed in milliseconds. 0 by default

#### highlightColor
Expressed as a CSS color.  
rgb() / rgba() / hsla() / hex.  

example:
```
hsla(288, 60%, 50%, 0.30)
```

### License
See the License file.

### ... More effect variants coming soon!