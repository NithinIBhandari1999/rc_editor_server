const FormatResponse = require('response-format');

// Models
const modelUser = require('../../../../models/user/modelUser');

const getAuthState = async (userType, userInfo) => {
    const authState = {
        statusIsLoggedIn: 'true',
        userType: userType,
        statusEmailVerified: userInfo.statusEmailVerified,

        userId: userInfo._id,
        userFullName: userInfo.name,
        userEmail: userInfo.email,
    };

    return authState;
};

exports.validateSession = async (req, res) => {
    try {
        const payload = req.payload;

        const resultUserInfo = await modelUser.findOne({
            _id: payload.userId,
        });

        if (!resultUserInfo) {
            return res.status(400).json(FormatResponse.badRequest('Account does not exist.', {}));
        }

        const authState = await getAuthState('user', resultUserInfo);

        return res.status(200).json(
            FormatResponse.success('Success', {
                authState: authState,
            })
        );
    } catch (error) {
        return res.status(400).json(FormatResponse.badRequest(error.message, {}));
    }
};

exports.getAuthStatus = getAuthState;