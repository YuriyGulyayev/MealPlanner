/** Issue. This is an ugly hack. */
export function hackParseLocalDate(localDateAsString_: string) {
   // Issue. Without this hack, a date like "2019-12-31" would be parsed as UTC, not local.
   const localDateAsSafeString_ = localDateAsString_.replaceAll("-", "/");

   // Issue. It would be nice to validate that the parsing has succeeded and in the parsed date
   // the time of day part is zero in the local time zone, but keeping it simple.
   return new Date(localDateAsSafeString_);
}
