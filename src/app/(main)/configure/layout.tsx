import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Steps from "@/components/Steps";
import React from "react";

const ConfigureLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MaxWidthWrapper className="flex flex-col flex-1">
      <Steps />
      {children}
    </MaxWidthWrapper>
  );
};

export default ConfigureLayout;
