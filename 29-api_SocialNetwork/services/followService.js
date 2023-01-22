//IMPORTAR MODELOS:
const Follow = require('../models/followModel');

const followUserIds = async( userIdentityId ) => {
    
        // Sacar info seguimiento
        let following = await Follow.find({ "user": userIdentityId })
            .select({ "followed": 1, "_id": 0 })
            .exec();

        let followers = await Follow.find({ "followed": userIdentityId })
            .select({ "user": 1, "_id": 0 })
            .exec();

        // Procesar array de identificadores
        let followingClean = [];

        following.forEach(follow => {
            followingClean.push(follow.followed);
        });

        let followersClean = [];

        followers.forEach(follow => {
            followersClean.push(follow.user);
        });

        return {
            following: followingClean,
            followers: followersClean
        }
    
}

const followThisUser = async( userIdentityId, profileUserId ) => {
    // Sacar info seguimiento
    let following = await Follow.findOne({ 
        "user": userIdentityId, 
        "followed":profileUserId 
    })
    //.select({ "followed": 1, "_id": 0 })
    .exec();

    let followers = await Follow.findOne({ 
        "user": profileUserId, 
        "followed": userIdentityId 
    })
    //.select({ "user": 1, "_id": 0 })
    .exec();
    
    return {
        following,
        followers
    }
}


module.exports = {
    followUserIds,
    followThisUser
}