import styled from 'styled-components';
import { spacingOrSizingScale } from '../../styles/base';


export const Icon = styled.Image`
	width: ${spacingOrSizingScale._24}px;
	height: ${spacingOrSizingScale._24}px;
`
export const IconSmall = styled(Icon)`
	width: ${spacingOrSizingScale._16}px;
	height: ${spacingOrSizingScale._16}px;
`
export const IconBig = styled(Icon)`
	width: ${spacingOrSizingScale._32}px;
	height: ${spacingOrSizingScale._32}px;
`