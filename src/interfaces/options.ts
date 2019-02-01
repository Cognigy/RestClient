import { IOutput } from "./output"

export interface OptionsREST {
	/** URL of REST Endpoint */
	url: string;

	/** User ID of the corresponding Contact Profile */
	userId: string;

	/* The current session for this user. Used to generate unique sessions for a user on each new "connect" */
	sessionId: string;

	/** The identifier of the channel on which the client runs */
	channel: string;

	keepMarkup?: boolean;

	handleError?: (error: string) => void;
	handleOutput?: (output: IOutput) => void;
};