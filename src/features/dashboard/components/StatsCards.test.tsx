/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatsCards } from './StatsCards';
import type { Document, Company } from '@/types';

// Mock HugeIcons
vi.mock('@hugeicons/react', () => ({
  HugeiconsIcon: (props: Record<string, unknown>) => <span data-testid="icon" {...props} />,
}));
vi.mock('@hugeicons/core-free-icons', () => ({
  File02Icon: 'File02Icon',
  PencilEdit02Icon: 'PencilEdit02Icon',
  CheckmarkCircle02Icon: 'CheckmarkCircle02Icon',
  Building06Icon: 'Building06Icon',
}));

const mockDocuments = [
  { id: '1', status: 'draft', title: 'Doc 1' },
  { id: '2', status: 'draft', title: 'Doc 2' },
  { id: '3', status: 'generated', title: 'Doc 3' },
  { id: '4', status: 'paid', title: 'Doc 4' },
] as Document[];

const mockCompanies = [
  { id: '1', name: 'PT ABC' },
  { id: '2', name: 'PT XYZ' },
] as Company[];

describe('StatsCards', () => {
  it('should render all 4 stat labels', () => {
    render(<StatsCards documents={mockDocuments} companies={mockCompanies} />);

    expect(screen.getByText('Total Dokumen')).toBeDefined();
    expect(screen.getByText('Draft')).toBeDefined();
    expect(screen.getByText('Selesai')).toBeDefined();
    expect(screen.getByText('Perusahaan')).toBeDefined();
  });

  it('should calculate correct counts', () => {
    render(<StatsCards documents={mockDocuments} companies={mockCompanies} />);

    expect(screen.getByText('4')).toBeDefined(); // total
    // draft=2, completed=2, companies=2 — multiple '2's expected
    const twos = screen.getAllByText('2');
    expect(twos.length).toBe(3);
  });

  it('should render with empty data', () => {
    render(<StatsCards documents={[]} companies={[]} />);

    const zeros = screen.getAllByText('0');
    expect(zeros.length).toBe(4);
  });
});
