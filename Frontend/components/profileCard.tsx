import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { User, Edit } from 'lucide-react'
import ProfileView from './profileView';
import ProfileEdit from './profileEdit';
import CVList from './cvList';

const getmycv = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, name: 'CV_FrontEnd_Developer.pdf', date: '2023-09-15' },
    { id: 2, name: 'CV_FullStack_Engineer.pdf', date: '2023-10-20' },
    { id: 3, name: 'CV_React_Specialist.pdf', date: '2023-11-05' },
  ];
};

const ProfileCard = ({ user: initialUser }) => {
  const [user, setUser] = useState(initialUser);
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const fetchedCVs = await getmycv();
        setCvs(fetchedCVs);
      } catch (error) {
        console.error("Erreur lors de la récupération des CVs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCVs();
  }, []);

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    console.log("Données du profil mises à jour:", updatedUser);
  };

  const handleShareCV = (cvId) => {
    console.log(`Partager le CV avec l'ID: ${cvId}`);
  };

  const handleDeleteCV = (cvId) => {
    console.log(`Supprimer le CV avec l'ID: ${cvId}`);
    setCvs(prevCvs => prevCvs.filter(cv => cv.id !== cvId));
  };

  if (!user) {
    return <div>Aucune donnée utilisateur disponible</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-6">
      <div className="w-full max-w-4xl space-y-8">
        <Card className="w-full shadow-lg rounded-lg overflow-hidden min-h-[300px]">
          <Tabs defaultValue="profile" className="w-full h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile" className="flex items-center justify-center py-4 text-lg">
                <User className="mr-2 h-5 w-5" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="edit" className="flex items-center justify-center py-4 text-lg">
                <Edit className="mr-2 h-5 w-5" />
                Edit Profile
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="p-6">
              <ProfileView user={user} />
            </TabsContent>
            <TabsContent value="edit" className="p-6">
              <ProfileEdit user={user} onUpdateUser={handleUpdateUser} />
            </TabsContent>
          </Tabs>
        </Card>

        <CVList 
          cvs={cvs} 
          loading={loading} 
          onShareCV={handleShareCV} 
          onDeleteCV={handleDeleteCV} 
        />
      </div>
    </div>
  );
};

export default ProfileCard;