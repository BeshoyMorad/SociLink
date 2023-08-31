import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findById(id);

    if (!user) return res.status(404).json({ error: "User not found" });

    user = user.toObject();
    delete user.password;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("friends");

    if (!user) return res.status(404).json({ error: "User not found" });

    const formatedFriends = user.friends.map((friend) => {
      return {
        _id: friend._id,
        firstName: friend.firstName,
        lastName: friend.lastName,
        occupation: friend.occupation,
        location: friend.location,
        picturePath: friend.picturePath,
      };
    });

    res.status(200).json(formatedFriends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const { add } = req.body;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend)
      return res.status(404).json({ error: "User not found" });

    if (add) {
      user.friends.push(friend._id);
      friend.friends.push(user._id);
    } else {
      // Remove the friend from user.friends
      user.friends = user.friends.filter((_id) => _id.toString() !== friendId);
      // Remove the user from friend.friends
      friend.friends = friend.friends.filter((_id) => _id.toString() !== id);
    }

    await user.save();
    await friend.save();

    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
