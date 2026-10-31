const UPSTREAM_URL = 'https://vitalik.eth.limo/feed.xml';
const OLD_HOST = 'https://vitalik.ca';
const NEW_HOST = 'https://vitalik.eth.limo';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const response = await fetch(UPSTREAM_URL);
		const text = await response.text();
		const rewrittenText = text.replaceAll(OLD_HOST, NEW_HOST);

		const headers = new Headers(response.headers);
		headers.set('access-control-allow-origin', '*');

		return new Response(rewrittenText, {
			status: response.status,
			statusText: response.statusText,
			headers: headers,
		});
	},
} satisfies ExportedHandler;
