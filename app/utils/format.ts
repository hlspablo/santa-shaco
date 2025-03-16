import { format } from "date-fns";
import pt from "date-fns/locale/pt-BR";

interface FormatterOptions {
    significantDigits: number;
    thousandsSeparator: string;
    decimalSeparator: string;
    symbol: string;
}

type CurrencyValue = number | string;

export function formatCPF(cpf: string): string {
    if (!cpf) return "";
    const [first, second, third] = cpf.split(".");
    if (!third) return "";
    const [fourth, fifth] = third.split("-");
    return `***.${second}.${fourth}-**`;
}

export function formatCurrency(value: CurrencyValue, options?: FormatterOptions): string {
    const defaultOptions = {
        significantDigits: 2,
        thousandsSeparator: ".",
        decimalSeparator: ",",
        symbol: "R$",
    };
    if (typeof value !== "number") value = parseFloat(value);
    value = value < 0 ? 0 : value;
    options = { ...defaultOptions, ...options };
    value = value.toFixed(options.significantDigits);

    const [currency, decimal] = value.split(".");
    return `${options.symbol} ${currency.replace(/\B(?=(\d{3})+(?!\d))/g, options.thousandsSeparator)}${
        options.decimalSeparator
    }${decimal}`;
}

export function formatDate(date: string): string {
    const dateInstance = new Date(date);
    return format(dateInstance, "dd/MM/yyyy 'às' k:mm", { locale: pt });
}

export const generateRandomNumbers = myLength => {
    const chars = "1234567890";
    const randomArray = Array.from({ length: myLength }, (v, k) => chars[Math.floor(Math.random() * chars.length)]);

    const randomString = randomArray.join("");
    return randomString;
};

export const gRS = myLength => {
    const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from({ length: myLength }, (v, k) => chars[Math.floor(Math.random() * chars.length)]);

    const randomString = randomArray.join("");
    return randomString.toUpperCase();
};

export function formatToday(): string {
    const dateInstance = new Date();
    return format(dateInstance, "dd/MM/yyyy", { locale: pt });
}

export function formatToday2(): string {
    const dateInstance = new Date();
    return format(dateInstance, "dd/MM/yyyy  - k:mm:ss", { locale: pt });
}

export function getWeekDayFromDate(date: string): string {
    const [day, month, year] = date.split("/");
    const dateInstance = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10)).getDay();
    const dayName = format(dateInstance, "EEE", { locale: pt });
    return dayName[0].toUpperCase() + dayName.slice(1);
}

export function addDashBeforeLast(str: string) {
    if (str.length < 2) {
        return str;
    }
    const lastChar = str[str.length - 1];
    const allExceptLast = str.slice(0, -1);
    return allExceptLast + "-" + lastChar;
}

export function getFirstName(completeName: string) {
    if (!completeName.includes(" ")) {
        return completeName;
    }
    return completeName.split(" ")[0];
}

export function maskCPF(cpf: string) {
    const cleaned = cpf.replace(/\D/g, "");
    if (cleaned.length !== 11) {
        return cpf;
    }
    const masked = `***.${cleaned.substr(3, 3)}.${cleaned.substr(6, 3)}-**`;
    return masked;
}

function maskEmail(email: string) {
    const atIndex = email.indexOf("@");
    if (atIndex === -1) {
        return email;
    }
    const localPart = email.substring(0, atIndex);
    const domain = email.substring(atIndex);

    if (localPart.length < 4) {
        return email;
    }
    const maskedLocal = localPart.substr(0, 2) + "*".repeat(localPart.length - 4) + localPart.substr(-2);
    return maskedLocal + domain;
}

function maskPhone(phone: string) {
    const cleaned = phone.replace(/\D/g, ""); // Remove any non-digit characters

    if (cleaned.length !== 11) {
        return phone;
    }
    const masked = `(**) *****-${cleaned.substr(-4)}`;
    return masked;
}

export function detectAndMask(input: string) {
    if (input.includes("(")) {
        return "+55 " + maskPhone(input);
    }

    if (input.includes("-")) {
        return maskCPF(input);
    }

    if (input.includes("@")) {
        return maskEmail(input);
    }

    return input;
}
