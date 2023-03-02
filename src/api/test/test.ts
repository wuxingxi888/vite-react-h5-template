import { TestParams, TestListGetResultModel } from './model/test'

import { defHttp } from '@/utils/axios'

enum Api {
    TestList = '/conference/app/conferenceInfo/list'
}

export const getTestList = (params: TestParams): Promise<TestListGetResultModel> =>
    defHttp.get<TestListGetResultModel>({ url: Api.TestList, params })
