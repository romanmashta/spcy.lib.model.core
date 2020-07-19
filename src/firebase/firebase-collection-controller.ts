import * as firebase from 'firebase';
import * as mst from '@spcy/pub.mobx-state-tree';
import _ from 'lodash';
import * as Core from '../index.model';
import { Types as CoreTypes } from '../index.schema';
import { FirebaseAppController } from './firebase-app-controller';
import { queryInterface, registerController } from '../controllers';

export class FirebaseCollectionController implements Core.Activable {
  private model: Core.Collection;
  private db?: firebase.firestore.Firestore;
  private collectionName: string;

  constructor(model: Core.Collection) {
    this.model = model;
    const collections = mst.getParent(model);
    const fbApp = mst.getParent(collections) as Core.FirebaseApp;
    const parentController = queryInterface(fbApp, CoreTypes.Activable) as FirebaseAppController;
    this.db = parentController.db;
    this.collectionName = mst.getRelativePath(collections, model);
  }

  async activate() {
    console.log('Collection activate ', this.model.name);
    await this.queryCollection();
  }

  async deactivate() {
    console.log('Collection deactivate', this.model.name);
  }

  async queryCollection() {
    if (!this.db) return;

    const data = await this.db.collection(this.collectionName).get();
    const objects = data.docs.map(doc => [doc.id, doc.data()]);
    const snapshot = _.fromPairs(objects);

    this.model.patch(self => {
      self.collection.objects = snapshot;
    });
  }
}

registerController(FirebaseCollectionController, CoreTypes.Collection, CoreTypes.Activable);
