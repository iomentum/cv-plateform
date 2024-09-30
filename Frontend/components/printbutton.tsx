"use client";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { DataType, PrintableTemplate } from "./printableTemplate";
import { Button } from "./ui/button";
import { ColorSchemeName1, ColorSchemeName2, ColorSchemeName3 } from "@/utils/templatesType";

type FormData = {
  selectedColor: string | null;
  data: DataType;
  templateId: number; // Ajout de cette ligne
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
        selectedColor={values.selectedColor as ColorSchemeName1 | ColorSchemeName2 | ColorSchemeName3}
        data={values.data}
        templateId={values.templateId} // Utilisation du templateId
        ref={documentRef}
      />
    </Button>
  );
};

export { PrintButton };