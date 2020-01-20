export default {
    statusCore: {
        ServiceNotFound: 400,
        Success: 200,
        InvalidParameters: 400,
        Ok: 200,
        UnAuthorized: 401,
        ModelIsNull: 400,
        NoAccess: 401,
        EntityExist: 400,
        TimeElepsed: 400,
        SomethingWrong: 400,
        OK: 200,
        Created: 201,
        Accepted: 202,
        NoContent: 204,
        BadRequest: 400,
        Unauthorized: 401,
        Forbidden: 403,
        NotFound: 400,
        Conflict: 409,
        SendSms: 484,
        InternalServerError: 500,
        ErrorInBody: 444,
    },
    model: {
        id: "",
        projectName: "",
        statusCode: 200,
        lang: "",
        responseStatus: 0,
        modelStatus: 0,
        errorResult: null,
        result: null,
        functionName: ""
    },
    errorResult: {
        code: 0,
        message: ""
    },
    result: {
        message: "",
        code: 0
    }
}