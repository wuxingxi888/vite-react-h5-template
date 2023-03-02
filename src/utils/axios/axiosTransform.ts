/*
 * @Author: wuxingxi wuxingxi@163.com
 * @Date: 2023-02-24 12:20:16
 * @LastEditors: wuxingxi wuxingxi@163.com
 * @LastEditTime: 2023-03-01 21:44:43
 * @FilePath: /vite-react-h5-template/src/utils/axios/axiosTransform.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
/**
 * Data processing class, can be configured according to the project
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestOptions, Result } from 'types/axios'

export interface CreateAxiosOptions extends AxiosRequestConfig {
    authenticationScheme?: string
    transform?: AxiosTransform
    requestOptions?: RequestOptions
}

export abstract class AxiosTransform {
    /**
     * @description: Process configuration before request
     * @description: Process configuration before request
     */
    beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig

    /**
     * @description: 处理响应数据
     */
    transformResponseHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any

    /**
     * @description: 请求失败处理
     */
    requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>

    /**
     * @description: 请求之前的拦截器
     */
    requestInterceptors?: (
        config: AxiosRequestConfig,
        options: CreateAxiosOptions
    ) => AxiosRequestConfig

    /**
     * @description: 请求之后的拦截器
     */
    responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

    /**
     * @description: 请求之前的拦截器错误处理
     */
    requestInterceptorsCatch?: (error: Error) => void

    /**
     * @description: 请求之后的拦截器错误处理
     */
    responseInterceptorsCatch?: (axiosInstance: AxiosResponse, error: Error) => void
}
