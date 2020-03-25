import styled from 'styled-components';
import { padding } from '../../styles/base';
export const Row = styled.View`
	flex-direction: row;
`;

export const ContentOffset = styled.View`
	padding: ${padding.screen}px;
	background-color: ${props => props.theme.colors.background};
`;
export const EndContent = styled(Row)`
	justify-content: flex-end;
`;
export const Wrapper = styled.View`
	flex: 1;
	background-color: ${props => props.theme.colors.background};
`;

export const FormRow = styled(Row)`
	margin-bottom: ${padding.medium}px;
	align-items: center;
`;
