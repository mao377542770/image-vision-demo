import { readFileSync } from "fs";
import path from "path";

const EINSTEIN_VISION_PRIVATE_KEY = process.env.EINSTEIN_VISION_PRIVATE_KEY ||
`-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAj7rkUd4OiUMgvxP4WJcs58PgnQ7DW5qvaXLX+EvcuYC356q6
Xe4D5XKYIX65aMOF4MTogSTHVlIJI2HdAmUR9Bcwwum7kEJUdfCHfWD8hVshk49H
/VoxrE6IjG1ytAl4WjoV0PSij1WX5fdc4R25xxAYM0fgwESRf5xdPrvXvJ+LEMTf
Ar+etDPQiq+vUi/VwdXSOfxGlr3KoYSpJTwl8vJWVX8FhCvJekOHbG4dOSPKXgY4
sIy4sGSnYp4w0UoQXAuWykymwCVEWIhVMFdnJYDO1bRY6EsVc+COH5nAMAjSzHNE
MVZ3by+SppQws9iMOcQGLcQV+ZuJ3miCrxTZOwIDAQABAoIBAQCD+QdMZKjUQF8B
FEUkkysYZDMKA1Q9+Hq4SEsmIgI6EobKoWkedj39oIsvtjxohZ+YEzWp3ytph0n8
ww8787HYfrK3RgaDH2SOJp1B8pvrlxHte9KOPxL9M98NkjGQPmHT9yGxC+93zQ/8
iHUv/ytmLNELxSQJZuxyUBEOWUxuVGJRByv4B2J3x6/OPqyRMd6GQV6euMy42nJH
vFJs6TX/5zS+sQcoI8oT/jklwgBFdxfavPlONtIgfj9XGFVYBI/JqH4jZK/+YmHH
Uds1RkT3tBg4M7090WLldFUsOCemk87AxqiTRFDhiWyyTFK+7u16X2BEV83Gqzfb
cKEjWEsBAoGBAP1Ytw5iNZDdZ59BQqrnUxYnmikmxkNqxjzg5aQS0lRqod4PR5oB
swv3auqOqJegoMoI5jGQCbXHx5Vy/CwB6T0FoREicRhJQ/HxhRH1BpANasneNGMX
07kA53f/+tU7PXSu5UuCV7uSCyXAIUL1Ut1Klo7euR+Xacqz9BbpIhbzAoGBAJE8
RI24fA5AQh7Qv+B6hjyJ9yoPxqyVX078QPneogeJ9bd7wrptqiXBtGnMkj3jscZU
5n54C57RrGLG5WuW+gLbHI1dYVygUqcawyH8E0OZ/MRRo0OKS4XfcOg+d2wnHYB4
Q86CBBfvAAReEoY8B9e8JAcM6lltdIbYmiUI4taZAoGBAKMs18Kw6LVklVBStUDk
e3Rij31/1uUnSYV+iQozgTsT7yvahZChFZRYiImI1vfKYqWeM72qe0aU5WzRwbAK
jxJZpNMnbtZoohWcLMxTGCYCLkzVDMLiXuDivzNgMUvTuxKDb3ZB/oX2W6214PaC
khur5eshcvTxDheb7lQvVmCXAoGAUHmOmuCwjMz6VkzhJSd/HihsdjgLpDGYgBGy
h0HfkkHVj3faLKb7crRknYMnPXffV8BPf6BRAA26cXk4QmeD3PVAWux1OHf1lHZ1
zWz516mJr9Z0msYUlvd6fpWuYpVB+Z+qItFUJ1bdMY5WwV6eEeJELEvxxt+pg9ad
gwvrdXECgYAggupLmyBM08jzOiqsLmiELWZdZHnSwE5X26sYjRmrOpk1hj/2GOxf
EB0AJI/CPqlneP5xfDQdLbFFEVs0vx8rJcgK/SHYTETLv6DvfHEtUjm2McDHalkx
5Syg5Mp328fC2Ebx2pG0ZheqRp9CUVmZhriJjpNSPevj6VktxvUpUg==
-----END RSA PRIVATE KEY-----`

const EINSTEIN_VISION_URL = process.env.EINSTEIN_VISION_URL || 'https://api.einstein.ai/';
const EINSTEIN_VISION_ACCOUNT_ID = process.env.EINSTEIN_VISION_ACCOUNT_ID || 'r.tachibana-1361596@itforce.co.jp';
const API_VERSION = process.env.API_VERSION || 'v2';
const BASE_URL = EINSTEIN_VISION_URL + API_VERSION;
const EINSTEIN_VISION_MODEL_ID = process.env.EINSTEIN_VISION_MODEL_ID || 'GeneralImageClassifier';

const apiConfig = {
  //各種定数の取得・定義
  private_key : EINSTEIN_VISION_PRIVATE_KEY,
  account_id : EINSTEIN_VISION_ACCOUNT_ID,
  OAUTH2_URL : BASE_URL + '/oauth2/token',
  EINSTEIN_VISION_MODEL_ID : EINSTEIN_VISION_MODEL_ID,
  IMAGECLASSIFICATION_URL : BASE_URL + '/vision/predict'
}

export {apiConfig}