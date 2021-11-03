import { Router } from "express";

export abstract class BaseController {
  abstract router : Router;
}
