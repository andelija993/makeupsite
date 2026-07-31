import Link from "next/link";
import { cn } from "@/lib/utils";

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

const variants = {
  primary: "bg-foreground text-background hover:opacity-90",
  secondary: "border border-line bg-white hover:bg-muted/50",
  ghost: "hover:bg-muted/60",
};

type ButtonProps = {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, variant = "primary", className, href, ...props }: ButtonProps) {
  if (href) {
    return (
      <Link href={href} className={cn(baseStyles, variants[variant], className)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
