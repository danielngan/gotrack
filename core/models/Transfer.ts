import {TransferType} from "../types/Types";

export interface Transfer {
    from_stop_id: string;
    to_stop_id: string;
    transfer_type: TransferType;
    min_transfer_time?: number;

}
