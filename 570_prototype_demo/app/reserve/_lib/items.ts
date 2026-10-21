export type Item = {
  id: string;
  name: string;
  price: number;
  grade: "A" | "B";
  room: "Living" | "Bedroom" | "Study";
  image: string;
  note: string;
};

export const ITEMS: Item[] = [
  {
    id: "sofa",
    name: "Velvet sofa",
    price: 220,
    grade: "B",
    room: "Living",
    image: "/img/sofa.jpg",
    note: "One arm shows wear",
  },
  {
    id: "desk",
    name: "Writing desk",
    price: 110,
    grade: "A",
    room: "Study",
    image: "/img/desk.jpg",
    note: "No marks",
  },
  {
    id: "bed",
    name: "Queen bed frame",
    price: 180,
    grade: "B",
    room: "Bedroom",
    image: "/img/bed.jpg",
    note: "Mattress not included",
  },
  {
    id: "dresser",
    name: "Six-drawer dresser",
    price: 130,
    grade: "B",
    room: "Bedroom",
    image: "/img/dresser.jpg",
    note: "One drawer sticks",
  },
  {
    id: "chair",
    name: "Wooden stool",
    price: 45,
    grade: "A",
    room: "Study",
    image: "/img/chair.jpg",
    note: "Like new",
  },
];

export const ROOMS = ["All", "Living", "Bedroom", "Study"] as const;
