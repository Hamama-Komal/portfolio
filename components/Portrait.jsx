import Image from "next/image";

/**
 * Portrait, framed rather than decorated. A square on the grid with a hairline
 * and one rust crop mark at the top-left — the kind of registration detail a
 * printed layout would carry. No tilt, no sheen, no rotating ring.
 *
 * The file is matted with an alpha channel rather than baked onto a background
 * colour, so one image sits correctly on both themes. That halves the download
 * against the old pair, and the palette can change without regenerating it.
 * See scripts/make-portrait.py.
 */
export default function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-[20rem] lg:mx-0 lg:max-w-none">
      {/* Crop mark */}
      <span
        aria-hidden
        className="absolute -left-2 -top-2 h-6 w-6 border-l border-t border-accent"
      />

      <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-rule">
        <Image
          src="/img/me.webp"
          alt="Hamama Komal"
          fill
          priority
          sizes="(max-width: 1024px) 20rem, 22rem"
          className="scale-[1.06] object-cover object-[32%_32%]"
        />
      </div>
    </div>
  );
}
