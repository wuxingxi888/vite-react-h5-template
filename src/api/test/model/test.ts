import { BasicPageParams, BasicFetchResult } from '@/api/model/baseModel'

export type TestParams = BasicPageParams & {
    startTime?: string
    endTime?: string
}

export interface TestListItem {
    id: string
    account: string
    email: string
    nickname: string
    role: number
    createTime: string
    remark: string
    status: number
}

export type TestListGetResultModel = BasicFetchResult<TestListItem>
