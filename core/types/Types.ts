export enum LocationType {
    STOP = 0,
    STATION = 1,
    ENTRANCE_EXIT = 2,
    GENERIC_NODE = 3,
    BOARDING_AREA = 4
}

export enum DirectionId {
    OUTBOUND = 0,
    INBOUND = 1
}

export enum WheelchairAccessible {
    NO_INFORMATION = 0,
    ACCESSIBLE = 1,
    NOT_ACCESSIBLE = 2
}

export enum BikesAllowed {
    NO_INFORMATION = 0,
    ALLOWED = 1,
    NOT_ALLOWED = 2
}

export enum Timepoint {
    APPROXIMATE = 0,
    EXACT = 1
}

export enum PickupDropOffType {
    REGULARLY_SCHEDULED = 0,
    NONE_AVAILABLE = 1,
    MUST_PHONE_AGENCY = 2,
    MUST_COORDINATE_WITH_DRIVER = 3
}

export enum TransferType {
    RecommendedTransferPoint = 0,
    TimedTransferPoint = 1,
    MinTransferTime = 2,
    NoTransfer = 3,
}

export class DuplicateEntryError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DuplicateEntryError';
    }
}

export class EntryNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EntryNotFoundError';
    }
}