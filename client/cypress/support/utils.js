// tagged template string: see link for details https://stackoverflow.com/questions/29660381/backticks-calling-a-function
export const testid = (strings, ...values) => {
  const id = strings.map((str, index) => str + (values[index] || '')).join('')
  return `[data-testid="${id}"]`
}