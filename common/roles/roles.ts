import {Role} from "../types/types";

export const roles: Role[] = [
    {
        _id: 'user',
        name: 'Joueur',
        color: 'gray',
        textColor: 'white',
        power: 1
    },
    {
        _id: 'staff',
        name: 'Staff',
        color: 'yellow.200',
        textColor: 'black',
        power:2
    },
    {
        _id: 'developer',
        name: 'Développeur',
        color: 'green',
        textColor: 'white',
        power:3
    },
    {
        _id: 'moderator',
        name: 'Modérateur',
        color: 'green',
        textColor: 'white',
        power: 4
    },
    {
        _id: 'responsable',
        name: 'Responsable',
        color: 'blue',
        textColor: 'white',
        power:5
    },
    {
        _id: 'admin',
        name: 'Administrateur',
        color: 'red',
        textColor: 'white',
        power:6
    }
]

export function getRoleById(roleId: string): Role | undefined {
    return roles.find(role => role._id === roleId);
}