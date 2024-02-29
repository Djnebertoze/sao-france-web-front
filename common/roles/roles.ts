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
        _id: 'beater',
        name: 'Beater',
        color: '#546E7A',
        textColor: 'white',
        power: 1.4
    },
    {
        _id: 'legend',
        name: 'Légende',
        color: '#F1C40F',
        textColor: 'white',
        power: 1.3
    },
    {
        _id: 'conqueror',
        name: 'Conquérant',
        color: '#C27C0E',
        textColor: 'white',
        power: 1.2
    },
    {
        _id: 'paladin',
        name: 'Paladin',
        color: '#A84300',
        textColor: 'white',
        power: 1.1
    },
    {
        _id: 'staff',
        name: 'Staff',
        color: 'yellow.300',
        textColor: 'black',
        power: 2
    },
    {
        _id: 'developer',
        name: 'Développeur',
        color: '#81cc83',
        textColor: 'white',
        power: 3
    },
    {
        _id: 'moderator',
        name: 'Modérateur',
        color: 'cyan.300',
        textColor: 'white',
        power: 4
    },
    {
        _id: 'responsable',
        name: 'Responsable',
        color: 'blue',
        textColor: 'white',
        power: 5
    },
    {
        _id: 'admin',
        name: 'Administrateur',
        color: '#df6a6a',
        textColor: 'white',
        power: 6
    }
]

export function getRoleById(roleId: string): Role | undefined {
    return roles.find(role => role._id === roleId);
}