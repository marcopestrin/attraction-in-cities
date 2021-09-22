import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import config from "./settings.js";

const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.1",
		host: `localhost:${config.serverPort}`,
		info: {
			title: "Example App"
		}
	},
	apis: [
		"./controllers/index.js"
	],
};

export default function(app) {
    const specs = swaggerJsdoc(swaggerOptions);

    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs)
    )
}

