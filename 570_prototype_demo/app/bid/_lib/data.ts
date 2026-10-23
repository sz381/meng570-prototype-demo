export type Auction = {
  id: string;
  name: string;
  grade: "A" | "B";
  image: string;
  note: string;
  start: number;
  current: number;
  bids: number;
  /** the other bidders' combined ceiling; never shown to the buyer */
  rivalMax: number;
  floorMet: boolean;
  closes: string;
  similar: [number, number];
};

export const INCREMENT = 5;

export const AUCTIONS: Auction[] = [
  {
    id: "sofa",
    name: "Velvet sofa",
    grade: "B",
    image: "/img/sofa.jpg",
    note: "One arm shows wear",
    start: 120,
    current: 150,
    bids: 6,
    rivalMax: 185,
    floorMet: true,
    closes: "Jul 20",
    similar: [180, 240],
  },
  {
    id: "desk",
    name: "Writing desk",
    grade: "A",
    image: "/img/desk.jpg",
    note: "No marks",
    start: 60,
    current: 75,
    bids: 4,
    rivalMax: 95,
    floorMet: false,
    closes: "Jul 20",
    similar: [90, 130],
  },
  {
    id: "bed",
    name: "Queen bed frame",
    grade: "B",
    image: "/img/bed.jpg",
    note: "Mattress not included",
    start: 100,
    current: 125,
    bids: 5,
    rivalMax: 150,
    floorMet: true,
    closes: "Aug 1",
    similar: [150, 200],
  },
  {
    id: "dresser",
    name: "Six-drawer dresser",
    grade: "B",
    image: "/img/dresser.jpg",
    note: "One drawer sticks",
    start: 70,
    current: 70,
    bids: 0,
    rivalMax: 90,
    floorMet: false,
    closes: "Aug 1",
    similar: [110, 150],
  },
  {
    id: "chair",
    name: "Wooden stool",
    grade: "A",
    image: "/img/chair.jpg",
    note: "Like new",
    start: 20,
    current: 30,
    bids: 3,
    rivalMax: 40,
    floorMet: true,
    closes: "Aug 5",
    similar: [35, 55],
  },
];
