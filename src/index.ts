import App from "./app.server";
import { EinsteinController } from "./controller/einstein.controller";
import { FilesController } from "./controller/files.controller";

const port = process.env.PORT || 3000;

const app = new App(
  [
    new FilesController(),
    new EinsteinController
  ],
  port as number
);

app.listen();