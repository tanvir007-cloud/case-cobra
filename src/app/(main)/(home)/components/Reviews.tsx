"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import React, {
  Fragment,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Phone from "../Phone";

const PHONES = [
  "/testimonials/1.jpg",
  "/testimonials/2.jpg",
  "/testimonials/3.jpg",
  "/testimonials/4.jpg",
  "/testimonials/5.jpg",
  "/testimonials/6.jpg",
];

function splitArray<T>(array: Array<T>, numParts: number) {
  const result: Array<Array<T>> = [];

  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }

  return result;
}

const ReviewColumn = ({
  className,
  msPerPixel = 0,
  reviewClassName,
  reviews,
}: {
  reviews: string[];
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel?: number;
}) => {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState(0);
  const duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) return;

    const resizeObserver = new window.ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });

    resizeObserver.observe(columnRef.current);

    return () => resizeObserver.disconnect();
  }, []);
  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-8 py-4", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
        <Review
          key={reviewIndex}
          className={reviewClassName?.(reviewIndex % reviews.length)}
          imgSrc={imgSrc}
        />
      ))}
    </div>
  );
};

interface ReviewProps extends HTMLAttributes<HTMLElement> {
  imgSrc: string;
}

const Review = ({ imgSrc, className, ...props }: ReviewProps) => {
  const POSSIBLE_ANIMATION_DELAY = [
    "0s",
    "0.1s",
    "0.2s",
    "0.3s",
    "0.4s",
    "0.5s",
  ];

  const animationDelay =
    POSSIBLE_ANIMATION_DELAY[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAY.length)
    ];

  return (
    <div
      {...props}
      className={cn(
        "animate-fade-in rounded-[2.5rem] bg-white dark:bg-zinc-950 p-2 opacity-0 shadow-xl shadow-zinc-900/5 max-w-xs w-full",
        className
      )}
      style={{ animationDelay }}
    >
      <Phone imgSrc={imgSrc} column />
    </div>
  );
};

const ReviewGrid = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const columns = splitArray(PHONES, 3);
  const column1 = columns[0];
  const column2 = columns[1];
  const column3 = splitArray(columns[0], 2);

  return (
    <div
      ref={containerRef}
      className="relative md:-mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <Fragment>
          <ReviewColumn
            reviews={[...column1, ...column3.flat(), ...column2]}
            className="flex flex-col items-center"
            reviewClassName={(reviewIndex) =>
              cn({
                "md:hidden": reviewIndex >= column1.length + column3[0].length,
                "lg:hidden": reviewIndex >= column1.length,
              })
            }
            msPerPixel={10}
          />
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? "lg:hidden" : ""
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={[...column3.flat()]}
            className="hidden md:block"
            msPerPixel={10}
          />
        </Fragment>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white dark:from-zinc-950" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white dark:from-zinc-950" />
    </div>
  );
};

const Reviews = () => {
  return (
    <MaxWidthWrapper className="relative max-w-5xl">
      <Image
        aria-hidden
        src={"/what-people-are-buying.png"}
        className="absolute select-none hidden xl:block -left-24 top-1/4 size-36"
        alt="review image"
        width={24}
        height={24}
        sizes="1"
      />
      <ReviewGrid />
    </MaxWidthWrapper>
  );
};

export default Reviews;
