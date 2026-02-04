# Frontend Architecture Standards - Estatística Hospitalar Sequele

## 📂 Folder Structure
- `src/components/[ComponentName]/`: Reusable UI elements. Must include `index.jsx` and `[ComponentName].module.css`.
- `src/pages/[PageName]/`: Top-level page containers. Must include `index.jsx` and `[PageName].module.css`.
- `src/services/`: API client configurations and endpoint functions.
- `src/hooks/`: Custom React hooks for shared logic.
- `src/utils/`: Pure helper functions, constants, and data formatters.
- `src/routes/`: Application routing configuration.
- `src/context/`: Global state management using Context API.

## ✅ Coding Standards
1. **Component-First**: Everything is built as a component to ensure reusability.
2. **CSS Modules**: Use `.module.css` for scoped styling to prevent collisions.
3. **Forms**: Unified form management using `react-hook-form`.
4. **Documentation**: Components must be documented with descriptive comments.
5. **Performance**: 
   - Use `useMemo` and `useCallback` for expensive operations.
   - Implement responsive design at the component level.
   - Minimize external dependencies.

## 🚀 Navigation
Routing is managed centrally in `src/routes/AppRoutes.jsx`.

---
*Created by Antigravity AI for Conexio Viva.*
