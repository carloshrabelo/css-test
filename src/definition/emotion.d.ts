import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    "colors": {
      "primary": string,
      "secondary": string,
      "error": string,
      "success": string,
      "warning": string,
      "info": string,
    },
    "contrast": {
      "primary": string,
      "secondary": string,
      "error": string,
      "success": string,
      "warning": string,
      "info": string,
    },
    "border": {
      "color": string,
    },
    "bg": {
      "color": string,
    },
    "text": {
      "color": string
    }
  }
}