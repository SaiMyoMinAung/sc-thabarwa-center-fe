import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { login } from '../api/loginClient';
import { GlobalContext } from '../context/GlobalState';

export default function ManagerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ open: false, severity: 'error', message: '' });
  const [loading, setLoading] = useState(false);
  const { addToken } = useContext(GlobalContext);

  const validate = () => {
    const e = {};
    if (!email) e.email = 'Email is required';
    if (!password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {

      login({ email, password })
        .then(data => {

          if (data.token) {

            setToast({ open: true, severity: 'success', message: 'Login Successful' });

            addToken(data.token)

            setTimeout(() => navigate('/manager-view'), 1000);
          } else {
            setToast({ open: true, severity: 'error', message: 'Login Failed' });
          }

          setLoading(false);
        })
        .catch(err => {
          if (err.name !== 'AbortError') console.error(err);
        });

      setLoading(false);

      // navigate after short delay so user sees toast

    } catch (err) {
      console.error(err);
      setToast({ open: true, severity: 'error', message: err.message || 'Network error' });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Snackbar
        open={toast.open}
        autoHideDuration={toast.severity === 'error' ? 5000 : 3000}
        onClose={() => setToast(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setToast(prev => ({ ...prev, open: false }))} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>

      <form onSubmit={submit} className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Manager Login</h2>

        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={`block w-full rounded-md border px-3 py-2 mb-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.email && <div className="text-xs text-red-600 mb-2">{errors.email}</div>}

        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={`block w-full rounded-md border px-3 py-2 mb-2 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.password && <div className="text-xs text-red-600 mb-2">{errors.password}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-md disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}