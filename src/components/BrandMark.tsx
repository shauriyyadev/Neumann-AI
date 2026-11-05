/* The Neumann splash mark.

   Rendered from the supplied PNG so the brand asset stays identical to the
   original artwork. Decorative: the wordmark beside it carries the name. */

export default function BrandMark({ className }: { className?: string }) {
  return (
    <img
      src="/neumann-mark.png"
      alt=""
      aria-hidden="true"
      width={64}
      height={64}
      className={className ? `brandmark ${className}` : "brandmark"}
    />
  );
}
