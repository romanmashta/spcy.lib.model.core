import * as Reflection from '@spcy/lib.core.reflection';
import { getType } from '@spcy/pub.mobx-state-tree';
import * as Mst from '@spcy/lib.core.mst-model';

export interface Component<T> {
  model: T;
}

export interface ModelObject<T> {
  $components: Map<string, Component<T>>;
}

const compnentsMap: any = {};

export const registerController = <A, U>(
  controllerClass: new (model: U) => A,
  modelRef: Reflection.Prototype<U>,
  interfaceRef: Reflection.PrototypeInfo
) => {
  const name = `${modelRef.ref.$refPackage}.${modelRef.ref.$ref}:${interfaceRef.ref.$refPackage}.${interfaceRef.ref.$ref}`;
  compnentsMap[name] = controllerClass;
};

export const queryInterface = <A, T>(model: T, interfaceRef: Reflection.Prototype<A>): A => {
  const modelObject = (model as unknown) as ModelObject<T>;
  const interfaceTypeId = `${interfaceRef.ref.$refPackage}.${interfaceRef.ref.$ref}`;

  const components = modelObject.$components || new Map<string, Component<T>>();
  modelObject.$components = components;

  const existing = components.get(interfaceTypeId);
  if (existing) return (existing as unknown) as A;

  const objectWithType = (getType(model) as unknown) as Mst.ModelWithType;
  const objectTypeId = `${objectWithType.$typeInfo.$package}.${objectWithType.$typeInfo.$id}`;
  const ComponentClass = compnentsMap[`${objectTypeId}:${interfaceTypeId}`];

  const component = (new ComponentClass(model) as unknown) as Component<T>;
  components.set(interfaceTypeId, component);
  return (component as unknown) as A;
};
