"use client";

import { forwardRef } from "react";
import ModernCV2 from "./resumesTemplates/MRT2";
import { ColorSchemeName, Props } from "@/utils/templatesType";

export type DataType = Props["data"];

type PrintableTemplateProps = {
  data: DataType;
  selectedColor: ColorSchemeName;
};

const PrintableTemplate = forwardRef<HTMLDivElement, PrintableTemplateProps>(
  ({ data, selectedColor }, ref) => {
    // TODO: Rendre ce btn dynamique
    return (
      <div className="h-0 overflow-hidden">
        <div ref={ref} className="">
          <ModernCV2 data={data} selectedColor={selectedColor} />
        </div>
      </div>
    );
  }
);
PrintableTemplate.displayName = "PrintableTemplate";

export { PrintableTemplate };
