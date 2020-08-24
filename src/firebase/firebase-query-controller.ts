import * as firebase from 'firebase';
import * as mst from '@spcy/pub.mobx-state-tree';
import _ from 'lodash';
import * as Core from '../index.model';
import { Types as CoreTypes } from '../index.schema';
import { FirebaseAppController } from './firebase-app-controller';
import { queryInterface, registerController } from '../controllers';

export class FirebaseQueryController implements Core.Activable {
  private activated = 0;
  private model: Core.Query;
  private db?: firebase.firestore.Firestore;
  private collectionName?: string;
  private listener?: () => void;

  constructor(model: Core.Query) {
    this.model = model;
    const fbApp = mst.getRoot(model) as Core.FirebaseApp;
    const parentController = queryInterface(fbApp, CoreTypes.Activable) as FirebaseAppController;
    if (!parentController) return;
    this.db = parentController.db;
    this.collectionName = model.source.$ref;
  }

  async activate() {
    this.activated += 1;
    if (this.activated > 1) return;
    console.log('activate', this.model.name, this.activated);
    await this.queryCollection();
  }

  async deactivate() {
    this.activated -= 1;
    if (this.activated > 0) return;
    console.log('deactivate', this.model.name, this.activated);
    if (this.listener) this.listener();
  }

  async queryCollection() {
    if (!this.db || !this.collectionName) return;

    const source = this.db.collection(this.collectionName) as firebase.firestore.Query;
    const collection = _.reduce(
      this.model.criteria,
      (s, r) => s.where((r.fieldPath as unknown) as firebase.firestore.FieldPath, r.op, r.value),
      source
    );
    const data = await collection.get();
    this.applyData(data);
    this.listener = collection.onSnapshot(snap => this.applyData(snap));
  }

  applyData(data: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) {
    const objects = data.docs.map(doc => [doc.id, doc.data()]);
    const snapshot = _.fromPairs(objects);

    this.model.patch(self => {
      // eslint-disable-next-line no-param-reassign
      if (self.collection) self.collection.objects = snapshot;
    });
  }
}

registerController(FirebaseQueryController, CoreTypes.Query, CoreTypes.Activable);
