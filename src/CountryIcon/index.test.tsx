import { CountryIcon } from './'
import { render } from '@testing-library/react'

describe('CountryIcon', () => {
  it('renders icon', () => {
    const result = render(<CountryIcon countryCode="DE" />)

    expect(result.container.querySelector('svg')).toBeInTheDocument()
  })

  it('passes classname', () => {
    const myClassName = 'my-test-classname'
    const result = render(<CountryIcon className={myClassName} countryCode="CH" />)

    expect(result.container.querySelector('img')).toHaveAttribute('src', '')
  })

})
