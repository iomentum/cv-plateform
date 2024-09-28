import { persistentAtom } from "@nanostores/persistent";

export type SelectedTemplate = {
  id: number;
  selectedColor: string;
} | null;

export const $selectedTemplate = persistentAtom<SelectedTemplate>(
  "selectedCVTemplate",
  null,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);

export const setSelectedTemplate = (template: SelectedTemplate) =>
  $selectedTemplate.set(template);

export const resetSelectedTemplate = () => $selectedTemplate.set(null);

export const getSelectedTemplate = () => $selectedTemplate.get();
