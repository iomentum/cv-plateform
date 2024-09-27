import React from 'react';
import { CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const ProfileView = ({ user }) => {
  const { name = '', email = '', details = {} } = user;

  return (
    <CardContent className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">{name || 'Nom inconnu'}</h2>
        <p className="text-gray-600">{email || 'Email non disponible'}</p>
      </div>
      <Table>
        <TableBody>
          {Object.entries(details).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="font-medium">{key}</TableCell>
              <TableCell className="text-right">
                {typeof value === 'string' && ['Pending', 'Active'].includes(value) ? (
                  <Badge variant={value === 'Pending' ? 'warning' : 'success'}>
                    {value}
                  </Badge>
                ) : (
                  value || 'Non disponible'
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  );
};

export default ProfileView;