import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
};

export function WidgetLink({ href, children }: Props) {
  return (
    <Link
      href={href}
      className={`hover:bg-zinc-100 w-full rounded-md px-3 py-1 flex items-center gap-2 min-w-max`}
    >
      {children}
    </Link>
  );
}
