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
    cosmeticToGive?: string;
    bonusShopPoints?: number;
    active?: boolean;
    roleInitial?: string;
    roleFinal?: string;
}