const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/relationshipDemo', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
    console.log('Mongo connection open')
})
.catch((err)=> {
    console.log('Connection error')
    console.dir(err)
})

const userSchema = new mongoose.Schema({
    first: String,
    last: String,
    address: [
        {
            // if you don't want the id for the address
            _id: { id: false},
            street: String,
            city: String,
            state: String,
            country: String,
        }
    ],
})

const User = mongoose.model('User', userSchema);

const makeUser = async () => {
    const u = new User({
        first: 'Harry', 
        last: 'Potter', 
    })
    u.address.push({
        street: '123 Sesame St', 
        city: 'New York', 
        state: 'New York',
        country: 'USA',
    })
    const res = await u.save()
    console.log(res)
}

const addAddress = async(id) => {
    const user = await User.findById(id);
    console.log(user)
    user.address.push(
        {
            street: '99 3rd St',
            city: 'New York', 
            state: 'NY', 
            country: 'USA'
        }
    )
    const res = await user.save()
}

makeUser()

addAddress("61101d603c0feb2154795ee1")