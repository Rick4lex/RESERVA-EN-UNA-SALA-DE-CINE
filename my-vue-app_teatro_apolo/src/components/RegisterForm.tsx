import { useState } from 'react';
import supabase from '../ServerBackend/Supabase';

export const RegisterForm = ({ onClose }: { onClose: () => void }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        const { error } = await supabase.auth.signUp({ email: formData.email, password: formData.password });

        if (error) {
            setError('Error: ' + error.message);
        } else {
            alert('Registro exitoso');
            onClose();
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Registro</h2>
            <input name="firstName" placeholder="Nombres" onChange={handleChange} required />
            <input name="lastName" placeholder="Apellidos" onChange={handleChange} required />
            <input name="phone" placeholder="Teléfono" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Confirmar Contraseña" onChange={handleChange} required />
            {error && <p>{error}</p>}
            <button className='regist-btn' type="submit">Registrar</button>
        </form>
    );
};
