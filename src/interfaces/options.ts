import { CognigyError, IOutput } from "@cognigy/cognigy-client";

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

	handleError?: (error: CognigyError) => void;
	handleException?: (error: CognigyError) => void;
	handleOutput?: (output: IOutput) => void;
};