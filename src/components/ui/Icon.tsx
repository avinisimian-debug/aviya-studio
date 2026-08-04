import type { LucideIcon, LucideProps } from "lucide-react";
import { cn } from "@/lib/cn";

type IconSize = "xs" | "sm" | "md" | "lg";

const sizeMap: Record<IconSize, number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
};

type IconProps = LucideProps & {
  icon: LucideIcon;
  size?: IconSize;
  label?: string;
};

/**
 * Consistent Lucide wrapper — optical size + a11y defaults for RTL UI.
 * Decorative icons are aria-hidden; pass `label` for meaningful icons.
 */
export function Icon({
  icon: Lucide,
  size = "md",
  label,
  className,
  strokeWidth = 1.5,
  ...rest
}: IconProps) {
  const px = sizeMap[size];
  return (
    <Lucide
      width={px}
      height={px}
      strokeWidth={strokeWidth}
      className={cn("shrink-0", className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      {...rest}
    />
  );
}
