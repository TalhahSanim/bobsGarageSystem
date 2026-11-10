// File -> client/src/flowbiteTheme.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// Flowbite theme -> our changes to Flowbite to match square design
// Only classes listed here change
import { createTheme } from "flowbite-react";

const flowbiteTheme = createTheme({
  // Are you sure box -> square, surface and border colors
  modal: {
    content: {
      inner:
        "rounded-none border border-line bg-surface text-ink dark:bg-surface dark:text-ink",
    },
    header: {
      close: {
        base: "rounded-none text-muted hover:bg-page hover:text-ink dark:hover:bg-page dark:hover:text-ink",
      },
    },
  },
  // pop up message -> square with blue bar on left
  toast: {
    root: {
      base: "rounded-none border-l-4 border-primary bg-surface text-ink shadow-lg dark:bg-surface dark:text-ink",
    },
    toggle: {
      base: "rounded-none bg-surface text-muted hover:bg-page hover:text-ink dark:bg-surface dark:hover:bg-page dark:hover:text-ink ",
    },
  },
});

export default flowbiteTheme;
