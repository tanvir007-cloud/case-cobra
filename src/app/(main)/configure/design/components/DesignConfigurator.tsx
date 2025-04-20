"use client";
import HandleComponent from "@/components/HandleComponent";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Label, labelVariants } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { BASE_PRICE } from "@/config/products";
import { toast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/helper";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@/validators/option-validator";
import clsx from "clsx";
import { ArrowRight, Loader2 } from "lucide-react";
import NextImage from "next/image";
import React, { useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { useMutation } from "@tanstack/react-query";
import { saveConfig, saveConfigArgs } from "@/app/actions/saveConfig";
import { useRouter } from "next/navigation";

const DesignConfigurator = ({
  imageUrl,
  imageDimentions,
  configId,
}: {
  configId: string;
  imageUrl: string;
  imageDimentions: { width: number; height: number };
}) => {
  const router = useRouter();
  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });
  const [renderedDimension, setRenderedDimension] = useState({
    width: imageDimentions.width / 4,
    height: imageDimentions.height / 4,
  });

  const [renderedPosition, setRenderedPosition] = useState({
    x: 105,
    y: 205,
  });

  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const base64ToBlob = (base64: string, mimeType: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  const { startUpload } = useUploadThing("imageUploader");

  const saveConfiguration = async () => {
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneCaseRef.current!.getBoundingClientRect();

      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();

      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;

      const actualX = renderedPosition.x - leftOffset;
      const actualY = renderedPosition.y - topOffset;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      const userImage = new Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = imageUrl;
      await new Promise((resolve) => (userImage.onload = resolve));

      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimension.width,
        renderedDimension.height
      );

      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];

      const blob = base64ToBlob(base64Data, "image/png");
      const file = new File([blob], "filename.png", { type: "image/png" });

      await startUpload([file], { configId });
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description:
          "There was a problem saving your config, please try again.",
        variant: "destructive",
      });
    }
  };

  const { mutate: saveConfigFunction, isPending } = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (args: saveConfigArgs) => {
      await Promise.all([saveConfiguration(), saveConfig(args)]);
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was an error on our end. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`);
    },
  });

  return (
    <div className="relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-16 lg:mb-24 gap-y-12 lg:gap-2">
      <div
        ref={containerRef}
        className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-zinc-200 dark:border-zinc-800 p-12 text-center focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
          <AspectRatio
            ref={phoneCaseRef}
            ratio={896 / 1831}
            className="pointer-events-none relative z-40 aspect-[896/1831] w-full"
          >
            <NextImage
              alt="phone-image"
              src={"/phone-template.png"}
              className="pointer-events-none z-40 select-none"
              sizes="1"
              fill
            />
          </AspectRatio>
          <div className="absolute z-30 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)] dark:shadow-[0_0_0_99999px_rgb(24_24_27/0.8)]" />
          <div
            className={cn(
              "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
              `bg-${options.color.tw}`
            )}
          />
        </div>
        <Rnd
          default={{
            x: 150,
            y: 205,
            height: imageDimentions.height / 4,
            width: imageDimentions.width / 4,
          }}
          onResizeStop={(_, __, ref, ___, { x, y }) => {
            setRenderedDimension({
              height: parseInt(ref.style.height.slice(0, -2)),
              width: parseInt(ref.style.width.slice(0, -2)),
            });

            setRenderedPosition({ x, y });
          }}
          onDragStop={(_, data) => {
            const { x, y } = data;
            setRenderedPosition({ x, y });
          }}
          className="absolute z-20 border-[3px] dark:border-green-300 border-green-400"
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
        >
          <div className="relative w-full h-full">
            <NextImage
              src={imageUrl}
              fill
              sizes="1"
              className="pointer-events-none"
              alt="your image"
            />
          </div>
        </Rnd>
      </div>

      <div className="lg:h-[37.5rem] flex flex-col bg-white dark:bg-zinc-950">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div
            aria-hidden="true"
            className="absolute z-10 inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white dark:from-zinc-950 pointer-events-none"
          />

          <div className="sm:px-8 px-2 pb-12 pt-8">
            <h2 className="tracking-tight font-bold text-3xl">
              Customize your case
            </h2>

            <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800 my-6" />

            <div className="relative mt-4 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <RadioGroup
                  defaultValue={options.color.value}
                  onValueChange={(value: string) => {
                    const selectedColor = COLORS.find(
                      (color) => color.value === value
                    );
                    if (selectedColor) {
                      setOptions((prev) => ({
                        ...prev,
                        color: selectedColor,
                      }));
                    }
                  }}
                >
                  <Label>Color: {options.color.label}</Label>
                  <div className="mt-3 flex items-center space-x-3">
                    {COLORS.map((color, index) => (
                      <RadioGroupItem
                        className={clsx(
                          "size-[22px]",
                          `text-${color.tw} border-2 border-${color.tw} dark:text-${color.twd} dark:border-${color.twd}`
                        )}
                        value={color.value}
                        key={index}
                      />
                    ))}
                  </div>
                </RadioGroup>

                <div className="relative flex flex-col gap-3 w-full">
                  <Label>Model</Label>
                  <Select
                    defaultValue={options.model.value}
                    onValueChange={(value: string) => {
                      const selectedModel = MODELS.options.find(
                        (model) => model.value === value
                      );
                      if (selectedModel) {
                        setOptions((prev) => ({
                          ...prev,
                          model: selectedModel,
                        }));
                      }
                    }}
                  >
                    <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {MODELS.options.map((model, index) => (
                          <SelectItem value={model.value} key={index}>
                            {model.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {[MATERIALS, FINISHES].map(
                  ({ name, options: selectableOptions }) => (
                    <RadioGroup
                      key={name}
                      defaultValue={options[name].value}
                      onValueChange={(value: string) => {
                        const SelectedThings = selectableOptions.find(
                          (item) => item.value === value
                        );
                        if (SelectedThings) {
                          setOptions((prev) => ({
                            ...prev,
                            [name]: SelectedThings,
                          }));
                        }
                      }}
                    >
                      <Label>
                        {name.slice(0, 1).toUpperCase() + name.slice(1)}
                      </Label>
                      <div className="mt-3 space-y-4">
                        {selectableOptions.map((option, index) => (
                          <div
                          key={index}
                            className={cn(
                              "flex space-x-2",
                              option.description
                                ? "items-start"
                                : "items-center"
                            )}
                          >
                            <RadioGroupItem
                              value={option.value}
                              key={index}
                              id={option.value}
                              className="hidden"
                            />
                            <label
                              htmlFor={option.value}
                              className={cn(
                                "relative block cursor-pointer rounded-lg bg-white dark:bg-zinc-950 px-6 py-4 shadow-sm border-2 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between w-full",

                                option.value === options[name].value
                                  ? "border-green-600 dark:border-green-500"
                                  : "border-zinc-200 dark:border-zinc-800",
                                option.description
                                  ? "items-start"
                                  : "items-center"
                              )}
                            >
                              <div className="flex flex-col gap-1">
                                <h1 className={labelVariants()}>
                                  {option.label}
                                </h1>
                                {option.description && (
                                  <p className="block sm:inline text-xs text-zinc-500">
                                    {option.description}
                                  </p>
                                )}
                              </div>
                              <div className="text-zinc-900 dark:text-zinc-100 mt-2 lg:mt-0">
                                {formatPrice(option.price / 100)}
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  )
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="w-full px-8 h-16 bg-white dark:bg-zinc-950">
          <Separator />
          <div className="w-full h-full flex justify-end items-center">
            <div className="w-full flex gap-6 items-center justify-between lg:justify-normal">
              <p className="font-medium whitespace-nowrap">
                {formatPrice(
                  (BASE_PRICE + options.finish.price + options.material.price) /
                    100
                )}
              </p>
              <Button
                size={"sm"}
                className="lg:w-full sm:w-auto w-full"
                disabled={isPending}
                onClick={() =>
                  saveConfigFunction({
                    configId,
                    color: options.color.value,
                    finish: options.finish.value,
                    material: options.material.value,
                    model: options.model.value,
                  })
                }
              >
                {isPending && <Loader2 className="animate-spin h-4 w-4" />}
                Continue <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignConfigurator;
