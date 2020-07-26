import * as cr from '@spcy/lib.core.reflection';
import { createInstanceForRef, getObjectSchema, getParentObject } from '@spcy/lib.core.mst-model';
import { TypeInfo } from '@spcy/lib.core.reflection';
import { registerController } from './register-controller';
import * as Core from '../index.model';
import * as CoreSchema from '../index.schema';

export class ArrayController implements Core.NodeActions {
  private model: Array<any>;
  private parent: any;
  private typeInfo?: cr.ArrayType;

  constructor(model: unknown) {
    this.model = model as Array<any>;
    this.parent = getParentObject(model);
    this.typeInfo = getObjectSchema(model) as cr.ArrayType;
  }

  static createInstance(typeInfo: cr.TypeInfo): unknown {
    if (cr.isTypeReference(typeInfo)) return createInstanceForRef(typeInfo);
    return null;
  }

  async add<T>(selector?: (types: TypeInfo[]) => Promise<TypeInfo>, modifier?: (obj: T) => Promise<T>) {
    if (!this.typeInfo) return;
    const elementType = this.typeInfo.items;
    // selector
    const instance = ArrayController.createInstance(elementType) as T;
    const modified = modifier ? await modifier(instance as T) : instance;
    this.parent.patch(() => {
      this.model.push(modified);
    });
  }

  remove(node: unknown): void {
    console.log('remove', node);
  }
}
registerController(ArrayController, cr.Types.ArrayType, CoreSchema.Types.NodeActions);
