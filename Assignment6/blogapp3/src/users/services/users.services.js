import User from '../../DataBase/Models/users.model.js';

// signupService
export const signupService = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const isEmailExist = await User.findOne({ where: { email } })
        if (isEmailExist) return res.status(409).json({ message: 'Email Already Exist' })
        // const newUser = await User.create({name, email, password, role})
        const newUser = await User.build({ name, email, password, role })
        await newUser.save()
        res.status(201).json({ message: 'User Added Successfully', data: newUser });
    } catch (error) {
        return res
            .status(500)
            .json({ message: 'Internal Server Error From signupService', error: error.message });
    }
};

// updateService with upsert
// export const updateService_upsert = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await User.upsert(
//             {
//                 id,
//                 ...req.body
//             },
//             {
//                 validate: false   // ⬅ skip validation (REQUIRED)
//             }
//         );

//         return res.status(200).json({
//             message: "User created or updated successfully"
//         });

//     } catch (error) {
//         return res.status(500).json({
//             message: "Internal Server Error From updateService",
//             error: error.message
//         });
//     }
// };

// updateService
export const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;

        const user = await User.findByPk(id);

        if (user) {
            if (email && email !== user.email) {
                const isEmailExist = await User.findOne({ where: { email } });
                if (isEmailExist) {
                    return res.status(409).json({ message: 'Email Already Exist' });
                }
            }

            if (name) user.name = name;
            if (email) user.email = email;
            if (password) user.password = password;
            if (role) user.role = role;

            await user.save({ validate: false });

            return res.status(200).json({
                message: 'User Updated Successfully',
                data: user
            });
        }

        if (email) {
            const isEmailExist = await User.findOne({ where: { email } });
            if (isEmailExist) {
                return res.status(409).json({ message: 'Email Already Exist' });
            }
        }
        const newUser = await User.create({
            id,
            name,
            email,
            password,
            role
        }, { validate: false }); // Skip validation for new user creation
        return res.status(201).json({
            message: 'User Added Successfully',
            data: newUser
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error From updateService',
            error: error.message,
            stack: error.stack
        });
    }
};

// findByEmailService
export const findByEmailService = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await User.findOne({ where: { email } });
        if (!user)
            return res.status(404).json({ message: 'User Not Exist' });
        res.status(201).json({ message: 'User Found', data: user });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error From updateService',
            error: error.message,
        });
    }
};

// findById
export const findByIdService = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: { exclude: ['role'] }
        });

        if (!user) {
            return res.status(404).json({ message: 'User Not Exist' });
        }
        res.status(200).json({ message: 'User Found', data: user });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server Error From updateService',
            error: error.message,
        });
    }
};