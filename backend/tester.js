const path = require('path');

const apiImport = require(path.resolve("./index.js"));
const API = new apiImport();

const getTwitterData = function () {
    console.log("Grabbling oldest poll...")
    twitter.getMostRecentTweet('areNftsGood').then(data => {
        nftStatus=(data&&data.polls&&data.polls.options&&data.polls.options.length==2&&data.polls.options[0].votes*yesWeight>data.polls.options[1].votes*noWeight);
        twitter.createPoll("Are NFTs Good?"+hashtags, ["Yes", "No"], 1440);
        console.log("Tweeting new poll...");
    });
}