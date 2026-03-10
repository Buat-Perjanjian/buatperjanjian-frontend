export interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: 'user' | 'admin' | 'superadmin';
  created_at: string;
}

export interface Company {
  id: string;
  user_id: string;
  name: string;
  address: string | null;
  phone: string | null;
  created_at: string;
}

export interface Document {
  id: string;
  company_id: string;
  template_id: string | null;
  title: string;
  status: 'draft' | 'generated' | 'paid' | 'signed';
  contract_type: 'PKWT' | 'PKWTT' | 'Freelance' | 'NDA' | null;
  created_at: string;
  updated_at: string;
}

export interface DocumentVersion {
  id: string;
  document_id: string;
  version_number: number;
  content_html: string | null;
  content_json: Record<string, unknown> | null;
  created_at: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  contract_type: 'PKWT' | 'PKWTT' | 'Freelance' | 'NDA' | null;
  template_html: string | null;
  template_schema: Record<string, unknown> | null;
  created_at: string;
}

export interface ClauseLibrary {
  id: string;
  title: string;
  description: string | null;
  clause_text: string | null;
  contract_type: 'PKWT' | 'PKWTT' | 'Freelance' | 'NDA' | null;
}

export interface Payment {
  id: string;
  user_id: string;
  document_id: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed';
  payment_provider: string | null;
  created_at: string;
}

export interface AuthResponse {
  user_id: string;
  token: string;
}
