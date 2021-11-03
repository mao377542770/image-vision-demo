import { Router,Request,Response } from "express";
import multer from "multer";
import { BaseController } from "./base.controller";
import * as fs from 'fs';
import { storage as diskStorage } from '../middleware/disk.strorage.multer';

export class FilesController implements BaseController {

  private static MAX_FILES_COUNT = 10;

  // const memoryStorage = multer.memoryStorage();
  private upload = multer();
  public router: Router;

  constructor() {
    this.router = Router();
    this.intializeRoutes();
  }


  public intializeRoutes() {
    this.router.post('/uploads',
        this.upload.array('file', FilesController.MAX_FILES_COUNT),
        this.uploadFiles);
  }

  /**
   * ファイルアップロードしてサービスファイルに保存 (複数ファイル)
   * @param req
   * @param res
   */
  uploadFiles = (req: Request, res: Response) => {
    try {
      if(req.files) {
        let resMessage = '';
        const files = req.files as any;
        files.forEach((file : any) => {
          // ファイルのメモリバッファ
          // console.info(file.buffer);
          fs.writeFile(`./uploads/${file.originalname}`,file.buffer, (err) => {
            if (err) return console.error(err)
          })
          resMessage += `upload success, file name:${file.originalname} \n`;
        });
        res.send(resMessage);
      } else {
        res.send('upload fail!');
      }
    } catch (err) {
      res.sendStatus(400);
    }
  }

}

