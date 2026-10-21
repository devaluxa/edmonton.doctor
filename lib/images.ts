// Responsive files are generated from the existing clinic illustrations.
const dimensions: Record<string, [number, number]> = {
  "edmonton-doctors-hero-clinic": [1735, 906],
  "clinic-reception": [1717, 916],
  "doctor-consultation": [1721, 914],
  "walk-in-care-consultation": [1752, 897],
};

export function responsiveMedicalImage(src: string) {
  const name = src.match(/^\/images\/medical\/(.+)\.webp$/)?.[1];
  const size = name ? dimensions[name] : undefined;
  if (!name || !size) return {};
  return {
    width: size[0],
    height: size[1],
    srcSet: `/images/medical/${name}-640.webp 640w, ${src} 1280w`,
    sizes:
      "(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) 50vw, 640px",
  };
}
