const ITEMS_STORAGE_KEY = "items-storage";

export default{
    getItemsStorageKey(){return ITEMS_STORAGE_KEY;},
    JsonDateParser(key, value) {
        var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
        var reMsAjax = /^\/Date\((d|-|.*)\)[\\/|\\]$/;

        if (typeof value === 'string') {
            var a = reISO.exec(value);
            
            if (a) return new Date(value);
            
            a = reMsAjax.exec(value);
            if (a) {
                var b = a[1].split(/[-+,.]/);
                return new Date(b[0] ? +b[0] : 0 - +b[1]);
            }
        }
        return value;
    }
}