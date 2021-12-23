const { TwitterApi } = require('twitter-api-v2');
module.exports = class API {
    constructor() {
        let apiData = require('./apiData.json');
        this.client = new TwitterApi({
            appKey: apiData.apiKey,
            appSecret: apiData.apiKeySecret,
            accessToken: apiData.accessToken,
            accessSecret: apiData.accessTokenSecret,
        }).readWrite;
    }

    async getTweet(id) {
        return this.client.v2.singleTweet(id)
    }

    async getMostRecentTweet(username) {
        return this.getUser(username).then(userData => {
            let id = userData.data.id;
            return this.client.v2.userTimeline(id, {
                exclude: 'replies', expansions: [
                    'attachments.poll_ids'
                ]
            }).then(tweetData => {
                if (!tweetData._realData.data) return null;
                const val = tweetData._realData.data[0];
                Object.keys(tweetData.includes).forEach(element => {
                    val[element] = tweetData.includes[element][0];
                });
                return val;
            });
        });
    }

    async getUser(username) {
        return this.client.v2.userByUsername(username);
    }

    async createPoll(message, options, time) {
        const { data: createdTweet } = await this.client.v2.tweet(message, {
            poll: { duration_minutes: time, options: options },
        });
    }
}