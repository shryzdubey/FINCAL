'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import ComplianceFooter from '@/components/ComplianceFooter';
import { motion } from 'motion/react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for sign in would go here
    console.log('Sign in attempt:', { email, password });
  };

  return (
    <main className="main-content">
      <Header />

      <div className="container py-24 flex justify-center items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card w-full max-w-md"
        >
          <h2 className="section-heading text-center mb-8">Sign In</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="btn-primary mt-4">
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-grey">
              Don&apos;t have an account? <span className="text-primary font-bold cursor-pointer">Register</span>
            </p>
          </div>
        </motion.div>
      </div>

      <ComplianceFooter />
    </main>
  );
}
