"use client";

import { forwardRef, type ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

type MotionLinkProps = Omit<HTMLMotionProps<"a">, "children" | "href"> & {
  children: ReactNode;
  href: string;
  className?: string;
};

type StaggerItemProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  className?: string;
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 1, y }}
      transition={{ delay, duration: 0.55, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({
  children,
  className = "",
  ...props
}: Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      viewport={{ once: true, amount: 0.16 }}
      whileInView={reduceMotion ? undefined : "show"}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const StaggerItem = forwardRef<HTMLDivElement, StaggerItemProps>(
  function StaggerItem({ children, className = "", ...props }, ref) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      ref={ref}
      transition={{ duration: 0.45, ease: "easeOut" }}
      variants={{
        hidden: reduceMotion ? {} : { opacity: 1, y: 12 },
        show: reduceMotion ? {} : { opacity: 1, y: 0 },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
  },
);

export function MotionCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      transition={{ duration: 0.18, ease: "easeOut" }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
    >
      {children}
    </motion.div>
  );
}

export function MotionLink({
  children,
  className = "",
  href,
  ...props
}: MotionLinkProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      className={className}
      href={href}
      transition={{ duration: 0.16, ease: "easeOut" }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
