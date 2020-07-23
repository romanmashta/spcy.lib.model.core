import * as firebase from 'firebase';
import * as mst from '@spcy/pub.mobx-state-tree';
import _ from 'lodash';
import * as Core from '../index.model';
import { Types as CoreTypes } from '../index.schema';
import { FirebaseAppController } from './firebase-app-controller';
import { queryInterface, registerController } from '../controllers';

export class FirebaseCollectionController implements Core.Activable {
  private activated = false;
  private model: Core.Collection;
  private db?: firebase.firestore.Firestore;
  private collectionName?: string;
  private listener?: () => void;

  constructor(model: Core.Collection) {
    this.model = model;
    const collections = mst.getParent(model);
    const fbApp = mst.getParent(collections) as Core.FirebaseApp;
    const parentController = queryInterface(fbApp, CoreTypes.Activable) as FirebaseAppController;
    if (!parentController) return;
    this.db = parentController.db;
    this.collectionName = mst.getRelativePath(collections, model);
  }

  async activate() {
    if (this.activated) return;
    this.activated = true;
    await this.queryCollection();
  }

  async deactivate() {
    if (this.listener) this.listener();
  }

  async queryCollection() {
    if (!this.db || !this.collectionName) return;

    const collection = this.db.collection(this.collectionName);
    const data = await collection.get();
    this.applyData(data);
    this.listener = collection.onSnapshot(snap => this.applyData(snap));
  }

  applyData(data: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) {
    const objects = data.docs.map(doc => [doc.id, doc.data()]);
    const snapshot = _.fromPairs(objects);

    this.model.patch(self => {
      self.collection.objects = snapshot;
    });
  }
}

registerController(FirebaseCollectionController, CoreTypes.Collection, CoreTypes.Activable);
