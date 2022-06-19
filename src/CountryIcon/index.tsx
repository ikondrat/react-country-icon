import { makeStyles } from '@material-ui/core'
import Icon from '@material-ui/core/Icon';
import { FC } from 'react'
import classnames from 'classnames'

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

interface CountryIconProps {
  countryCode: string
  className?: string
  svgProps?: React.SVGProps<SVGSVGElement>
}

export const CountryIcon: FC<CountryIconProps> = ({ countryCode, className, svgProps }) => {
  const isQuadratic = countryCode === 'CH' || countryCode === 'VA'
  const classes = useStyles()

  return (
    <Icon>
      {/* @ts-ignore */}
      <img alt="" className={classnames(classes.imageIcon, className, {
        [classes.imageIconQuadraric]: isQuadratic,
      })} src={`//unpkg.com/react-country-icon@${process.env.npm_package_version}/dist/icons/${isQuadratic ? 'flags_1x1' : 'flags_4x3'}/${countryCode.toLowerCase()}.svg`}/>
    </Icon>
  )


}
