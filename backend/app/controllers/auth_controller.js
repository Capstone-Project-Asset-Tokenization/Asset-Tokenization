import {
  RegistrationValidatorSchema,
  LoginRegistratinValidatorSchema,
} from "../config/validation/auth_validation.js";
import User from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const RegisterController = async (req, res) => {
  try {
    const { error, value } = RegistrationValidatorSchema.validate(req.body);
    const { fullName, email, password, legalIdNo, walletId } = req.body;

    if (error) return res.status(400).send(error.details[0].message);

    const userExist = await User.findOne({ email: email });
    if (userExist) return res.status(400).send("User already exist");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = (await bcrypt.hash(password, salt)).toString();

    const user = new User({
      fullName: fullName,
      email: email,
      password: hashedPassword,
      legalIdNo: legalIdNo,
      walletId: walletId,
    });

    const result = await user.save(user);
    res.json({user:result});
  } catch (error) {
    res.json({error:error.message});
  }
};

export const LoginController = async (req, res) => {
  try {
    const { error, value } = LoginRegistratinValidatorSchema.validate(req.body);
    const { email, password } = req.body;

    if (error) return res.status(400).send(error.details[0].message);
    if (!email) return res.status(400).send("Email or password is required");

    const user = await User.findOne({ email: email });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid password");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "160h",
    });
    console.log(token);
    res.header("Autorization", `Bearer ${token}`).json({token:token,walletAddress:user.walletId});
  } catch (error) {
    res.json({error:error.message});
  }
};
