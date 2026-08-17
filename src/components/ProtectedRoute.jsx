import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { Wrench, Lock } from 'lucide-react';

export const ProtectedRoute = ({ allowedRole, children, onRedirect }) => {
  const { user, currentRole, setAuthModalOpen } = useAuth();

  useEffect(() => {
    if (allowedRole === 'MAALEM') {
      if (!user) {
        toast.warning('Connexion requise : Veuillez vous connecter pour accéder à l\'Espace Maalem Pro.');
        setAuthModalOpen(true);
        if (onRedirect) onRedirect('LANDING');
      } else if (user.role?.toUpperCase() !== 'MAALEM') {
        toast.error('Accès réservé aux artisans !');
        if (onRedirect) onRedirect('CLIENT');
      }
    } else if (allowedRole === 'CLIENT') {
      if (user && user.role?.toUpperCase() === 'MAALEM') {
        toast.info('Redirection automatique vers votre Espace Maalem Pro.');
        if (onRedirect) onRedirect('MAALEM');
      }
    }
  }, [user, allowedRole, currentRole]);

  // CLIENT ACCESS: Allowed if user is unauthenticated or has role CLIENT
  if (allowedRole === 'CLIENT') {
    if (user && user.role?.toUpperCase() === 'MAALEM') {
      return (
        <div className="text-center py-16 space-y-4">
          <div className="w-16 h-16 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto text-2xl font-black shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <Wrench className="w-8 h-8 text-cyan-400" />
          </div>
          <h3 className="text-2xl font-black text-white">Espace réservé aux Clients</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Vous êtes connecté avec un compte Maalem Pro.
          </p>
        </div>
      );
    }
    return children;
  }

  // MAALEM ACCESS: Allowed strictly if authenticated as MAALEM
  if (allowedRole === 'MAALEM') {
    if (user && user.role?.toUpperCase() === 'MAALEM') {
      return children;
    }

    return (
      <div className="text-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto text-2xl font-black shadow-[0_0_20px_rgba(245,158,11,0.4)]">
          <Lock className="w-8 h-8 text-amber-400" />
        </div>
        <h3 className="text-2xl font-black text-white">Accès Réservé aux Artisans Maallems</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Veuillez vous connecter avec votre compte Maalem vérifié pour accéder au radar d'urgences et aux leads.
        </p>
      </div>
    );
  }

  return children;
};
