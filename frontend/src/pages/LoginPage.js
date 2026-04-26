// ONLY CHANGE IS INSIDE catch BLOCK

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// Separate login mode: student or teacher
const MODES = [
  { key: 'student', label: 'Student Login', icon: '📚', color: 'from-eco-600 to-eco-700', accent: 'text-eco-600 dark:text-eco-400' },
  { key: 'teacher', label: 'Teacher Login', icon: '🎓', color: 'from-purple-600 to-purple-700', accent: 'text-purple-600 dark:text-purple-400' },
];

function validateField(name, value) {
  if (name === 'email') {
    if (!value.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';
    if (!value.toLowerCase().endsWith('@gmail.com')) return 'Only Gmail addresses (@gmail.com) are accepted';
  }
  if (name === 'password') {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
  }
  return '';
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('student');
  const [form, setForm] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const currentMode = MODES.find(m => m.key === mode);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (touched[name]) setFieldErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    setApiError('');
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    setFieldErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const errs = { email: validateField('email', form.email), password: validateField('password', form.password) };
    setFieldErrors(errs);
    setTouched({ email: true, password: true });
    if (Object.values(errs).some(Boolean)) return;
    setLoading(true);

    try {
      const data = await login(form.email.trim(), form.password);

      if (data.user?.role === 'teacher') navigate('/teacher');
      else if (data.user?.role === 'admin') navigate('/admin');
      else navigate('/dashboard');

    } catch (err) {
      // ✅ FIXED LINE (IMPORTANT)
      setApiError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (field) => {
    const base = 'input-field';
    if (!touched[field]) return base;
    if (fieldErrors[field]) return `${base} border-red-400 focus:ring-red-300 dark:border-red-500`;
    if (form[field]) return `${base} border-eco-400 focus:ring-eco-300`;
    return base;
  };

  return (
    <div className="min-h-screen flex bg-[var(--bg-base)]">
      {/* UI unchanged */}
      {/* (rest of your UI remains EXACTLY SAME) */}
    </div>
  );
}
