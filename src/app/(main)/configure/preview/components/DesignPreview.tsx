"use client";
import LoginModal from "@/app/(auth)/LoginModal";
import { createCheckoutSession } from "@/app/actions/createCheckoutSession";
import MainPhone from "@/components/MainPhone";
import { Button } from "@/components/ui/button";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { Configuration } from "@/generated/prisma/client";
import { toast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { COLORS, MODELS } from "@/validators/option-validator";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import Confetti from "react-dom-confetti";

const DesignPreview = ({
  configuration,
  currentUser,
}: {
  configuration: Configuration;
  currentUser: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => setShowConfetti(true), [setShowConfetti]);
  const router = useRouter();

  const { color, model, finish, material } = configuration;
  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === color
  )?.tw;

  const { label: modelLabel } = MODELS.options.find(
    ({ value }) => value === model
  )!;

  let totalPrice = BASE_PRICE;
  if (material === "polycarbonate")
    totalPrice += PRODUCT_PRICES.material.polycarbonate;
  if (finish === "textured") totalPrice += PRODUCT_PRICES.finish.textured;

  const { mutate: createPaymentSession, isPending } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) router.push(url);
      else throw new Error("Unable to recieve payment URL.");
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was an error on our end. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <Fragment>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        <Confetti
          active={showConfetti}
          config={{ elementCount: 200, spread: 90 }}
        />
      </div>

      <LoginModal open={open} setOpen={setOpen} currentUser={currentUser} />

      <div className="mt-20 flex flex-col items-center md:items-start md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2">
          <MainPhone
            className={cn(
              `bg-${tw}`,
              "md:max-w-full max-w-60 rounded-[2.3rem] xl:rounded-[2.4rem] md:rounded-[2.3rem] lg:rounded-[2rem]"
            )}
            imgSrc={configuration.croppedImageUrl!}
          />
        </div>

        <div className="mt-6 sm:col-span-9 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Your {modelLabel} Case
          </h3>
          <div className="mt-3 flex items-center gap-1.5 text-base">
            <Check className="h-4 w-4 text-green-500" />
            In stock and ready to ship
          </div>
        </div>

        <div className="sm:col-span-12 md:col-span-9 text-base">
          <div className="grid grid-cols-1 gap-y-8 border-b border-zinc-200 dark:border-zinc-800 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
            <div>
              <p className="font-medium text-zinc-950 dark:text-white">
                Highlights
              </p>
              <ol className="mt-3 text-zinc-700 dark:text-zinc-300 list-disc list-inside">
                <li>Wireless charging compatible</li>
                <li>TPU shock absorption</li>
                <li>Packaging made from recycled materials</li>
                <li>5 year print warranty</li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-zinc-950 dark:text-white">
                Materials
              </p>
              <ol className="mt-3 text-zinc-700 dark:text-zinc-300 list-disc list-inside">
                <li>High-quality, durable material</li>
                <li>Scratch- and fingerprint resistant coating</li>
              </ol>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 sm:rounded-lg sm:p-8">
              <div className="flow-root text-sm">
                <div className="flex items-center justify-between py-1 mt-2">
                  <p className="text-zinc-600 dark:text-zinc-400">Base price</p>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    {formatPrice(BASE_PRICE / 100)}
                  </p>
                </div>

                {finish === "textured" ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Textured finish
                    </p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">
                      {formatPrice(PRODUCT_PRICES.finish.textured / 100)}
                    </p>
                  </div>
                ) : null}

                {material === "polycarbonate" ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Soft polycarbonate material
                    </p>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">
                      {formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)}
                    </p>
                  </div>
                ) : null}

                <div className="my-2 h-px bg-zinc-200 dark:bg-zinc-800" />

                <div className="flex items-center justify-between py-2">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                    Order total
                  </p>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {formatPrice(totalPrice / 100)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end pb-12">
              <Button
                disabled={isPending}
                onClick={() =>
                  currentUser
                    ? createPaymentSession({ configId: configuration.id })
                    : setOpen(true)
                }
              >
                {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Check out <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DesignPreview;
