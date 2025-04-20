import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import DesignConfigurator from "./components/DesignConfigurator";

const DesignPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  if (!searchParams.id || typeof searchParams.id !== "string")
    return notFound();

  const configuration = await db.configuration.findUnique({
    where: { id: searchParams.id },
  });

  if (!configuration) return notFound();

  const { imageUrl, width, height } = configuration;

  return (
    <DesignConfigurator
      imageUrl={imageUrl}
      configId={configuration.id}
      imageDimentions={{ width, height }}
    />
  );
};

export default DesignPage;
