"use client";

import { forwardRef } from "react";
import CvTemplate from "./cv-template";

interface Props {
  values: Object;
  signature: string;
}

const PrintableTemplate = forwardRef<HTMLDivElement, Props>(
  ({ values, signature }, ref) => {
    return (
      <div className="h-0 overflow-hidden">
        <div ref={ref} className="w-full">
          <CvTemplate />
        </div>
      </div>
    );
  }
);
PrintableTemplate.displayName = "PrintableTemplate";

export { PrintableTemplate };
