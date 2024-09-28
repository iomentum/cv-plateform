"use client";
import { FileTextIcon } from "lucide-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { DataType, PrintableTemplate } from "./printableTemplate";
import { Button } from "./ui/button";
import { ColorSchemeName } from "@/utils/templatesType";

type FormData = {
  selectedColor: string | null;
  data: DataType;
};

interface RequestEvaluationDocumentButtonProps {
  values: FormData;
}

const PrintButton = ({ values }: RequestEvaluationDocumentButtonProps) => {
  const documentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => documentRef.current,
    documentTitle: `Votre CV`,
    bodyClass: "p-16", // some padding
  });

  return (
    <Button
      type="submit"
      onClick={() => {
        handlePrint();
      }}
      className="px-10 w-2/12"
    >
      Générer le Cv
      <PrintableTemplate
        selectedColor={values.selectedColor as ColorSchemeName}
        data={values.data}
        ref={documentRef}
      />
    </Button>
  );
};

export { PrintButton };
