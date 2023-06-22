/**
 * @description get a json with the http status code, a message and input
 * @param {Number} statusCode Number type
 * @param {Any} message any type
 * @returns a json for the lambda response
 */
const bodyResponse = async (statusCode, message) => {
    try {
        return {
            statusCode: statusCode,
            body: JSON.stringify(
                {
                    message: message,
                },
                null,
                2
            ),
        };
    } catch (error) {
        console.error(`ERROR in function bodyResponse(). Caused by ${error} . Specific stack is ${error.stack} `);
    }

}

module.exports={
    bodyResponse
}