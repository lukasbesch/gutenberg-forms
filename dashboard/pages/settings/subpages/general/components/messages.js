import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { map, clone, set } from 'lodash';
import { TextControl } from '@wordpress/components';
import { updateSettings } from '../../../../../redux/actions/generalSettings/updateSettings';

function Messages(props) {
	const [state, setState] = useState({
		messages: props.generalSettings.messages,
	});

	const handleChange = (value, field_name) => {
		const newMessages = clone(state.messages);

		set(newMessages, field_name, value);

		setState({
			messages: newMessages,
		});

		props.updateSettings({
			messages: newMessages,
		});
	};

	return (
		<div className="cwp_general_settings_messages">
			<h1>Messages</h1>
			<p>You can edit messages used in various situations here.</p>
			<div className="fields">
				{map(state.messages, (field, field_name) => {
					const { label, value } = field;

					return (
						<TextControl
							onChange={(v) => {
								const newValue = {
									...field,
									value: v,
								};

								handleChange(newValue, field_name);
							}}
							label={label}
							value={value}
							key={label}
						/>
					);
				})}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	const { generalSettings } = state;

	return {
		generalSettings,
	};
};

const mapDispatchToProps = {
	updateSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages); // connecting to the redux-store
