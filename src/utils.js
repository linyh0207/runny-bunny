export function within_bounds(value, low, high){
    return Math.max(Math.min(value, high), low);
}