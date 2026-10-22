"use client";

import { useSyncExternalStore } from "react";

export type Fallback = "donate" | "return" | "auto";

export type Listing = {
  category: string;
  price: number;
  floor: number;
  fallback: Fallback;
  day: string;
};

const KEY = "relay-value-listing";

/** What the dashboard shows when someone opens it without listing first. */
export const SEED_LISTING: Listing = {
  category: "Sofa",
  price: 220,
  floor: 150,
  fallback: "donate",
  day: "Thu 29",
};

export function saveListing(listing: Listing) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(listing));
  } catch {
    // storage blocked: the dashboard falls back to the seeded sofa
  }
}

function read(): string | null {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

const subscribe = () => () => {};

/** Raw string keeps the snapshot stable between renders. */
export function useListing(): { listing: Listing; seeded: boolean } {
  const raw = useSyncExternalStore(subscribe, read, () => null);
  if (raw) {
    try {
      return { listing: JSON.parse(raw) as Listing, seeded: false };
    } catch {
      // fall through to the seed
    }
  }
  return { listing: SEED_LISTING, seeded: true };
}
