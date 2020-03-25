import { colors, fontWeights } from '../../styles/base';
import styled from 'styled-components';

export const Text = styled.Text`
	font-size: 13px;
	line-height: 16px;
	flex-wrap: wrap;
	color: ${props => props.color || props.theme.colors.text};
	font-family: notoSansRegular;
`;
export const TextBold = styled(Text)`
	font-family: notoSansBold;
`;

export const TextLight = styled(Text)`
	font-family: notoSansLight;
`;

export const SmallText = styled(Text)`
	font-size: 11px;
`;

export const SmallLight = styled(TextLight)`
	font-size: 11px;
`;

export const SmallBold = styled(TextBold)`
	font-size: 11px;
`;

export const Title = styled.Text`
	color: ${props => props.theme.colors.text};
	font-family: notoSansMedium;
	font-size: 18px;
	font-weight: ${fontWeights.bold};
`;

export const TitleBold = styled(Title)`
	font-family: notoSansBold;
`;

export const PriceText = styled(Text)`
	font-family: notoSansMedium;
	font-size: 18px;
	line-height: 18px;
	color: ${props => props.theme.colors.text};;
`;

export const PriceBigText = styled(PriceText)`
	font-size: 22px;
	line-height: 27px;
`;

export const TextTickerBig = styled.Text`
	font-family: notoSansBold;
	font-size: 17px;
	line-height: 19px;
	color: ${props => props.color || props.theme.colors.text};
`;
export const TextTickerExtraBig = styled(TextTickerBig)`
	line-height:28px;
	font-size: 25px;
`;
