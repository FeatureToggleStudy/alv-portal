# Guidelines

The document describes development guidelines in general (conventions, best practices, etc.). 

## Formatting conventions

Formatting is defined by `.editorconfig` file. 

To apply this formatting automatically by IntelliJ IDEA, you need to do the following:

1. Install [EditorConfig plugin](https://plugins.jetbrains.com/plugin/7294-editorconfig)
1. Enable EditorConfig support on the *Settings -> Editor -> Code Style* page.    

## UI Guidelines

See [UI Guidelines](GUIDELINES-UI.md). 

## Accessibility Guidelines

See [Accessibility Guidelines](GUIDELINES-ACCESSIBILITY.md). 

## Logging

Every logged message gets automatically assigned a __trace-Id__ (aka correlation Id) by Spring Sleuth.
Normally you don't have to care about this at all. 
At the moment a manual creation of a span is not required, since only one backend service is involved. 
