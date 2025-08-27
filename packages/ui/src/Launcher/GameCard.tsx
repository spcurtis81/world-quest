"use client";
import React from "react";
import Link from "next/link";
import { toast } from "../toast";

type Props = {
  id: string;
  name: string;
  description: string;
  href: string;
  disabled?: boolean;
};

export function GameCard({ id, name, description, href, disabled }: Props) {
  const onClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (disabled) {
      e.preventDefault();
      toast(`${name} is not available yet.`, { duration: 2000 });
      return;
    }
    // Non-blocking informative toast (matches test expectation)
    toast(`Loading ${name}…`, { duration: 1000 });
  };

  return (
    <li data-testid={`game-card-${id}`}>
      <Link
        href={disabled ? "#" : href}
        aria-disabled={disabled ? "true" : "false"}
        aria-label={name}
        onClick={onClick}
        className={`game-card${disabled ? " is-disabled" : ""}`}
      >
        <h3>{name}</h3>
        <p>{description}</p>
      </Link>
    </li>
  );
}
