import { Router,Request,Response } from "express";
import multer from "multer";
import { BaseController } from "./base.controller";
import * as fs from 'fs';
import { storage as diskStorage } from '../middleware/disk.strorage.multer';
import { EinsteinService } from "../service/einstein.service";

export class FilesController implements BaseController {

  private static MAX_FILES_COUNT = 10;
  private accessToken?: string;
  private einsteinService!: EinsteinService;

  // const memoryStorage = multer.memoryStorage();
  private upload = multer();
  public router: Router;

  constructor() {
    this.router = Router();
    this.intializeRoutes();
    this.einsteinService = new EinsteinService();
  }


  public intializeRoutes() {
    this.router.post('/uploads',
        this.upload.array('file', FilesController.MAX_FILES_COUNT),
        this.uploadFiles);
    this.router.get('/token',
        this.getToken);
  }

  /**
   * ファイルアップロードしてサービスファイルに保存 (複数ファイル)
   * @param req
   * @param res
   */
  uploadFiles = async (req: Request, res: Response) => {
    try {
      if(req.files) {
        let resMessage = '';
        const files = req.files as any;
        for await (const file of files) {
          // ファイルのメモリバッファ
          // console.info(file.buffer);

          /* Herokuのデスクメモリがないため、ファイル保存処理が飛ばす
          fs.writeFile(`./uploads/${file.originalname}`,file.buffer, (err) => {
            if (err) return console.error(err)
          })
          */
          resMessage += `upload success, file name:${file.originalname} \n`;

          // 画像解析を行うリクエスト
          if(!this.accessToken) {
            this.accessToken = await this.einsteinService.getJWTByApiConfig();
          }

          var resultObj = await this.einsteinService.doImagePrediction(this.accessToken, file.buffer);
          resMessage += JSON.stringify(resultObj);
          resMessage += '\n';
        }
        res.send(resMessage);
      } else {
        res.send('upload fail!');
      }
    } catch (err) {
      res.sendStatus(400);
    }
  }

  getToken = async (req: Request, res: Response) => {
    this.accessToken = await this.einsteinService.getJWTByApiConfig();
    res.send(`get token succuss \n access_token: ${this.accessToken}`);
  }
}