# App Contexts

This document explains what app contexts are and how they can be created.

From the users perspective, app contexts look like independent apps with separate business features (e.g. contexts `EALV` and `COMPETENCE_CATALOG`).

## What is an "App Context"?
Technically, an app context is just a set of specific properties:
- the app title
- the URL for the logo
- the "home" URL
- whether to show the desktop menu or not

## Create a new App Context
Besides adding the new context name to the enum `app-context.enum.ts`, you have to edit the following files.
### 1. Add new AppContextStrategy
Every app context needs its own `AppContextStrategy`. Go to `app-context.service.ts` and add a new one:
```
...
{
  matches: isContextDemo,
  isDesktopMenuShown: isAuthenticatedUser,
  appTitle: 'portal.context.context-demo.app-title',
  logoUrl: 'portal.context.context-demo.logo-filename',
  homeUrl: ['context-demo', 'home']
},
...
```

### 2. Add route(s) with context

An app context is applied on routes in `app-routing.module.ts` - the root route level.
You have to add the `AppContextGuard` and set the `appContext` data property for each (root level) route 
of your context:

```
...
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
...
```

An app context is activated in the `AppContextGuard` as soon as the corresponding route (or child routes) is activated (e.g. `/context-demo`). 

### 3. Add new UserNavigationStrategy
If you add a new app context you should NOT use the existing user roles, because the landing navigation would break.
For proper forwarding you have to add a `UserNavigationStrategy` in `landing-navigation.service.ts`:
```
...
{
  matches: user => user.hasAnyAuthorities([UserRole.ROLE_CONTEXT_DEMO]),
  navigate: () => this.router.navigate(['context-demo', 'dashboard'])
}
...
```

### 4. Add new Menu Entries
Basically, every context has its own user menu definitions. Add new entries in `menu-entry.service.ts` with the corresponding `appContextPredicate`:
```
...
{
  id: 'CONTEXT-DEMO',
  mainMenuEntryKeys: ['cd-home', 'cd-dashboard'],
  onlineFormsMenuEntryKeys: [],
  settingsMenuEntryKeys: [],
  userPredicate: isAnyUser,
  appContextPredicate: isContextDemo
},
...
```

```
...
{
  id: 'cd-home',
  iconClass: 'home',
  labelKey: 'CD Home',
  path: ['context-demo', 'home'],
  userPredicate: isAnyUser
},
{
  id: 'cd-dashboard',
  iconClass: 'home',
  labelKey: 'CD Dashboard',
  path: ['context-demo', 'dashboard'],
  userPredicate: isAuthenticatedUser
}
...
```

Now you can go to `/context-demo` (or your context's home route respectively) to see your new app context in action.
