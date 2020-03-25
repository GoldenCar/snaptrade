import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { SmallText } from '../UIComponents/TextComponents';
import { padding, colors } from '../../styles/base';

export type TTag = {
	scanner_link: string,
	tag: string,
	tag_category: string,
	tag_display: string
};

export type TTagComponent = TTag & {
	onTagPress: (tagProps: TTag) => void
};

class TagComponent extends React.PureComponent<TTagComponent> {
	static defaultProps = {
		onTagPress: (tagProps: TTag) => {
			console.log('Clicking by tag with props: ', tagProps);
		}
	};

	onTagPress = () => {
		const { onTagPress, ...props } = this.props;
		onTagPress(props);
	};
	render() {
		return (
			<TouchableOpacity onPress={this.onTagPress}>
				<TagWrapper>
					<SmallText color={colors.violet}>
						{this.props.tag_display}
					</SmallText>
				</TagWrapper>
			</TouchableOpacity>
		);
	}
}

const TagWrapper = styled.View`
	background-color: ${colors.violet_light};
	padding: ${padding.medium}px ${padding.large}px;
	border-radius: ${padding.xlarge}px;
	margin: 0 ${padding.chubby}px ${padding.chubby}px 0;
`;

export default TagComponent;
