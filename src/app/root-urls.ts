import { environment } from 'src/environments/environment';

export class RootURLS {
 static getUrl(subRoot){ 
  return environment.ROOT_URL+subRoot;
 }
}
