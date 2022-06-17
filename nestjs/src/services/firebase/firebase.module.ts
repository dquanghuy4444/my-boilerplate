import { Module, DynamicModule } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import * as firebaseConfig from './firebase.config.json';

// TODO: Some better ways to do this?
@Module({})
export class FirebaseModule {
    static forRoot(): DynamicModule {
        const params = {
            type: firebaseConfig.type,
            projectId: firebaseConfig.project_id,
            privateKeyId: firebaseConfig.private_key_id,
            privateKey: firebaseConfig.private_key,
            clientEmail: firebaseConfig.client_email,
            clientId: firebaseConfig.client_id,
            authUri: firebaseConfig.auth_uri,
            tokenUri: firebaseConfig.token_uri,
            authProviderX509CertUrl: firebaseConfig.auth_provider_x509_cert_url,
            clientC509CertUrl: firebaseConfig.client_x509_cert_url,
        };

        const FirebaseProvider = {
            provide: 'firebase',
            useFactory: () =>
                firebase.initializeApp({
                    credential: firebase.credential.cert(params),
                }),
        };

        return {
            global: true,
            module: FirebaseModule,
            providers: [FirebaseProvider],
            exports: [FirebaseProvider],
        };
    }
}
