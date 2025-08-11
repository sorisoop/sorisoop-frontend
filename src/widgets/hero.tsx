type HeroProps = {
  title: string;
  description: string;
  image: {
    mobile: string;
    tablet?: string;
  };
  alt: string;
};

export default function Hero({ title, description, image, alt }: HeroProps) {
  return (
    <section className="pt-4">
      <div className="mx-auto max-w-screen-lg">
        <div className="relative overflow-hidden rounded-lg shadow h-[280px] md:h-[180px] lg:h-[240px] bg-muted">
          <picture>
            {image.tablet && <source srcSet={image.tablet} media="(min-width: 768px)" />}
            <img
              src={image.mobile}
              alt={alt}
              className="absolute inset-0 h-full w-full object-cover object-[center_30%] md:object-center"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
            <div className="absolute inset-x-0 bottom-0 h-24 md:h-20 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent pointer-events-none" />
            <div className="relative">
              <h2 className="text-xl md:text-3xl font-extrabold tracking-tight text-background">{title}</h2>
              <p className="mt-1 text-sm md:text-lg text-background/90">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
