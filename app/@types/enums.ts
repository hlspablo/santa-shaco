// export enum PaymentMethodTypeEnum {
//     CARD_ON_PERSON = "CARD_ON_PERSON",
//     CREDIT = "CREDIT",
//     CREDIT = "CREDIT",
//     CASH = "CASH",
//     PIX = "PIX",
// }

export type PaymentMethodTypeEnum = "CARD_ON_PERSON" | "CREDIT" | "DEBIT" | "CASH" | "PIX";
export type CardTypeEnum = "CREDIT" | "DEBIT";
export type ProductLabelEnum = "NEW" | "TRENDING" | "FREE_DELIVERY" | "PROMOTION";
export type ProductStatusEnum = "AVAILABLE" | "NOT_AVAILABLE" | "NEED_BOOK";
export type BannerActionEnum = "TO_LINK" | "TO_SCREEN" | "TO_PRODUCT";
export type OrderDeliveryTypeEnum = "DELIVERY" | "PICKUP";
export type OrderStatusEnum =
    | "PLACED"
    | "READY_TO_COOK"
    | "COOKING"
    | "READY_TO_DELIVER"
    | "IN_DELIVERY"
    | "DELIVERED"
    | "WAITING_PAYMENT"
    | "CANCELED";

export type StringKey = {
    [key: string]: string;
};

export const TOrderDeliveryTypeEnum: StringKey = {
    DELIVERY: "Entrega",
    PICKUP: "Retirada",
};
export const TPaymentMethodsEnum: StringKey = {
    CARD_ON_PERSON: "Cartão, na entrega",
    CREDIT: "Crédito",
    DEBIT: "Débito",
    CASH: "Dinheiro",
    PIX: "Pix",
};
export const TOrderStatusEnum: StringKey = {
    PLACED: "Aguardando Cozinha",
    WAITING_PAYMENT: "Aguardando Pagamento",
    COOKING: "Cozinhando",
    READY_TO_DELIVER: "Aguardando Entregador",
    IN_DELIVERY: "Entrega em Andamento",
    DELIVERED: "Entrega Concluída",
    CANCELED: "Entrega Cancelada",
};
