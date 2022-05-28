import { Res } from '../types';

export default function createError(error: any): Res<any> {
    const response: Res<any> = {
        data: null,
        error
    }

    return response
}