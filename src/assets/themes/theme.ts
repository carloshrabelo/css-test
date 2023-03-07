import { Theme } from "@emotion/react";

export const theme: Theme = {
  "colors": {
    "primary": "var(--primary)",
    "secondary": "var(--secondary)",
    "error": "var(--error)",
    "success": "var(--success)",
    "warning": "var(--warning)",
    "info": "var(--info)",
  },
  "contrast": {
    "primary": "var(--primary-contrast)",
    "secondary": "var(--secondary-contrast)",
    "error": "var(--error-contrast)",
    "success": "var(--success-contrast)",
    "warning": "var(--warning-contrast)",
    "info": "var(--info-contrast)",
  },
  "border": {
    "color": "var(--border-color)",
  },
  "bg": {
    "color": "var(--bg)",
  },
  "text": {
    "color": "var(--text-color)",
  }
}

export default theme;