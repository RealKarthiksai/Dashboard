# TrotOS Release Verification Checklist

This checklist must be executed and fully pass before any major Sprint or milestone is merged and tagged.

## Phase 1 — Runtime Stability
- [ ] `PASS`: Zero console errors during normal navigation
- [ ] `PASS`: Zero unhandled promise rejections
- [ ] `PASS`: Zero React warnings (e.g. key props, unmounted state updates)
- [ ] `PASS`: Zero TypeScript compilation errors (`npm run typecheck`)
- [ ] `PASS`: Zero Vite build warnings (`npm run build`)

## Phase 2 — Registry Validation
- [ ] `PASS`: `npm run validate:registries` exits with code 0
- [ ] `PASS`: No duplicate IDs in Navigation, Widgets, Quick Actions, Notifications
- [ ] `PASS`: All routes referenced in registries exist in React Router

## Phase 3 — Permission Engine
- [ ] `PASS`: `npm run validate:permissions` exits with code 0
- [ ] `PASS`: Every PermissionKey referenced in a registry actually exists
- [ ] `PASS`: No orphaned permissions
- [ ] `PASS`: `PermissionGate` and `PermissionRoute` tested and correctly block unauthorized roles

## Phase 4 — Architecture Integrity
- [ ] `PASS`: `npm run validate:architecture` exits with code 0
- [ ] `PASS`: `Core` does not import `Features`
- [ ] `PASS`: `Shared` does not import `Features`
- [ ] `PASS`: Features do not cross-import each other

## Phase 5 — Import Graph & Code Quality
- [ ] `PASS`: `npm run circular` (Madge) reports 0 circular dependencies
- [ ] `PASS`: `npm run deadcode` (ts-prune) reports 0 unused exports / dead code
- [ ] `PASS`: `npm run lint` (oxlint) reports 0 linting violations

## Phase 6 — Security & Dependencies
- [ ] `PASS`: `npm audit` reports 0 Critical or High vulnerabilities

## Phase 7 — Application Shell (Manual)
- [ ] `PASS`: Sidebar toggles smoothly (Desktop/Mobile)
- [ ] `PASS`: Theme switcher toggles Dark/Light modes instantly
- [ ] `PASS`: Command Palette (⌘K) opens and filters by permission
- [ ] `PASS`: Notification drawer opens and filters by permission

## Phase 8 — Role Simulator Matrix (Manual)
- [ ] `PASS`: Tested `Owner`
- [ ] `PASS`: Tested `Operations_Manager`
- [ ] `PASS`: Tested `Finance_Manager`
- [ ] `PASS`: Tested `Viewer`
- *(Verify Widgets, Quick Actions, Navigation, and Notifications correctly adapt)*

## Phase 9 — UI & Responsiveness (Manual)
- [ ] `PASS`: Dashboard looks correct on Mobile (375px width)
- [ ] `PASS`: Dashboard looks correct on Tablet (768px width)
- [ ] `PASS`: Dashboard looks correct on Desktop (1440px width)
- [ ] `PASS`: Empty/Loading states render without crashing

## Phase 10 — Accessibility (Manual)
- [ ] `PASS`: Keyboard navigation (Tab, Enter, Space) works for all primary actions
- [ ] `PASS`: Focus rings are visible on interactive elements
- [ ] `PASS`: Skip link exists and focuses main content area
