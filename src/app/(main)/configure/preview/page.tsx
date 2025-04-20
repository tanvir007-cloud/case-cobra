import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import DesignPreview from "./components/DesignPreview";
import { auth } from "@/auth/auth";

const PreviewPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const currentUser = !!await auth();

  if (!searchParams.id || typeof searchParams.id !== "string")
    return notFound();

  const configuration = await db.configuration.findUnique({
    where: { id: searchParams.id },
  });

  if (!configuration || !configuration.croppedImageUrl) return notFound();

  return (
    <DesignPreview configuration={configuration} currentUser={currentUser} />
  );
};

export default PreviewPage;
