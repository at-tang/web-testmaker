export function ErrorReroute(statusCode: number) {
    /*
    Returns the appropiate link to the error page. 
    */
    switch (statusCode) {
        case 404:
            return "/error/not-found";
        case 401:
        case 403:
            return "/error/unauthorized";
        case 500:
            return "/error/server-error";
        default:
            return "/error/other";

        
    }
}