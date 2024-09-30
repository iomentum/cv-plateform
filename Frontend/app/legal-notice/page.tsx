import Header from "@/components/header";
import LegalNotice from "@/components/legalNotice";


export default function legal() {
  return (
      <main >
          <Header />
          <div className="flex min-h-screen flex-col items-center justify-between p-24">
              <LegalNotice />
          </div>
      </main>
  );
}