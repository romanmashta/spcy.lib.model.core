import * as Reflection from '@spcy/lib.core.reflection';
import { getType } from '@spcy/pub.mobx-state-tree';
import * as Mst from '@spcy/lib.core.mst-model';

export interface Component<T> {
  model: T;
}

export interface ModelObject<T> {
  $components: Map<string, Component<T>>;
}

const compnentsMap: { [name: string]: unknown } = {};

export const registerController = <A, T>(
  controllerClass: new (model: T) => A,
  modelRef: Reflection.Prototype<T>,
  interfaceRef: Reflection.PrototypeInfo
) => {
  const name = `${modelRef.ref.$refPackage}.${modelRef.ref.$ref}:${interfaceRef.ref.$refPackage}.${interfaceRef.ref.$ref}`;
  compnentsMap[name] = controllerClass;
};

export const queryInterface = <A, T>(model: T, interfaceRef: Reflection.Prototype<A>): A | undefined => {
  const modelObject = (model as unknown) as ModelObject<T>;
  const interfaceTypeId = `${interfaceRef.ref.$refPackage}.${interfaceRef.ref.$ref}`;

  const components = modelObject.$components || new Map<string, Component<T>>();
  modelObject.$components = components;

  const existing = components.get(interfaceTypeId);
  if (existing) return (existing as unknown) as A;

  const objectWithType = (getType(model) as unknown) as Mst.ModelWithType;
  if (!objectWithType.$typeInfo) return undefined;
  const objectTypeId = `${objectWithType.$typeInfo.$package}.${objectWithType.$typeInfo.$id}`;
  const ComponentClass = compnentsMap[`${objectTypeId}:${interfaceTypeId}`] as new (model: T) => A;
  if (!ComponentClass) return undefined;

  const component = (new ComponentClass(model) as unknown) as Component<T>;
  components.set(interfaceTypeId, component);
  return (component as unknown) as A;
};
