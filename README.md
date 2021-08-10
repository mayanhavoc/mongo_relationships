# Mongo relationships

## One to few
#### Embed the data directly in the document
```Javascript
{
    name: 'Tommy Cash', 
    savedAddresses: [
        { street: 'Rahukohtu 3', city: 'Tallin', country: 'Estonia'},
        { street:: 'Ravala 5', city: 'Tallin', country: 'Estonia'}
    ]
}
```
More than one address assigned to a single user (e.g. Amazon). In most cases, it makes sense to embed the address data inside of the user, but it really depends on how we are using the data. Are we using address data on its own? Or is it more likely that it will be associated with a user anyhow? In that case, the above example is a good approach. 

## One to many
One option is to store your data separately, but then store references to document ID's somewhere inside the parent: 
```Javascript
{
    farmName: 'Full Belly Farms',
    location: 'GUinda, CA', 
    produce: [
        ObjectID('2819781267781'),
        ObjectID('1828678675667'),
        ObjectID('8187777772313'),
    ]
}
```

## One to "bajillions"
With thousands or more documents, it's more efficient to store a reference to the parent on the child document.
```Javascript
{
    tweetText: 'lol I just crashed my car because I was tweeting',
    tags: ['stupid', 'moron', 'yolo'],
    user: ObjectId('129841243'),
}
```


When is it better to store the reference `ref`? In the parent or the child? Or both? There are a lot of different options and they will depend on what we are doing. 

## 6 rules of thumb for mongoDB schema design
**ONE** 
Favor embedding unless there is a compelling reason not to.
**TWO**
Needing to access an object on its own is a compelling reason not to embed it.
**THREE**
Arrays should not grow without bound. If there are more than a couple of hundred documents on the "many" side, don't embed them; if there are more than a few thousand documents on the "many" side, don't use an array of ObjectID references. High cardinality arrays are a compelling reason not to embed.
**FOUR**
Don't be afraid of application-level joins; if you index correctly and use the projection specifier, then application-level joins are barely more expensive than server-side joins in a relational database.
**FIVE**
Consider the write/read ratio when de-normalizing. A field that will mostly be read and only seldom updated is a good candidate for de-normalization. If you de-normalize a field that is updated frequently then the extra work of finding and updating all the instances is likely the overwhelm the savings that you get from de-normalizing.
**SIX**
As always with MongoDB, how you model your data depends on your particular application's data access patterns. You want to structure your data to match the ways that your application queries and updates it. 

- [6 rules of thumb for mongodb schema design](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1)
- [6 rules of thumb for mongodb schema design](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-2)
- [6 rules of thumb for mongodb schema design](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-3)