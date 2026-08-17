export default function HeroBanner({
  src,
  alt,
  children,
  className = "min-h-[68vh]",
  contentClassName = "items-end pb-16 pt-24",
  overlayClassName = "hero-veil",
  kenburns = false,
}) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div className="hero-banner">
        <img
          src={src}
          alt={alt}
          className={kenburns ? "hero-kenburns" : undefined}
        />
      </div>
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div
        className={`relative z-10 mx-auto flex w-full max-w-7xl px-4 md:px-6 lg:px-8 ${className} ${contentClassName}`}
      >
        {children}
      </div>
    </section>
  );
}
