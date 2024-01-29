import { LucideIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  href: string;
  title: string;
  icon: LucideIcon;
};

export function WidgetLink(props: Props) {
  return (
    <Link
      href={props.href}
      className={`hover:bg-zinc-100 w-full rounded-md px-3 py-1 flex items-center gap-2 min-w-max`}
    >
      <props.icon className="w-3" />
      <span>{props.title}</span>
    </Link>
  );
}
