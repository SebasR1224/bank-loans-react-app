import { LoanRequestForm } from '../components/LoanRequestForm';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Panel de Usuario</h2>
      <button onClick={logout}>Cerrar sesión</button>
      <LoanRequestForm
        onSuccess={() => {
          console.log('Solicitud de préstamo enviada con éxito');
        }}
        />
    </div>
  );
};

export default Dashboard;