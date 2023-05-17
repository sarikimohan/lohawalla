type FormState<T> = T & {
	validation: boolean;
	triggerSubmit: boolean;
	validationCount: boolean;
};
