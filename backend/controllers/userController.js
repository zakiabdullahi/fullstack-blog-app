import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_Secret } from '../config/config.js'
export const registerUser = async (req, res) => {


    try {

        const { username, email, password } = req.body

        const ExistingUser = await User.findOne({

            $or: [
                { username: username.toLowerCase() },
                { email: email.toLowerCase() }
            ]

        })


        if (ExistingUser) {


            if (ExistingUser.email === email) {


                return res.status(400).json({ status: false, message: "email already existed" })
            } else if (ExistingUser.username === username) {
                return res.status(400).json({ status: false, message: "username already existed" })

            }
        } else {
            console.log('No user found with this email or username. You can proceed.');
        }




        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username: username.tolowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword
        })


        await user.save()

        return res.status(201).json({ status: true, message: user })





    } catch (error) {

        return res.status(500).send({ status: false, message: "unknown error" });

    }


}


export const login = async (req, res) => {

    const { username, password } = req.body


    const existingUser = await User.findOne({ username })

    if (!existingUser) {

        return res.status(400).send({ status: false, message: "Invalid username or password" })
    }

    const validPassword = await bcrypt.compare(password, existingUser.password)

    if (!validPassword) {
        return res.status(400).send({ status: false, message: "Invalid username or password" })
    }

    // jwt auth

    const token = jwt.sign({ _id: existingUser._id }, JWT_Secret)

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,  //7days
    })

    existingUser.password = undefined


    // status: true,
    // message: {
    //     _id: existingUser._id,
    //     username: existingUser.username,
    //     email: existingUser.email
    // }
    return res.status(200).send(existingUser)

}

export const getUserProfile = async (req, res) => {

    try {
        const user = await User.findById(req.user._id)

        user.password = undefined

        return res.status(200).send(user)

    } catch (err) {
        return res.status(400).send("unknown error");
    }

}

export const logout = (req, res) => {

    try {

        res.clearCookie("token")
        return res.status(200).send("success")
    } catch (err) {
        console.log(err)
        return res.status(400).send("unknown error")

    }
}
