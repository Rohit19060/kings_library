<script lang="ts">
	import { YouTubeIdType } from '$lib';
	import {
		addVideoToIndexDB,
		IS_PLAYLIST_MODAL_OPEN,
		IS_PLAYLIST_MODAL_TYPE,
		PLAYLIST_VIDEO_LIST,
		VIDEO_STORE
	} from '$lib/stores/VideoDB';
	import Button from '../Common/Button.svelte';
	import VideoDetails from './VideoDetails.svelte';

	let isLoading = false;

	function closeModal() {
		IS_PLAYLIST_MODAL_OPEN.set(false);
	}

	async function addAllVideos() {
		if (!PLAYLIST_VIDEO_LIST) {
			return;
		}
		try {
			isLoading = true;
			let videos: App.VideoIndexDB[] = [];
			for (let i = 0; i < $PLAYLIST_VIDEO_LIST.length; i++) {
				try {
					let x = await addVideoToIndexDB($PLAYLIST_VIDEO_LIST[i]);
					if (x) {
						videos.push(x);
					}
				} catch (e) {
					console.error('Error adding video to indexDB', e);
				}
			}
			PLAYLIST_VIDEO_LIST.set([]);
			VIDEO_STORE.update((x) => [...videos, ...x]);
			closeModal();
		} catch (e) {
			console.error('Error adding video to indexDB', e);
			return;
		} finally {
			isLoading = false;
		}
	}
</script>

{#if $IS_PLAYLIST_MODAL_OPEN}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
		<div class="relative w-full max-w-5xl max-h-screen overflow-hidden bg-white rounded-xl">
			<button
				on:click={closeModal}
				class="absolute p-1 rounded-full top-4 right-6 hover:bg-black hover:text-white"
			>
				<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
					<path
						d="M6.293 6.293a1 1 0 011.414 0L12 9.586l4.293-4.293a1 1 0 111.414 1.414L13.414 11l4.293 4.293a1 1 0 01-1.414 1.414L12 12.414l-4.293 4.293a1 1 0 01-1.414-1.414L10.586 13 6.293 8.707a1 1 0 010-1.414z"
					/>
				</svg>
			</button>
			<div
				class="p-6 max-h-[80vh] min-h-[80vh] overflow-y-auto flex flex-col items-center justify-start"
			>
				{#if $IS_PLAYLIST_MODAL_TYPE === YouTubeIdType.Playlist}
					<div class="flex items-center justify-between mb-4 min-w-96">
						<div></div>
						<h2 class="text-xl font-bold">Playlist Videos ({$PLAYLIST_VIDEO_LIST.length})</h2>
						<div class="flex items-center justify-center w-24">
							{#if isLoading}
								<div class="loader" />
							{:else}
								<Button label="Add&nbsp;Playlist" onclick={addAllVideos} />
							{/if}
						</div>
					</div>
				{:else}
					<div class="flex items-center justify-center mb-4 min-w-96">
						<h2 class="text-xl font-bold">Search Result</h2>
					</div>
				{/if}
				<!-- else content here -->
				{#each $PLAYLIST_VIDEO_LIST as video}
					<VideoDetails videoDetails={video} />
				{/each}
			</div>
		</div>
	</div>
{/if}
