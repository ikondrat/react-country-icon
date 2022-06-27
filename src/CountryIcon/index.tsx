import { styled } from '@material-ui/core'
import Icon from '@material-ui/core/Icon';
import { FC } from 'react'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

export const testId = 'country-icon'
const generateClassName = createGenerateClassName({
  productionPrefix: 'jss-react-country-icon',
});

const StyledImg = styled('img')({
  verticalAlign: 'middle',
  width: '24px',
  height: '16px',
})

const StyledImgQuadractic = styled('img')({
  verticalAlign: 'middle',
  width: '24px',
  height: '16px',
})

interface CountryIconProps {
  countryCode: string
  className?: string
}

export const CountryIcon: FC<CountryIconProps> = ({ countryCode, className }) => {
  const isQuadratic = countryCode === 'CH' || countryCode === 'VA'
  const svgURL = `//unpkg.com/react-country-icon@${process.env.REACT_PACKAGE_VERSION}/dist/icons/${isQuadratic ? 'flags_1x1' : 'flags_4x3'}/${countryCode.toLowerCase()}.svg`
  return (
    <StylesProvider generateClassName={generateClassName}>
      <Icon>
        {/* @ts-ignore */}
        {!isQuadratic && <StyledImg className={className} src={svgURL} alt=""/>}
        {isQuadratic && <StyledImgQuadractic className={className} src={svgURL} alt=""/>}
      </Icon>
    </StylesProvider>
  )


}
