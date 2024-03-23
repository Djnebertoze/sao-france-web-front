export interface Auth {
    accessToken?: string;
    registerSuccess?: boolean;
}

export interface User {
    _id: string;
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    profilePicture: string;
    roles: string[];
    phoneNumber?: string;
    createdAt: Date;
    updatedAt?: Date;
    acceptEmails: boolean;
    username: string;
    bio?: string;
    birthday?: string;
    shopPoints: number;
    mcProfile?: McProfile
}

export interface UserPrivateProfile {
    user: User,
    mcProfile: McProfile,
    status: number
}

export interface Transaction {
    author: User,
    status: string,
    mcProfile?: McProfile,
    isRealMoney: boolean,
    cost: number,
    productName: string,
    shopProductId: string,
    createdBy?: User,
    mode?: string,
    session_id?: string,
    stripeProductId?: string,
    shopProduct?: ShopProduct,
    createdAt: number,
    _id: string
}

export interface UsersList {
    users: User[];
    mcProfiles: McProfile[]
}

export interface AdminStatistics {
    registers: {
        data: {}
    },
    numbers: {
        users: number
    }
}


export interface McProfile {
    uuid: string;
    name: string;
    skinUrl: string;
    skinVariant: string;
    user: User
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
    stripeLink?: string
    descriptionDetails: string
    pointsToGive?: number,
    roleToGive?: string,
    cosmeticToGive?: string,
    bonusShopPoints?: number
}

export interface StripeProduct {
    id: string
    object: string
    active: boolean
    created: number
    default_price: string
    description: string
    images: []
    features: []
    livemode: boolean
    metadata: {}
    name: string
    package_dimensions: unknown
    shippable: unknown
    statement_descriptor: unknown
    tax_code: unknown
    unit_label: unknown
    updated: number
    url: string
}

export interface StripePrice {
    id: string,
    object: string,
    active: boolean,
    billing_scheme: string,
    created: number,
    currency: string,
    product: string,
    type: string,
    unit_amount: number,
    unit_amount_decimal: string
}