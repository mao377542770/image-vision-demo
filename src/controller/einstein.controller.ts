import { Router,Request,Response } from "express";
import { EinsteinService } from "../service/einstein.service";
import { BaseController } from "./base.controller";

export class EinsteinController implements BaseController{
  public router: Router;
  private accessToken?: string;
  private einsteinService: EinsteinService;

  constructor() {
    this.router = Router();
    this.intializeRoutes();
    this.einsteinService = new EinsteinService();
  }

  public intializeRoutes() {
    this.router.get('/datasets/:Id',
        this.getDataSetById);
    this.router.get('/datasets',
        this.getDataSets);
    this.router.get('/models/:datasetId',
        this.getModels);
    this.router.post('/train',
        this.train);
  }

  getDataSetById = async (req: Request, res: Response) => {
    const datasetId = req.params.Id;
    this.accessToken = await this.einsteinService.getJWTByApiConfig();

    //Http オプション
    const httpOption = {
      url: 'https://api.einstein.ai/v2/vision/datasets/' + datasetId,
      headers: {
        'Authorization': 'Bearer ' + this.accessToken
      }
    }

    const httpResult = await this.einsteinService.doGet(httpOption);
    if(httpResult.error === null) {
      console.log(httpResult.body);
      res.json(httpResult.body);
    } else {
      console.error(httpResult.error);
      res.json(httpResult.error);
    }
  }


  getDataSets = async (req: Request, res: Response) => {
    this.accessToken = await this.einsteinService.getJWTByApiConfig();

    //Http オプション
    const httpOption = {
      url: 'https://api.einstein.ai/v2/vision/datasets',
      headers: {
          'Authorization': 'Bearer ' + this.accessToken,
          'Cache-Control': 'no-cache'
      }
    }

    const httpResult = await this.einsteinService.doGet(httpOption);
    if(httpResult.error === null) {
      console.log(httpResult.body);
      res.jsonp(httpResult.body);
    } else {
      console.error(httpResult.error);
      res.json(httpResult.error);
    }
  }

  getModels = async (req: Request, res: Response) => {
    const datasetId = req.params.datasetId;
    console.log(datasetId);
    this.accessToken = await this.einsteinService.getJWTByApiConfig();

    //Http オプション
    const httpOption = {
      url: `https://api.einstein.ai/v2/vision/datasets/${datasetId}/models`,
      headers: {
          'Authorization': 'Bearer ' + this.accessToken,
          'Cache-Control': 'no-cache'
      }
    }

    const httpResult = await this.einsteinService.doGet(httpOption);
    if(httpResult.error === null) {
      console.log(httpResult.body);
      res.jsonp(httpResult.body);
    } else {
      console.error(httpResult.error);
      res.json(httpResult.error);
    }
  }

  train = async (req: Request, res: Response) => {
    const datasetId = req.body.datasetId;
    const modelName = req.body.modelName;
    console.log(datasetId);
    console.log(modelName);

    this.accessToken = await this.einsteinService.getJWTByApiConfig();

    //Http オプション
    const httpOption = {
      url: 'https://api.einstein.ai/v2/vision/train',
      headers: {
        'Authorization': 'Bearer ' + this.accessToken,
        'Content-Type': 'multipart/form-data',
        'Cache-Control': 'no-cache'
      },
      formData : {
        datasetId: datasetId,
        name: modelName
      }
    }


    const httpResult = await this.einsteinService.doPost(httpOption);
    if(httpResult.error === null) {
      console.error(httpResult.body);
      res.json(httpResult.body);
    } else {
      console.log(httpResult.error);
      res.json(httpResult.error);
    }
  }
}
