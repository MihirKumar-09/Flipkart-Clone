import Address from "../models/addressModel.js";
// =========FETCH ALL ADDRESS=======
export const allAddress = async (req, res, next) => {
  try {
    const allAddress = await Address.find({ user: req.session.userId });
    res.json({
      success: true,
      allAddress,
    });
  } catch (err) {
    next(err);
  }
};

// ========SAVE ADDRESS========
export const saveAddress = async (req, res, next) => {
  try {
    const address = await Address.create({
      ...req.body,
      user: req.session.userId,
    });

    res.json({
      success: true,
      address,
    });
  } catch (err) {
    next(err);
  }
};
