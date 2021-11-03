import App from "./app.server";
import { FilesController } from "./controller/files.controller";

const app = new App(
  [
    new FilesController()
  ],
  3000
);

app.listen();