import { makeStyles } from '@material-ui/core'
import { FC } from 'react'
import classnames from 'classnames'

import * as iconsQuadratic from './flags_1x1'
import * as iconsNormal from './flags_4x3'

export const testId = 'country-icon'

const useStyles = makeStyles({
  imageIcon: {
    verticalAlign: 'middle',
    width: '24px',
    height: '16px',
  },
  imageIconQuadraric: {
    width: '16px',
    height: '16px',
  },
})

export type CountryIconCode = keyof typeof iconsNormal

interface CountryIconProps {
  countryCode: CountryIconCode
  className?: string
  svgProps?: React.SVGProps<SVGSVGElement>
}

export const CountryIcon: FC<CountryIconProps> = ({ countryCode, className, svgProps }) => {
  const isQuadratic = countryCode === 'CH' || countryCode === 'VA'
  const classes = useStyles()
  const norm = iconsNormal as unknown as Record<string, any>
  const icons = iconsQuadratic as unknown as Record<string, any>
  const Component: any = isQuadratic ? icons[countryCode] : norm[countryCode]
  return (
    <Component
      {...svgProps}
      className={classnames(classes.imageIcon, className, {
        [classes.imageIconQuadraric]: isQuadratic,
      })}
    />
  )
}
