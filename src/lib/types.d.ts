// global.d.ts
declare global {
	interface VideoIndexDB {
		id: string;
		title: string;
		description: string;
		durationSec: number;
		durationSecStr: string;
		channelTitle: string;
		channelId: string;
		categoryId: string;
		tags: string[];
		publishedAt: DateTime;
		publishedAtStr: string;
	}
	interface VideoJsonResponse {
		id: string;
		published_at: string;
		details: {
			id: string;
			snippet: {
				title: string;
				channelId: string;
				channelTitle: string;
				description: string;
				categoryId: string;
				tags: string[];
			},
			contentDetails: {
				duration: string;
			},
		},
	}

	interface YouTubeVideo {
		id: string;
		title: string;
		description: string;
		duration: string;
		channelTitle: string;
		channelId: string;
		categoryId: string;
		tags: string[];
		publishedAt: string;
	}

}

export { }; // Ensure this file is a module

