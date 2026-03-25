# Xenoberage TypeScript Porting Plan

## Steps

1. Port PHP classes (player, ship, planet, sector, user, db, etc.) to TypeScript modules in backend/xenoberage.
2. Use shared/types.ts for User, Ship, Planet, etc.
3. Move business/game logic into backend services/controllers.
4. Convert SQL logic to ORM/query builder.
5. Migrate config values from xenoberage/config/config.php to TypeScript config or .env.
6. Build React components in frontend/xenoberage for UI, using in-game layout.
7. Connect frontend to backend APIs.
8. Expose backend logic via REST endpoints in backend/xenoberage.routes.ts.
9. Test and document all features.

## Integration
- Import Xenoberage modules in frontend and backend as needed.
- Update navigation/UI to include Xenoberage features.
