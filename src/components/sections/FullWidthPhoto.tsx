import Image from 'next/image';

export function FullWidthPhoto() {
  return (
    <section className="relative h-[50vh] w-full overflow-hidden md:h-[72vh]">
      <Image
        src="/images/fullWidth.jpg"
        alt="Merle und Lasse"
        fill
        className="object-cover"
        sizes="100vw"
        priority={false}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
    </section>
  );
}