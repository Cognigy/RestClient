import { OptionsREST } from "./interfaces/options";
import { IOutput } from "./interfaces/output";
import "request";


/**
 * Class that exposes methods to easily connect to the cognigy CAI-server,
 * send events to the brain and received processed input-text.
 */
export class CognigyRESTClient {
	protected options: OptionsREST;
	private lastUsed: number;
	public endSess: number;

	/**
	 * Creates an instance of the CognigyRESTClient.
	 * 
	 * @param {OptionsREST} options - The options the cognigy client should be initialized with.
	 * @memberOf CognigyRESTClient
	 */
	constructor(options: OptionsREST) {
		this.options = options;
		this.endSess = 0;

		if (options.keepMarkup === undefined)
			this.options.keepMarkup = false;

	}

	/**
	 * Sends a message to the realtime endpoint, which retrieves
	 * the configured endpoint and sends the message to AI.
	 *
	 * @param {string} text - The text of your message you want to send.
	 * @param {any} data - The data you want to send.
	 * @memberOf CognigyClient
	 */
	public sendMessage(text?: string, data?: any) {

		this.updateLastUsed();

		const payload = {
			userId: this.options.userId,
			sessionId: this.options.sessionId,
			text, 
			data
		};

		const options = this.options;
		let request = require('request');
		request({
			url: this.options.url,
			method: "POST",
			json: true,   
			body: payload
		}, function (error, response, body){
			if (error) {
				console.log(error);
			} else {
				//console.log(response);
				// the REST endpoint writes errors in the body
				//console.log(body);
				if (body && body.text) {

					let output: IOutput;
					output = body;
					if (!options.keepMarkup) {
						output.text = (output && output.text && typeof output.text === "string") ? output.text.replace(/<[^>]*>/g, "") : output.text;
					}

					options.handleOutput ? options.handleOutput(output) : console.log("Text: " + body.text + " Data: " + JSON.stringify(output.data));				}

			}
		});
	}

	private updateLastUsed(): void {
		this.lastUsed = Date.now();
	}

	
}