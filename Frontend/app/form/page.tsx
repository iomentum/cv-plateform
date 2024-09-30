import Header from "@/components/header";
import PersonalInfoForm from "@/components/personalInfoForm";

export default function Register() {
    return (
        <main >
            <Header />
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <PersonalInfoForm />
            </div>
        </main>
    );
}
