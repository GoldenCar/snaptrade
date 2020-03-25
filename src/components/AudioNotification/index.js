import { Audio } from 'expo';
const soundObject = new Audio.Sound();

class AudioNotification {
	constructor() {
		this.isPlayed = false;
	}

	async play() {
		try {
			if (this.isPlayed) {
				await soundObject.replayAsync();
			} else {
				await soundObject.loadAsync(
					require('../../../assets/audio/notification.mp3')
				);
				await soundObject.playAsync();
				this.isPlayed = true
			}

		} catch (error) {
			console.log('Play audio error')
		}

	}
}

const audioNotification = new AudioNotification();

export default audioNotification;
