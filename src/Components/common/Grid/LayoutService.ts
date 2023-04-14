export default function getWidths<T>(containerWidth: number, config: ColumnConfig<T>[]) {
  const widths: number[] = [];

  let totalWidth = 0,
    phi = 0;
  config.forEach((c) => {
    totalWidth += c.width;
    if (!c.isWidthFixed) {
      phi += c.growthOrder;
    }
  });
  const remWidth = containerWidth - totalWidth;
  if (remWidth < 0) {
    config.forEach((c) => widths.push(c.width));
  } else {
    const dispersion = remWidth / phi;
    config.forEach((c) => {
      if (c.isWidthFixed) {
        widths.push(c.width);
      } else {
        widths.push(c.width + c.growthOrder * dispersion);
      }
    });
  }
  return widths;
}
