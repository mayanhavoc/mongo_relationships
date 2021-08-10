const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
    console.log('Mongo connection open')
})
.catch((err)=> {
    console.log('Connection error')
    console.dir(err)
})


const userSchema = new Schema({
    username: String,
    age: Number,
});

const tweetSchema = new Schema  ({
    text: String,
    likes: Number, 
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () => {
//     // const user = new User({ username: 'Chickenfan', age: 61 });
//     const user = await User.findOne({ username: 'Chickenfan' });
//     const tweetOne = new Tweet ({ text: 'OMG I love my chickens', likes: 9 });
//     const tweetTwo = new Tweet ({ text: 'bock bock bock my chickens make noises', likes: 200 });
//     tweetTwo.user = user;
//     tweetTwo.save();
// }

// makeTweets();

const findTweet = async () => {
     const t = await Tweet.findOne({}).populate('user', 'username');
     console.log(t)
}

findTweet()