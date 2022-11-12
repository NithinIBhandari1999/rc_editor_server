
const FormatResponse = require('response-format');

require('../../../../config/firebaseConfig');
const { getAuth } = require('firebase-admin/auth');

const { generateUserJwtToken } = require('../../../../utils/jwtFunction');

const { setTokenCookie } = require('../../../../utils/commonFunction');

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

const getUserInfo = async (userToken) => {
    try {
        const userInfo = await getAuth().verifyIdToken(userToken);
        console.log(userInfo);


        if (userInfo.firebase.sign_in_provider !== 'google.com') {
            return null;
        }

        return userInfo;

    } catch (error) {
        console.error(error);
        return '';
    }
};

exports.firebaseLogin = async (req, res) => {
    try {
        const { firebaseToken } = req.body;

        let resultUserInfo = null;

        let userInfo = await getUserInfo(firebaseToken);

        if (!userInfo) {
            return res.status(200).json(
                FormatResponse.success('Unexpected Error. Please sign in again', {

                })
            );
        }

        let insert = {
            name: userInfo.name,
            email: userInfo.email,
            statusEmailVerified: 'true'
        };

        resultUserInfo = await modelUser.findOne({
            email: insert.email,
        });

        if (!resultUserInfo) {
            resultUserInfo = await modelUser.create(insert);
        }

        let jwtToken = '';
        jwtToken = await generateUserJwtToken(resultUserInfo._id, 'user');
        setTokenCookie(res, jwtToken);

        const authState = await getAuthState('user', resultUserInfo);

        return res.status(200).json(
            FormatResponse.success('Login Successfully', {
                authState,
            })
        );

    } catch (error) {
        console.error(error);
        return res.status(400).json(FormatResponse.badRequest(error.message, {}));
    }
};

exports.logout = async (req, res) => {
    try {
        setTokenCookie(res, '');
        return res.status(200).json(FormatResponse.success('Logout Successful.', {}));
    } catch (error) {
        return res.status(400).json(FormatResponse.badRequest('Unexpected Error while performing Logout Action', {}));
    }
};

exports.getAuthState = getAuthState;