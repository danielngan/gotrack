export interface FeedInfo {
    readonly feed_publisher_name: string;
    readonly feed_publisher_url: string;
    readonly feed_lang?: string;
    readonly feed_start_date?: string;
    readonly feed_end_date?: string;
    readonly feed_version?: string;
}