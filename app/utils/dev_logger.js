export function devLogger(component, message = '') {
  if ('development' === NODE_ENV) {
    const name = component.name || component.constructor.name
    console.debug('Rendering', name, message);
  }
}
