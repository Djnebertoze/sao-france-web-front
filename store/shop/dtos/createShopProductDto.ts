export class CreateShopProductDto {
    name?: string;
    description?: string;
    price?: number;
    isRealMoney?: boolean;
    imageUrl?: string;
    categorieId?: string;
    stripeLink?: string;
    descriptionDetails?: string;
    pointsToGive?: number;
    roleToGive?: string;
}