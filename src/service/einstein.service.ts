import * as jwt from "jsonwebtoken";
import { apiConfig } from "../middleware/einstein.api.config";
import request from "request";

export class EinsteinService {

  constructor() {

  }

  public async getJWTByApiConfig() : Promise<string>{
      /*
      * OAUTH Token 取得プロセス
      */
      // JWT payload
      const rsa_payload = {
        "sub": apiConfig.account_id,
        "aud": apiConfig.OAUTH2_URL
      }

      const rsa_options = {
          header: {
              "alg": "RS256",
              "typ": "JWT"
          },
          expiresIn: '1m'
      }

      // Sign the JWT payload
      const assertion = jwt.sign(
          rsa_payload,
          apiConfig.private_key,
          rsa_options
      );

      var options = {
          url: apiConfig.OAUTH2_URL,
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'accept': 'application/json'
          },
          body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${encodeURIComponent(assertion)}`
      }

      var result = await this.doPost(options);
      var data = JSON.parse(result.body);
      console.log(data);
      return data["access_token"];
  }

  /**
   * 画像解析を行う
   * @param accessToken
   * @param buffer
   */
  public async doImagePrediction(accessToken: string, fileBuffer: any) : Promise<any>{
    //Multipart-Formで送るので渡されてきたモデルIDとbase64でエンコードされた画像データをFormデータ化準備
    const formData = {
      modelId: apiConfig.EINSTEIN_VISION_MODEL_ID,
      sampleBase64Content: fileBuffer.toString('base64')
    }

    //予測・解析を行うリクエスト文を組み立て
    const reqOptionsPrediction = {
        url: apiConfig.IMAGECLASSIFICATION_URL,
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'multipart/form-data'
        },
        formData: formData
    }

    var result = await this.doPost(reqOptionsPrediction);
    if(result.error === null) {
      console.info(result.body);
      return result.body;
    } else {
      console.error(result.error);
      return result.error;
    }
  }


  private async doPost(options : any) : Promise<any>{
    var promise = new Promise<any>(resolve => {
        request.post(options ,(error :any, response: any, body: any) => {
          resolve({
            error : error,
            response : response,
            body : body
          })
        })
    });

    return promise;
  }
}