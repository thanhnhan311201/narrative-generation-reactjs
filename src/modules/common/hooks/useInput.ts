import { useCallback, useReducer, useEffect, useRef, useState } from 'react';

const emailRegex = /^\w+([.]?\w+)*@\w+([.]?\w+)*(\.\w{2,3})+$/;

export enum ValidationType {
	IS_EMAIL_VALID = 'IS_EMAIL_VALID',
	REQUIRED = 'REQUIRED',
	IS_PASSWORD_VALID = 'IS_PASSWORD_VALID',
	IS_PASSWORD_MATCH = 'IS_PASSWORD_MATCH',
}

enum InputActionType {
	INPUT = 'INPUT',
	VALIDATE = 'VALIDATE',
	RESET = 'RESET',
	BLUR = 'BLUR',
}

type validationOption = {
	password?: string;
	isCheckEmailExist?: boolean;
	maxLength?: number;
};

interface IAction {
	type: InputActionType;
	payload: string;
}

interface IState {
	value: string;
	isValidated: boolean;
	isTouched: boolean;
}

const initialState: IState = {
	value: '',
	isValidated: false,
	isTouched: false,
};

const inputStateReducer = (state: IState, action: IAction) => {
	switch (action.type) {
		case InputActionType.INPUT:
			return { value: action.payload, isTouched: true, isValidated: false };
		case InputActionType.VALIDATE:
			return { ...state, isTouched: true, isValidated: true };
		case InputActionType.BLUR:
			return { ...state, isTouched: true };
		case InputActionType.RESET:
			return { value: '', isValidated: false, isTouched: false };
		default:
			return state;
	}
};

const validateValue = (
	validateType: ValidationType,
	value: string,
	value2?: string,
): { isValid: boolean; error: string | undefined } => {
	switch (validateType) {
		case ValidationType.REQUIRED:
			if (!value.trim()) {
				return { isValid: false, error: 'Please fill out this field.' };
			}
			return { isValid: true, error: undefined };

		case ValidationType.IS_EMAIL_VALID: {
			const emailName = value.split('@')[0];
			if (!value.trim()) {
				return { isValid: false, error: 'Sorry, email must not be empty.' };
			} else if (!value.includes('@')) {
				return {
					isValid: false,
					error: "Sorry, your email must include '@'.",
				};
			} else if (value.length < 6 || value.length > 30) {
				return {
					isValid: false,
					error:
						'Sorry, your username must be between 6 and 30 characters long.',
				};
			} else if (/^\d+$/.test(emailName)) {
				return {
					isValid: false,
					error:
						'Sorry, your username must include at least one alphabetical character (a-z).',
				};
			} else if (
				emailName[0] === '.' ||
				emailName[emailName.length - 1] === '.'
			) {
				return {
					isValid: false,
					error:
						'Sorry, the first character or the last character of your username must be an ascii letter (a-z) or number (0-9).',
				};
			} else if (!emailRegex.test(value)) {
				return {
					isValid: false,
					error:
						'Sorry, please enter a valid email. Only letters (a-z), number (0-9), underscore (_) and periods (.)  are allowed.',
				};
			}

			return { isValid: true, error: undefined };
		}
		case ValidationType.IS_PASSWORD_VALID:
			if (!value.trim()) {
				return {
					isValid: false,
					error: 'Sorry, password must not be empty.',
				};
			} else if (value.length < 8) {
				return {
					isValid: false,
					error: 'Sorry, your password must be at least 8 characters long.',
				};
			} else if (!/^[A-Z]+$/.test(value[0])) {
				return {
					isValid: false,
					error:
						'Sorry, password should start with the uppercase alphabet character (A-Z).',
				};
			}
			return { isValid: true, error: undefined };

		case ValidationType.IS_PASSWORD_MATCH:
			if (!value.trim()) {
				return {
					isValid: false,
					error: 'Sorry, password must not be empty.',
				};
			} else if (value.length < 8) {
				return {
					isValid: false,
					error: 'Sorry, your password must be at least 8 characters long.',
				};
			} else if (!/^[A-Z]+$/.test(value[0])) {
				return {
					isValid: false,
					error:
						'Sorry, password should start with the uppercase alphabet character (A-Z).',
				};
			} else if (value !== value2) {
				return {
					isValid: false,
					error:
						'Sorry, your password and confirmation password must be matched.',
				};
			}
			return { isValid: true, error: undefined };

		default:
			return { isValid: true, error: undefined };
	}
};

const useInput = (validateType: ValidationType, option?: validationOption) => {
	const [inputState, dispatch] = useReducer(inputStateReducer, initialState);
	const [valResult, setValResult] = useState<{
		isValid: boolean;
		error: string | undefined;
	}>({ isValid: false, error: 'This field must not be emty.' });

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		let inputTimer: NodeJS.Timeout;
		if (inputState.isTouched && !inputState.isValidated) {
			inputTimer = setTimeout(() => {
				dispatch({ type: InputActionType.VALIDATE, payload: '' });
			}, 1000);
		}

		return () => clearTimeout(inputTimer);
	}, [inputState.value, inputState.isTouched, inputState.isValidated]);

	useEffect(() => {
		const res = validateValue(validateType, inputState.value, option?.password);
		setValResult(res);
	}, [inputState.value, validateType, option?.password]);

	const handleValueChange = useCallback(
		(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
			dispatch({ type: InputActionType.INPUT, payload: event.target.value });
		},
		[],
	);

	const handleInputBlur = useCallback(
		() => dispatch({ type: InputActionType.BLUR, payload: '' }),
		[],
	);

	const setIsTouched = useCallback(() => {
		dispatch({ type: InputActionType.VALIDATE, payload: '' });
	}, []);

	const resetValue = useCallback(() => {
		dispatch({ type: InputActionType.RESET, payload: '' });
	}, []);

	return {
		value: inputState.value,
		inputRef,
		isValid: valResult.isValid,
		isTouched: inputState.isTouched,
		errMessage: inputState.isTouched
			? inputState.isValidated
				? valResult.error
				: undefined
			: undefined,
		handleValueChange,
		handleInputBlur,
		setIsTouched,
		resetValue,
	};
};

export default useInput;

export interface IUserInputResult {
	value: string;
	inputRef: React.RefObject<HTMLDivElement>;
	isValid: boolean;
	errMessage: string | undefined;
	handleValueChange: (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => void;
	handleInputBlur: (event: React.FocusEvent<HTMLElement>) => void;
	setIsTouched: () => void;
	resetValue: () => void;
}
