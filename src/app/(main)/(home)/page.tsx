import { Icons } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/app/(main)/(home)/Phone";
import { ArrowRight, Check, Star } from "lucide-react";
import Image from "next/image";
import Reviews from "./components/Reviews";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <section>
        <MaxWidthWrapper className="pb-24 lg:grid lg:grid-cols-3 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32">
          <div className="col-span-2 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <Image
                  src={"/snake-1.png"}
                  alt="image"
                  sizes="1"
                  width={28}
                  height={28}
                  className="w-full"
                />
              </div>
              <h1 className="relative w-fit tracking-tight text-balance lg:mt-16 mt-4 font-bold !leading-tight text-zinc-900 dark:text-zinc-100 text-5xl md:text-6xl lg:text-7xl">
                Your Image on a{" "}
                <span className="bg-green-600 dark:bg-green-500 px-2 text-white dark:text-zinc-950">
                  Custom
                </span>{" "}
                Phone Case
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Capture your favorite memories with your own,{" "}
                <span className="font-semibold">one-of-one</span> phone case.
                CaseCobra allows you to protect your memories, not just your
                phone case.
              </p>

              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600 dark:text-green-500" />
                    High-quality, durable metarial
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600 dark:text-green-500" />
                    5 year print guarantee
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-green-600 dark:text-green-500" />
                    Modern iPhone models supported
                  </li>
                </div>
              </ul>
              <div className="mt-12 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="flex -space-x-4">
                  <Image
                    src="/users/user-1.png"
                    alt="user image"
                    className="size-10 rounded-full ring-2 inline-block ring-white dark:ring-zinc-950"
                    width={10}
                    height={10}
                    sizes="1"
                  />
                  <Image
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-zinc-950"
                    src={"/users/user-2.png"}
                    alt="user image"
                    height={10}
                    width={10}
                    sizes="1"
                  />
                  <Image
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-zinc-950"
                    src={"/users/user-3.png"}
                    alt="user image"
                    height={10}
                    width={10}
                    sizes="1"
                  />
                  <Image
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-zinc-950"
                    src={"/users/user-4.jpg"}
                    alt="user image"
                    height={10}
                    width={10}
                    sizes="1"
                  />
                  <Image
                    className="h-10 w-10 rounded-full ring-2 ring-white dark:ring-zinc-950"
                    src={"/users/user-5.jpg"}
                    alt="user image"
                    height={10}
                    width={10}
                    sizes="1"
                  />
                </div>
                <div className="flex flex-col justify-between items-center sm:items-start">
                  <div className="flex gap-0.5">
                    <Star className="h-4 w-4 text-green-600 dark:text-green-500 fill-green-600 dark:fill-green-500" />
                    <Star className="h-4 w-4 text-green-600 dark:text-green-500 fill-green-600 dark:fill-green-500" />
                    <Star className="h-4 w-4 text-green-600 dark:text-green-500 fill-green-600 dark:fill-green-500" />
                    <Star className="h-4 w-4 text-green-600 dark:text-green-500 fill-green-600 dark:fill-green-500" />
                    <Star className="h-4 w-4 text-green-600 dark:text-green-500 fill-green-600 dark:fill-green-500" />
                  </div>
                  <p>
                    <span className="font-semibold">1.250</span> happy customers
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 sm:mt-32 mt-12 lg:mx-0 lg:mt-20 h-fit">
            <div className="relative md:max-w-xl">
              <Image
                src={"/your-image.png"}
                className="absolute size-40 lg:size-52 left-56 -top-20 select-none hidden sm:block lg:hidden 2xl:block"
                alt="user image"
                sizes="1"
                width={40}
                height={40}
              />
              <Image
                src={"/line.png"}
                className="absolute size-20 -left-6 -bottom-6 select-none"
                alt="user image"
                sizes="1"
                width={20}
                height={20}
              />
              <Phone className="w-64" imgSrc="/testimonials/1.jpg" />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* value position section */}
      <section className="pb-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-10">
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-zinc-900 dark:text-zinc-100">
              What our{" "}
              <span className="relative px-2">
                customers{" "}
                <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-green-600 dark:text-green-500" />
              </span>{" "}
              say
            </h2>
            <Image
              src={"/snake-2.png"}
              className="size-24 lg:order-2"
              alt=""
              width={24}
              height={24}
              sizes="1"
            />
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2 gap-y-16">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20"
                key={index}
              >
                <div className="flex gap-0.5 mb-2">
                  <Star className="h-5 w-5 text-green-600 fill-green-600 dark:text-green-500 dark:fill-green-500" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600 dark:text-green-500 dark:fill-green-500" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600 dark:text-green-500 dark:fill-green-500" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600 dark:text-green-500 dark:fill-green-500" />
                  <Star className="h-5 w-5 text-green-600 fill-green-600 dark:text-green-500 dark:fill-green-500" />
                </div>
                <div className="text-lg leading-8">
                  <p>
                    &quot;The case feels durable and I even got a compliment on
                    the design. Had the case for two and a half month now and{" "}
                    <span className="p-0.5 bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-950">
                      the image is super clear
                    </span>
                    ,on the case I had before, the image started fading into
                    yellow-ish color after a couple weeks. Love it.&quot;
                  </p>
                </div>
                <div className="flex gap-4 mt-2">
                  <Image
                    src={"/users/user-1.png"}
                    className="rounded-full size-12 object-cover"
                    height={12}
                    width={12}
                    sizes="1"
                    alt="user image"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold">Imtiaz Ahmed</p>
                    <div className="flex gap-1.5 items-center text-zinc-600 dark:text-zinc-400">
                      <Check className="h-4 w-4 stroke-[3px] text-green-600 dark:text-green-500" />
                      <p className="text-sm">Verified Purchase</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>

        <div className="pt-16">
          <Reviews />
        </div>
      </section>

      <section className="pb-24">
        <MaxWidthWrapper>
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="order-1 mt-2 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-zinc-900 dark:text-zinc-100">
                Upload your photo and get{" "}
                <span className="relative px-2 bg-green-600 dark:bg-green-500 text-white dark:text-zinc-950">
                  your own case
                </span>{" "}
                now
              </h2>
            </div>
          </div>
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="relative flex flex-col items-center md:grid grid-cols-2 gap-40">
              <Image
                src="/arrow.png"
                alt=""
                className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0 w-24"
                height={40}
                width={40}
                sizes="1"
              />
              <div className="relative h-80 md:h-[580px] w-full md:justify-self-end max-w-sm rounded-xl bg-zinc-900/5 dark:bg-zinc-100/5 ring-inset ring-zinc-900/10 dark:ring-zinc-100/10 lg:rounded-2xl">
                <Image
                  src="/horse.jpg"
                  alt=""
                  className="rounded-md object-cover bg-white dark:bg-zinc-950 shadow-2xl ring-1 ring-zinc-900/10 dark:ring-zinc-100/10 h-full w-full"
                  fill
                />
              </div>
              <Phone imgSrc="/horse_phone.jpg" className="w-60 h-[470px]" />
            </div>
          </div>

          <ul className="mx-auto mt-12 max-w-prose sm:text-lg space-y-2 w-fit">
            <li className="w-fit">
              <Check className="h-5 w-5 text-green-600 dark:text-green-500 inline mr-1.5" />
              High-quality metarial
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-green-600 dark:text-green-500 inline mr-1.5" />
              Scrach and fingerPrint resistant coating
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-green-600 dark:text-green-500 inline mr-1.5" />
              Wireless charging compitable
            </li>
            <li className="w-fit">
              <Check className="h-5 w-5 text-green-600 dark:text-green-500 inline mr-1.5" />
              5 year print warranty
            </li>

            <div className="flex justify-center">
              <Link
                href={"/configure/upload"}
                className={buttonVariants({
                  className: "mx-auto mt-8",
                })}
              >
                Create your case now <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </ul>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
