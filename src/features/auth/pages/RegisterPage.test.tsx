import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/features/auth/hooks/useAuth', () => ({
  useAuth: () => ({
    register: vi.fn(),
    isLoading: false,
    isAuthenticated: false,
  }),
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@hugeicons/react', () => ({
  HugeiconsIcon: () => <span />,
}));
vi.mock('@hugeicons/core-free-icons', () => ({
  Loading03Icon: 'Loading03Icon',
}));

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

import { RegisterPage } from './RegisterPage';

describe('RegisterPage', () => {
  it('should render all form fields', () => {
    render(<RegisterPage />);
    expect(screen.getByLabelText('Nama Lengkap')).toBeDefined();
    expect(screen.getByLabelText('Email')).toBeDefined();
    expect(screen.getByLabelText('Kata Sandi')).toBeDefined();
    expect(screen.getByLabelText('Konfirmasi Kata Sandi')).toBeDefined();
  });

  it('should render submit button', () => {
    render(<RegisterPage />);
    expect(screen.getByRole('button', { name: /daftar/i })).toBeDefined();
  });

  it('should have link to login page', () => {
    render(<RegisterPage />);
    const link = screen.getByText('Masuk');
    expect(link.getAttribute('href')).toBe('/login');
  });
});
