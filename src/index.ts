import App from "./app.server";
import { FilesController } from "./controller/files.controller";

const port = process.env.PORT || 3000;

const app = new App(
  [
    new FilesController()
  ],
  port as number
);

app.listen();