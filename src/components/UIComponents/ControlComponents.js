import { colors, padding } from '../../styles/base';
import styled from 'styled-components';


export const Divider = styled.View`
	height: 1px;
	width: 100%;
	background-color: ${props => props.theme.colors.line};
	margin: ${padding.chubby}px 0;
`;
