import swaggerAutogen from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-Commerce",
            version: "1.0.0",
            description: "API documentation of my project",
        },
        servers: [
            {
                url: "http://localhost:3002/api/v1",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Enter your JWT token",
                },
            },
            responses: {
                Success: {
                    description: "Successful response",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    status: {type: "boolean", example: true},
                                    message: {type: "string", example: "Operation successful"},
                                    data: {
                                        oneOf: [
                                            {type: "array"},    // When data is an array
                                            {type: "object"},   // When data is an object (optional or conditional)
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/app/*/router.ts", "./server.ts"],
};
export const swaggerSpec = swaggerAutogen(swaggerOptions);
