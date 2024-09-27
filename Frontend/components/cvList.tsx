import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FileText, Share2, Trash2 } from 'lucide-react'

const CVList = ({ cvs, loading, onShareCV, onDeleteCV }) => {
  return (
    <Card className="w-full shadow-lg rounded-lg overflow-hidden min-h-[300px]">
      <CardHeader className="bg-white py-6 px-8">
        <CardTitle className="flex items-center text-xl font-semibold">
          <FileText className="mr-3 h-6 w-6" />
          Mes CVs générés
        </CardTitle>
      </CardHeader>
      <CardContent className="px-8 py-6">
        {loading ? (
          <p className="text-center text-lg">Chargement des CVs...</p>
        ) : cvs.length > 0 ? (
          <Table>
            <TableBody>
              {cvs.map((cv) => (
                <TableRow key={cv.id}>
                  <TableCell className="font-medium text-lg">{cv.name}</TableCell>
                  <TableCell className="text-lg">{cv.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="lg" className="mr-2" onClick={() => onShareCV(cv.id)}>
                      <Share2 className="h-5 w-5 mr-2" />
                      Partager
                    </Button>
                    <Button variant="destructive" size="lg" onClick={() => onDeleteCV(cv.id)}>
                      <Trash2 className="h-5 w-5 mr-2" />
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-lg">Aucun CV généré pour le moment.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default CVList;