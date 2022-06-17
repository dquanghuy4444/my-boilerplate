/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class FirebaseMiddleware implements NestMiddleware {
    // private defaultApp: any;

    // constructor() {
    //   this.defaultApp = firebase.initializeApp();
    // }

    use(req: Request, res: Response, next: () => void) {
        next();
    }
}
