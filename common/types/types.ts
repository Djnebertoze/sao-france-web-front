export interface Auth {
    accessToken?: string;
    registerSuccess?: boolean;
}

export interface User {
    _id: string;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    roles?: string;
    phoneNumber?: string;
    createdAt: Date;
    updatedAt?: Date;
    acceptEmail: boolean;
    username: string;
    bio?: string;
    birthday?: string;
    shopPoints: number;
    mcProfile?: McProfile
}


export interface McProfile {
    uuid: string;
    name: string;
    skinUrl: string;
    skinVariant: string;
}

export interface MinecraftProfile {
    profile?: McProfile;
    hasMinecraft: boolean
}

export interface Role {
    _id: string;
    name: string;
    color: string;
    textColor: string;
    power: number
}

// SHOP

export interface ShopCategorie {
    _id: string
    name: string
    place: number
}

export interface ShopProduct {
    _id: string
    name: string
    description: string
    imageUrl: string
    price: number
    isRealMoney: boolean
    categorieId: string
    place:number
}