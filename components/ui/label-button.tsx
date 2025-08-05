import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useState, MouseEventHandler } from "react";
import Link from "next/link";

interface ProximityButtonProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?:
    | "nohover"
    | "destructive"
    | "outline"
    | "secondary"
    | "link"
    | "ghost"
    | "default";
  extLink?: boolean;
  size?: "icon";
  ariaLabel?: string;
  label?: string;
}

export const LabelButton = ({
  children,
  className = "",
  href,
  variant = "ghost",
  extLink = false,
  size: buttonSize = "icon",
  ariaLabel,
  asChild,
  onClick,
  label,
}: ProximityButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const ButtonContent = (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        variant={variant}
        size={buttonSize}
        asChild={asChild}
        onClick={onClick}
        className={`flex items-center justify-center ${className}`}
      >
        {href ? (
          <>
            {extLink ? (
              <Link
                href={href}
                aria-label={ariaLabel}
                className="justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </Link>
            ) : (
              <Link
                href={href}
                aria-label={ariaLabel}
                className="justify-center"
              >
                {children}
              </Link>
            )}
          </>
        ) : (
          <>{children}</>
        )}
      </Button>

      {label && (
        <motion.div
          className="pointer-events-none absolute left-full z-50 ml-2 rounded bg-black px-2 py-1 text-sm whitespace-nowrap text-white shadow-md dark:bg-white dark:text-black"
          initial={{ opacity: 0, x: -10 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : -10,
          }}
          transition={{ duration: 0.2 }}
        >
          {label}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 border-8 border-transparent border-r-black dark:border-r-white" />
        </motion.div>
      )}
    </div>
  );

  return ButtonContent;
};
