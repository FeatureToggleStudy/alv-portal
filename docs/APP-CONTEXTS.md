# App Contexts

This document explains what app contexts are, how they work and how they can be created.

From the users perspective, app contexts look like independent apps with separate business features (e.g. contexts `EALV` and `COMPETENCE_CATALOG`).

Technically, an app context is just a set of specific properties:
- the app title
- the URL for the logo
- the "home" URL
- whether to show the desktop menu or not

## How they work

An app context is applied on routes in `app-routing.module.ts` - the lowest route level.
You have to add the `AppContextGuard` and set the `appContext` property:

```
{
    path: 'context-demo',
    loadChildren: './context-demo/context-demo.module#ContextDemoModule',
    canActivate: [AppContextGuard],
    ...
    data: {
      titleKey: 'context.demo.title.key',
      appContext: AppContext.CONTEXT_DEMO,
      ...
    }
  },
```

An app context is activated as soon as the corresponding route (or child routes) is activated (e.g. `/context-demo`). 
