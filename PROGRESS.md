# BuatPerjanjian Frontend — Progress Tracking

## Architecture
- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** TailwindCSS + shadcn/ui
- **State:** React Hook Form + Zod + Tanstack Query
- **API Client:** Axios with JWT interceptor
- **Repo:** `/home/deska/Desktop/buatperjanjian-frontend`

---

## Phase 2: Frontend — COMPLETED ✅

### Feature Modules (11)
| Module | Status | Key Components |
|--------|--------|----------------|
| auth | ✅ | LoginPage, RegisterPage, useAuth, ProtectedRoute |
| dashboard | ✅ | StatsCards, RecentDocuments, QuickActions |
| wizard | ✅ | 7-step engine, Stepper, ContractPreview, autosave |
| documents | ✅ | DocumentTable, DocumentViewer, DocumentActions |
| templates | ✅ | TemplateCard, TemplateSelector |
| clauses | ✅ | ClauseCard, ClauseSelector |
| ai | ✅ | AIChatPanel, useAIRewrite, useAIExplain |
| payments | ✅ | PaymentSummary, PaymentButton |
| admin | ✅ | AdminStats, UserManagement, TemplateManagement |
| settings | ✅ | Profile update, Company management |
| landing | ✅ | Hero, Features, Pricing, Footer |

### Routes
| Route | Page | Auth |
|-------|------|------|
| / | Landing page | Public |
| /login | Login | Public |
| /register | Register | Public |
| /dashboard | Dashboard | Protected |
| /documents | Documents list | Protected |
| /documents/[id] | Document detail | Protected |
| /wizard/[id] | Contract wizard | Protected |
| /templates | Template selection | Protected |
| /settings | User settings | Protected |
| /admin | Admin dashboard | Admin only |

### Git History
```
76473f7 feat: add landing page, admin dashboard, and settings page
61fca52 feat: implement documents, templates, clauses, AI, and payments features
d69a159 feat: implement 7-step wizard engine with autosave
c5ed9d7 feat: implement dashboard with stats cards and recent documents
981ed37 feat: implement auth feature with login, register, JWT storage
a68e60c Initial commit: Next.js 14 project with feature-based architecture
```

---

## Next: Phase 3 — AI Service (`buatperjanjian-ai`)
