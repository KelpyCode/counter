import colors from 'tailwindcss/colors'

export interface CategoryTheme {
  primary: string
  secondary: string
  neutral: string
}

export function getTailwindColors() {
  return Object.keys(colors).filter(x => !['transparent', 'current', 'inherit', 'black', 'white'].includes(x))
}

export function applyTheme(theme: CategoryTheme) {
  updateAppConfig({
    ui: {
      colors: {
        primary: theme.primary,
        neutral: theme.neutral,
        secondary: theme.secondary
      }
    }
  })
}
