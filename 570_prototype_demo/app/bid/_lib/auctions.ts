"use client";

import { useSyncExternalStore } from "react";
import { AUCTIONS, INCREMENT } from "./data";
import type { Auction } from "./data";

export { AUCTIONS, INCREMENT };
export type { Auction };

export type Entry = {
  max: number;
  status: "winning" | "outbid";
  price: number;
  bids: number;
};

export type BidState = { entries: Record<string, Entry>; closed: boolean };

const EMPTY: BidState = { entries: {}, closed: false };
const KEY = "relay-bid-state";

let state: BidState | null = null;
const listeners = new Set<() => void>();

function get(): BidState {
  if (state) return state;
  try {
    const raw = sessionStorage.getItem(KEY);
    state = raw ? (JSON.parse(raw) as BidState) : EMPTY;
  } catch {
    state = EMPTY;
  }
  return state;
}

function set(next: BidState) {
  state = next;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // storage blocked: bids live in memory for this tab
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useBids(): BidState {
  return useSyncExternalStore(subscribe, get, () => EMPTY);
}

export function currentBid(auction: Auction, entry?: Entry) {
  return entry?.price ?? auction.current;
}

export function bidCount(auction: Auction, entry?: Entry) {
  return entry?.bids ?? auction.bids;
}

/**
 * We bid for the buyer, one increment at a time, up to their max.
 * Win if the max beats the other bidders' ceiling; otherwise they are
 * outbid at the lower of that ceiling and one increment above the max.
 */
export function placeBid(auction: Auction, max: number): Entry {
  const prior = get().entries[auction.id];
  const baseBids = prior?.bids ?? auction.bids;
  const entry: Entry =
    max > auction.rivalMax
      ? {
          max,
          status: "winning",
          price: Math.min(max, auction.rivalMax + INCREMENT),
          bids: baseBids + 2,
        }
      : {
          max,
          status: "outbid",
          price: Math.min(auction.rivalMax, max + INCREMENT),
          bids: baseBids + 2,
        };
  set({ ...get(), entries: { ...get().entries, [auction.id]: entry } });
  return entry;
}

export function closeAuctions() {
  set({ ...get(), closed: true });
}

export function resetBids() {
  set(EMPTY);
}
