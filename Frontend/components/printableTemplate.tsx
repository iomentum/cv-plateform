"use client";

import { forwardRef } from "react";
import { ColorSchemeName1, ColorSchemeName2, ColorSchemeName3, ModernCV1Props } from "@/utils/templatesType";
import ModernCV1 from "./resumesTemplates/MRT1";
import ModernCV2 from "./resumesTemplates/MRT2";
import ModernCV3 from "./resumesTemplates/MRT3";

export type DataType = ModernCV1Props["data"];

type PrintableTemplateProps = {
  data: DataType;
  selectedColor: ColorSchemeName1 | ColorSchemeName2 | ColorSchemeName3;
  templateId: number;
};

const PrintableTemplate = forwardRef<HTMLDivElement, PrintableTemplateProps>(
  ({ data, selectedColor, templateId }, ref) => {
const renderTemplate = () => {
  if (templateId >= 1 && templateId <= 8) {
    return <ModernCV1 data={data} selectedColor={selectedColor as ColorSchemeName1} />;
  } else if (templateId >= 9 && templateId <= 12) {
    return <ModernCV2 data={data} selectedColor={selectedColor as ColorSchemeName2} />;
  } else if (templateId >= 13 && templateId <= 16) {
    return <ModernCV3 data={data} selectedColor={selectedColor as ColorSchemeName3} />;
  } else {
    return <div>Template non trouvé</div>;
  }
};

    return (
      <div className="h-0 overflow-hidden">
        <div ref={ref} className="">
          {renderTemplate()}
        </div>
      </div>
    );
  }
);
PrintableTemplate.displayName = "PrintableTemplate";

export { PrintableTemplate };