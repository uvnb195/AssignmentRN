export class Validation {
    static isAnyBlank(...values: any[]) {
        for (let value of values) {
            if (value === '' || value === false) return true
        }
        return false
    }
    static email(value: string) {
        return value
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    }

    static password(value: string) {
        return value.length >= 8;
    }

    static name(value: string) {
        return value.length >= 4;
    }
}