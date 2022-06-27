// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

/*
 * This is taken from <https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom>, but
 * as a simple assignment instead of the property descriptor to make it work with material-ui.
 */
global.matchMedia = query => ({
  matches: true,
  media: query,
  onchange: null,
  addListener: jest.fn(), // deprecated
  removeListener: jest.fn(), // deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
})
