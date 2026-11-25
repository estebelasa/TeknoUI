# TkSidebar

Responsive navigation component for TeknoUI.

## Features

- Standalone

- Signals

- OnPush

- Responsive

- Keyboard Navigation

- Accessible

## Inputs

config

items

profile

footer

## Outputs

itemSelected

## Mobile drawer

Below `mobileBreakpoint` (900px by default) the sidebar becomes an overlay drawer, opened from a button of the application with `openMobile()`.

- Opening moves focus into the drawer and traps Tab / Shift+Tab inside it.
- Escape or a click on the backdrop closes it and gives focus back to the opener with `focus({ preventScroll: true })`, so the page never moves.
- Choosing an item emits `itemSelected` and closes the drawer **without** giving focus back to the opener: the user is going somewhere else. The application should move focus to the destination in its `itemSelected` handler (for an in-page section: `tabindex="-1"` + `focus({ preventScroll: true })` next to the scroll).

## Tokens

Sidebar component consumes only Component Tokens.