import React from 'react';
import * as Reflection from '@spcy/lib.core.reflection';
import { getObjectSchema } from '@spcy/lib.core.mst-model';
import { getTypeId } from '../controllers';

export type View<T> = React.FC<{ model: T }>;

interface ModelObject<T> {
  $view: View<T>;
}

const viewsMap: { [name: string]: unknown } = {};

export const registerView = <T>(modelRef: Reflection.Prototype<T>, view: View<T>) => {
  const typeName = `${modelRef.ref.$refPackage}.${modelRef.ref.$ref}`;
  viewsMap[typeName] = view;
};

export const queryView = <T>(model: T): View<T> | undefined => {
  const modelObject = (model as unknown) as ModelObject<T>;
  if (modelObject.$view) return modelObject.$view;

  const typeInfo = getObjectSchema(model);
  if (!typeInfo) return undefined;

  const objectTypeId = getTypeId(typeInfo);
  modelObject.$view = viewsMap[objectTypeId] as View<T>;

  return modelObject.$view;
};
