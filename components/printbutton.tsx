"use client";
import { FileTextIcon } from "lucide-react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { PrintableTemplate } from "./printableTemplate";
import { Button } from "./ui/button";

type FormData = {
  name: string;
};
interface RequestEvaluationDocumentButtonProps {
  values: FormData;
  signature: string;
}

const PrintButton = ({
  values,
  signature,
}: RequestEvaluationDocumentButtonProps) => {
  const documentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => documentRef.current,
    documentTitle: `YourPdfTitle-${values.name}`,
    bodyClass: "p-16", // some padding
  });

  return (
    <div>
      <Button
        onClick={() => {
          handlePrint();
        }}
        className="py-6 flex gap-2"
      >
        <FileTextIcon className="size-4" /> PDF herunterladen
      </Button>
      <PrintableTemplate
        ref={documentRef}
        values={values}
        signature={signature}
      />
    </div>
  );
};

export { PrintButton };
