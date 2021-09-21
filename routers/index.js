import { getInformations } from "../controllers/index.js";
import { getInformationsSchema } from "../schema/index.js"
import validate from "../middlewares/index.js";

export default function initializeRouter(router) {
    router.get("/getInformations", validate(getInformationsSchema), getInformations);
}