import Header from "@/components/header";
import RegisterForm from "@/components/register";

export default function Register() {
    return (
        <main >
            <Header />
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <RegisterForm />
            </div>
        </main>
    );
}
