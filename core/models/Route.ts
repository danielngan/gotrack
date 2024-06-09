export interface Route {
    route_id: string;
    agency_id: string;
    route_short_name: string;
    route_long_name: string;
    route_desc?: string;
    route_type: number;
    route_url?: string;
    route_color?: string;
    route_text_color?: string;
    route_sort_order?: number;
    continuous_pickup?: 0 | 1 | 2;
    continuous_drop_off?: 0 | 1 | 2;
}