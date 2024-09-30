import CVTemplateShowcase from "@/components/cvTemplateSelection";
import Header from "@/components/header";

export default function TemplateSelection() {
  return (
    <main>
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <CVTemplateShowcase />
      </div>
    </main>
  );
}
