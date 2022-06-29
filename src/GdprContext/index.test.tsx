import { useGdpr, GdprProvider } from '.'
import { render } from '@testing-library/react'
import * as iubenda from '@crowdhouse/iubenda'

jest.mock('@crowdhouse/iubenda')

const textAccepted = 'consent was accepted'
const textRejected = 'consent was rejected'

const GdprTestComponent = () => {
  const { isAccepted } = useGdpr()

  return <div>{isAccepted ? textAccepted : textRejected}</div>
}

const init = (
  <GdprProvider>
    <GdprTestComponent />
  </GdprProvider>
)
const setup = () => render(init)

describe('GdprContext', () => {
  it('calls the iubenda init script', () => {
    jest.spyOn(iubenda, 'init')
    setup()

    expect(iubenda.init).toHaveBeenCalled()
  })

  it('does not call init from iubenda on rerender', () => {
    jest.spyOn(iubenda, 'init')
    const { rerender } = setup()
    rerender(init)

    expect(iubenda.init).toHaveBeenCalledTimes(1)
  })

  it('returns isAccepted: true', () => {
    // @ts-ignore
    jest.spyOn(iubenda, 'init').mockImplementation((props: any) => {
      if (props?.callback?.onConsentGiven) {
        props?.callback?.onConsentGiven()
      }
    })

    const { queryByText } = setup()

    expect(queryByText(textAccepted)).toBeInTheDocument()
    expect(queryByText(textRejected)).not.toBeInTheDocument()
  })

  it('returns isAccepted:false', () => {
    // @ts-ignore
    jest.spyOn(iubenda, 'init').mockImplementation((props: any) => {
      if (props?.callback?.onConsentRejected) {
        props?.callback?.onConsentRejected()
      }
    })

    const { queryByText } = setup()

    expect(queryByText(textAccepted)).not.toBeInTheDocument()
    expect(queryByText(textRejected)).toBeInTheDocument()
  })
})
