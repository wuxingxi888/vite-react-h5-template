import { Toast } from 'antd-mobile'
// import router from '@/router';
import { ApiStatusEnum } from '@/enums/apiStatusEnum'

export function checkStatus(status: number, msg: string): void {
    let errMessage = ''

    switch (status) {
        case 400:
            errMessage = `${msg}`
            break
        // 401: Not logged in
        // Jump to the login page if not logged in, and carry the path of the current page
        // Return to the current page after successful login. This step needs to be operated on the login page.
        case 401:
            // userStore.setToken(undefined);
            // errMessage = msg || ApiStatusEnum.errMsg401;
            // userStore.logout(true);
            break
        case 403:
            errMessage = ApiStatusEnum.errMsg403
            break
        // 404请求不存在
        case 404:
            errMessage = ApiStatusEnum.errMsg404
            break
        case 405:
            errMessage = ApiStatusEnum.errMsg405
            break
        case 408:
            errMessage = ApiStatusEnum.errMsg408
            break
        case 500:
            errMessage = ApiStatusEnum.errMsg500
            break
        case 501:
            errMessage = ApiStatusEnum.errMsg501
            break
        case 502:
            errMessage = ApiStatusEnum.errMsg502
            break
        case 503:
            errMessage = ApiStatusEnum.errMsg503
            break
        case 504:
            errMessage = ApiStatusEnum.errMsg504
            break
        case 505:
            errMessage = ApiStatusEnum.errMsg505
            break
        default:
    }

    if (errMessage) {
        Toast.show({ content: errMessage })
    }
}
