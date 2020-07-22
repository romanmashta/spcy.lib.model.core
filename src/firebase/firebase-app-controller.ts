import _ from 'lodash';
import firebase from 'firebase';
import * as Core from '../index.model';
import { Types as CoreTypes } from '../index.schema';
import { registerController } from '../controllers';

export class FirebaseAppController implements Core.Activable {
  private model: Core.FirebaseApp;
  private firebase?: firebase.app.App;
  public db?: firebase.firestore.Firestore;

  constructor(model: Core.FirebaseApp) {
    this.model = model;
  }

  async activate() {
    this.firebase = firebase.initializeApp(this.model.config);
    this.db = this.firebase.firestore();
    await this.queryCollection();
  }

  async deactivate() {}

  async queryCollection() {
    if (!this.db) return;

    console.log('query collection');
    const data = await this.db.collection('collections').get();
    const objects = data.docs.map(doc => [doc.id, doc.data()]);
    const snapshot = _.fromPairs(objects);

    this.model.patch(self => {
      self.collections = snapshot;
    });
  }
}

registerController(FirebaseAppController, CoreTypes.FirebaseApp, CoreTypes.Activable);
