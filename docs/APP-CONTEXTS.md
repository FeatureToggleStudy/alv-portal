# App Contexts

This document explains what app contexts are, how they work and how they can be created.

From the users perspective, app contexts look like independent apps with separate business features (e.g. contexts `EALV` and `COMPETENCE_CATALOG`).

Technically, an app context is just a set of specific properties:
- the app title
- the URL for the logo
- the "home" URL
- whether to show the desktop menu or not

## 1. Add route(s) with context

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

An app context is activated in the `AppContextGuard` as soon as the corresponding route (or child routes) is activated (e.g. `/context-demo`). 

## New User Role
If you add a new app context you should NOT use the existing user roles, because the landing navigation (see `landing-navigation.service.ts`) would break.
For proper forwarding you have to add som
