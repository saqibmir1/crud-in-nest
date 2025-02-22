# starter nestjs repo



# Tree

```shell
.
└── src
    ├── app.controller.ts
    ├── app.module.ts
    ├── app.service.ts
    ├── auth
    │   ├── auth.controller.ts
    │   ├── auth.module.ts
    │   ├── auth.service.ts
    │   ├── dto
    │   │   ├── create-auth.dto.ts
    │   │   └── login.dto.ts
    │   └── entities
    │       └── auth.entity.ts
    ├── core
    │   ├── database
    │   │   ├── database.config.ts
    │   │   └── database.module.ts
    │   ├── dtos
    │   │   └── generic-response.dot.ts
    │   └── guards
    │       └── auth.guard.ts
    ├── main.ts
    └── user
        ├── dto
        │   ├── create-user.dto.ts
        │   └── update-user.dto.ts
        ├── entities
        │   └── user.entity.ts
        ├── user.controller.ts
        ├── user.module.ts
        └── user.service.ts
```