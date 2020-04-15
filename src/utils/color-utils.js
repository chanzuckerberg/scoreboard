import chroma from "chroma-js";

export const colorScale = function (color, position) {
  let chromaColor = chroma(color);
  const colorScale = chroma.scale([
    chromaColor.darken(2),
    chromaColor,
    chromaColor.brighten(2),
  ]);
  return colorScale(position);
};

export const textColor = function (
  color,
  lightText = "#ffffff",
  darkText = "#000000"
) {
  const lum = chroma(color).luminance();
  let text = darkText;
  if (lum < 0.5) {
    text = lightText;
  }
  return text;
};
