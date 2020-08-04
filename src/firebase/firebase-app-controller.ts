import _ from 'lodash';
import firebase from 'firebase';
import * as Core from '../index.model';
import { Types as CoreTypes } from '../index.schema';
import { registerController } from '../controllers';

const firebaseApps: { [name: string]: firebase.app.App } = {};

export class FirebaseAppController implements Core.Activable {
  private activated = false;
  private model: Core.FirebaseApp;
  private firebase?: firebase.app.App;
  public db?: firebase.firestore.Firestore;
  private listener?: () => void;

  constructor(model: Core.FirebaseApp) {
    this.model = model;
  }

  async activate() {
    if (this.activated) return;
    this.activated = true;
    const { config } = this.model;
    this.firebase = firebaseApps[config.appId] || firebase.initializeApp(config, config.appId);
    firebaseApps[config.appId] = this.firebase;
    this.db = this.firebase.firestore();
    await this.queryCollection();
  }

  async deactivate() {
    if (this.listener) this.listener();
  }

  async queryCollection() {
    if (!this.db) return;

    const collection = this.db.collection('collections');
    const data = await collection.get();
    this.applyData(data);
    this.listener = collection.onSnapshot(snap => this.applyData(snap));
  }

  applyData(data: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) {
    const objects = data.docs.map(doc => [doc.id, doc.data()]);
    const snapshot = _.fromPairs(objects);

    this.model.patch(self => {
      // eslint-disable-next-line no-param-reassign
      self.collections = snapshot;
    });
  }
}

registerController(FirebaseAppController, CoreTypes.FirebaseApp, CoreTypes.Activable);
