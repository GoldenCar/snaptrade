import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import {
	fonts,
	colors,
	padding,
	spacingOrSizingScale
} from '../../styles/base';
import { Row } from '../../components/UIComponents/MainComponents';

export default StyleSheet.create({
	wrapper: {
		width: '100%',
		flex: 1
	},
	wrapperContent: {
		paddingHorizontal: spacingOrSizingScale._48,
		justifyContent: 'center',
		alignSelf: 'stretch'
	},
	titleWrapper: {
		marginVertical: padding.chubby
	},
	inputWrapper: {
		marginVertical: padding.xlarge
	},
	title: {
		fontSize: fonts.large_title,
		marginVertical: padding.xlarge,
		color: colors.gray
	}
});

const AuthWrapper = styled.View`
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
`;

const AuthContent = styled.View`
	width: 240px;
`;

const AuthLinkText = styled.Text`
	width: 100%;
	text-align: center;
	font-size: 13px;
	color: ${colors.purple};
	font-family: 'notoSansMedium';
`;

const LogoWrapper = styled(Row)`
	margin: 70px auto;
	justify-content: center;
`;

export const AuthComponents = {
	AuthWrapper,
	AuthContent,
	AuthLinkText,
	LogoWrapper
};
