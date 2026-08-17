export default function Photo({
  src,
  alt,
  ratio = "aspect-4/3",
  fill = false,
  className = "",
  imgClassName = "",
}) {
  return (
    <div
      className={`relative overflow-hidden ${fill ? "h-full min-h-80" : ratio} ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 h-full w-full max-w-none object-cover object-center ${imgClassName}`}
      />
    </div>
  );
}
