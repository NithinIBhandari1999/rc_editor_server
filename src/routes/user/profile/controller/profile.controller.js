const FormatResponse = require('response-format');

// Models
const modelUser = require('../../../../models/user/modelUser');

exports.getUserProfile = async (req, res) => {
    try {
        const payload = req.payload;

        const resultUserInfo = await modelUser.findOne({
            _id: payload.userId,
        });

        if (!resultUserInfo) {
            return res.status(400).json(FormatResponse.badRequest('Account does not exist.', {}));
        }
        
        return res.status(200).json(
            FormatResponse.success('Success', {
                result: resultUserInfo,
            })
        );
    } catch (error) {
        console.error(error);
        return res.status(400).json(FormatResponse.badRequest(error.message, {}));
    }
};