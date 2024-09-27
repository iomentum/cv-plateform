import ProfileCard from "@/components/profileCard";

export default function Profile() {
    const user = {
        name: 'John Doe',
        email: 'johndoe45@gmail.com',
    };
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
            <ProfileCard user={user} />
        </main>
    );
}
