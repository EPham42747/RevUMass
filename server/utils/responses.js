const responses = {
  success: {
    OK: {
      code: 200,
      json: {
        success: true,
        message: 'Success',
      },
    },
    CREATED: {
      code: 201,
      json: {
        success: true,
        message: 'Resource created successfully',
      },
    },
    NO_CONTENT: {
      code: 204,
    }
  },
  error: {
    BAD_REQUEST: {
      code: 400,
      json: {
        success: false,
        message: 'Invalid request',
      },
    },
    UNAUTHORIZED: {
      code: 401,
      json: {
        success: false,
        message: 'Unauthorized access',
      },
    },
    FORBIDDEN: {
      code: 403,
      json: {
        success: false,
        message: 'Permission denied',
      },
    },
    NOT_FOUND: {
      code: 404,
      json: {
        success: false,
        message: 'Resource not found',
      },
    },
    INTERNAL_SERVER_ERROR: {
      code: 500,
      json: {
        success: false,
        message: 'Internal server error',
      },
    },
  },
};

module.exports = responses;
