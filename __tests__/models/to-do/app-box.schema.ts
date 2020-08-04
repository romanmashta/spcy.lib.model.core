/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as r from '@spcy/lib.core.reflection';
import * as m from './app-box.model';

const UserWithRolesType: r.TypeInfo = {
  $id: 'UserWithRoles',
  $package: 'lib.model.core',
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    roles: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
};

const UserWithRoles: r.Prototype<m.UserWithRoles> = {
  ref: { $ref: UserWithRolesType.$id!, $refPackage: UserWithRolesType.$package! },
  typeInfo: UserWithRolesType
};

const RoomType: r.TypeInfo = {
  $id: 'Room',
  $package: 'lib.model.core',
  type: 'object',
  required: ['users'],
  properties: {
    name: {
      type: 'string'
    },
    users: {
      type: 'array',
      items: {
        $ref: 'UserWithRoles',
        $refPackage: 'lib.model.core'
      }
    }
  }
};

const Room: r.Prototype<m.Room> = {
  ref: { $ref: RoomType.$id!, $refPackage: RoomType.$package! },
  typeInfo: RoomType
};

export const AppBoxModule: r.Module = {
  $id: 'lib.model.core',
  $defs: {
    UserWithRoles: UserWithRolesType,
    Room: RoomType
  }
};

export const Types = {
  UserWithRoles,
  Room
};
