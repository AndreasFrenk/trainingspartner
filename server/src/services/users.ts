import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User, { IUser } from '../models/users.js'

async function authenticate({ username, password }: IUser) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ sub: user.id }, process.env.SECRET!, { expiresIn: '1d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}


async function getAll() {
    return await User.find();
}

async function getById(id: String) {
    return await User.findById(id);
}

async function create(userParam: IUser) {
    // validate
    //TODO: two different throws
    if (await User.findOne({$or: [{username: userParam.username}, {email: userParam.email}] })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(id: String, userParam: IUser) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.password = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function updateProfile(id: String, userParam: IUser) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    
    // copy userParam properties to user
    Object.assign(user.profile, userParam.profile);

    await user.save();
}

async function updateImage(id: String, imgURL: String ) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';

    let userParam;
    if(imgURL) {
        userParam = {...user, profileImage: imgURL}
    }
    else {
        throw 'Image not uploaded';
    }

    Object.assign(user, userParam);

    await user.save();

    return user
}

async function remove(id: String) {  
    await User.findByIdAndRemove(id);
}

async function findNearBy(id: String) { 
    const user = await User.findById(id);
    const userLocation = user?.profile.location.loc.coordinates;
    const nearByUsers = await User.find({
        "profile.location.loc": { $nearSphere: { $geometry: { type: "Point", coordinates: userLocation }, $maxDistance: 50000 }  },
        _id: { $ne: id }
    });
    
    return nearByUsers
}

export {
    authenticate,
    getAll,
    getById,
    create,
    update,
    updateImage,
    updateProfile,
    remove,
    findNearBy
}