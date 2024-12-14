import React, { useState, useEffect } from 'react';
import supabase from '../ServerBackend/Supabase';

interface Session {
  user: {
    id: string;
    email: string;
  };
}

interface Profile {
  username: string | null;
  website: string | null;
  avatar_url: string | null;
}

interface AccountProps {
  session: Session;
}

const Account: React.FC<AccountProps> = ({ session }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<Profile>({
    username: null,
    website: null,
    avatar_url: null,
  });

  useEffect(() => {
    let ignore = false;

    const getProfile = async () => {
      setLoading(true);
      const { user } = session;

      const { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.error('Error fetching profile:', error);
        } else if (data) {
          setProfile({
            username: data.username,
            website: data.website,
            avatar_url: data.avatar_url,
          });
        }
      }
      setLoading(false);
    };

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  const updateProfile = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const { user } = session;

    const updates = {
      id: user.id,
      username: profile.username,
      website: profile.website,
      avatar_url: profile.avatar_url,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      alert('Error al actualizar el perfil: ' + error.message);
    } else {
      alert('Perfil actualizado correctamente.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={updateProfile} className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>

      <div>
        <label htmlFor="username">Nombre</label>
        <input
          id="username"
          type="text"
          value={profile.username || ''}
          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="url"
          value={profile.website || ''}
          onChange={(e) => setProfile({ ...profile, website: e.target.value })}
        />
      </div>

      <div>
        <button className="button block primary" type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Actualizar'}
        </button>
      </div>

      <div>
        <button
          className="button block"
          type="button"
          onClick={() => supabase.auth.signOut()}
        >
          Cerrar sesión
        </button>
      </div>
    </form>
  );
};

export default Account;