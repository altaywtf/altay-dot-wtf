import type { Book } from "@/lib/books";
import { format } from "date-fns";
import { Star } from "lucide-react";

type Props = {
  book: Book;
};

const StarRating = (props: { max: number; rating: number }) => (
  <div>
    {Array.from({ length: props.max }).map((_, i) => (
      <Star
        className={`inline-block ${
          i < props.rating ? "fill-cyan-400" : "fill-neutral-700"
        }`}
        // biome-ignore lint/suspicious/noArrayIndexKey: <no better way :D>
        key={i}
        strokeWidth={0}
        fontSize={14}
      />
    ))}
  </div>
);

export const BookReadDateAndRating: React.FC<Props> = ({ book }) => {
  const info = [
    {
      component: (
        <p className="text-neutral-400">
          Read in {format(new Date(book.dateRead), "MMMM yyyy")}
        </p>
      ),
      key: "date",
    },
    {
      component: <StarRating max={5} rating={book.rating} />,
      key: "rating",
    },
  ];

  return (
    <>
      {info.map((i) => (
        <div key={i.key}>{i.component}</div>
      ))}
    </>
  );
};
