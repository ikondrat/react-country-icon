import { render } from '@testing-library/react'
import { InitAnalytics } from '.'
import * as gdprContext from '../../contexts/GdprContext'

describe('InitAnalytics', () => {
  const setup = () => render(<InitAnalytics />)

  let prevAnalytics: any

  beforeEach(() => {
    prevAnalytics = window.analytics
    // @ts-ignore
    window.analytics = {
      load: jest.fn(),
    }
  })

  afterEach(() => {
    window.analytics = prevAnalytics
  })

  it('calls init for accepted consent', () => {
    jest.spyOn(gdprContext, 'useGdpr').mockReturnValue({ isAccepted: true })
    setup()

    expect(window.analytics.load).toHaveBeenCalled()
  })

  it('does not call init for rejected consent', () => {
    jest.spyOn(gdprContext, 'useGdpr').mockReturnValue({ isAccepted: false })

    expect(window.analytics.load).not.toHaveBeenCalled()
  })
})
