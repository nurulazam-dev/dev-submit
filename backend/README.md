### used technologies:

```bash
# packages
express dotenv helmet http-status zod jsonwebtoken ms cookie-parser cors qs date-fns uuid
```

```bash
# devDependencies
   @types/node @types/express @types/jsonwebtoken @types/ms @types/cookie-parser @types/cors @types/qs @types/uuid
```

### Run project:

```bash
npm run dev
```

### Build project:

```bash
npm run build
```

### Start project:

```bash
npm start
```

### Run the project after create or add new schema:

```bash
npx prisma contract emit       # Update contract.json and contract.d.ts
npx prisma db init             # Create tables in the database
npx prisma db update             # update the database
npx prisma migration status    # Show migration status
```
