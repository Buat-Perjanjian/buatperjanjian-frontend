import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/features/auth/hooks/useAuth', () => ({
  useAuth: () => ({
    login: vi.fn(),
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

import { LoginPage } from './LoginPage';

describe('LoginPage', () => {
  it('should render email and password fields', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText('Email')).toBeDefined();
    expect(screen.getByLabelText('Kata Sandi')).toBeDefined();
  });

  it('should render submit button', () => {
    render(<LoginPage />);
    expect(screen.getByRole('button', { name: /masuk/i })).toBeDefined();
  });

  it('should have link to register page', () => {
    render(<LoginPage />);
    const link = screen.getByText('Daftar');
    expect(link.getAttribute('href')).toBe('/register');
  });
});
