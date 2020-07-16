import * as Reflection from '@spcy/lib.core.reflection';
import { getType } from '@spcy/pub.mobx-state-tree';
import * as TreeModel from '@spcy/lib.core.mst-model';

export interface Model {
  query<T>(type: Reflection.Prototype<T>): void;
  detach<T>(component: T): void;
}

export interface Component<T> {
  model: T;
}

const controllersMap: any = {};

export const registerController = <A, U>(
  controllerClass: new (model: U) => A,
  modelRef: Reflection.Prototype<U>,
  interfaceRef: Reflection.PrototypeInfo
) => {
  const name = `${modelRef.ref.$refPackage}.${modelRef.ref.$ref}:${interfaceRef.ref.$refPackage}.${interfaceRef.ref.$ref}`;
  controllersMap[name] = controllerClass;
};

export const queryInterface = <A, T>(model: T, interfaceRef: Reflection.Prototype<A>): A => {
  const objectWithType = (getType(model) as unknown) as TreeModel.ModelObject;
  const objectTypeId = `${objectWithType.$typeInfo.$package}.${objectWithType.$typeInfo.$id}`;
  const interfaceTypeId = `${interfaceRef.ref.$refPackage}.${interfaceRef.ref.$ref}`;
  const ControllerClass = controllersMap[`${objectTypeId}:${interfaceTypeId}`];
  return new ControllerClass(model) as A;
};
