import Header from "@/components/header";
import { Login } from "../../components/login";

export default function Auth() {
  return (
    <main >
      <Header />
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <Login />
      </div>
    </main>
  );
}
